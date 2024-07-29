from fastapi import FastAPI
import math
import requests
import pandas as pd
import schemas

app = FastAPI()
baseURL = "https://api.deezer.com/"
searchURL = "https://api.deezer.com/search"


@app.get("/", response_model=schemas.ResponseSchema[schemas.TrackSchema, None])
async def search(search_query: str):
    response = requests.get(f"{searchURL}?q={search_query}")
    data = response.json()
    return data


@app.get("/album", response_model=schemas.ResponseSchema[schemas.AlbumSchema, None])
async def search_by_album(album_title: str):
    response = requests.get(f"{searchURL}/album?q={album_title}")
    return response.json()


@app.get("/album/{album_id}", response_model=schemas.AlbumByIdSchema)
async def album_by_id(album_id: int):
    response = requests.get(f"{baseURL}album/{album_id}")
    data: dict = response.json()
    tracks_data = data["tracks"]["data"]

    tracks_df = pd.json_normalize(tracks_data)
    album_df = pd.json_normalize(data)

    avg_track_duration = tracks_df["duration"].mean()
    min_track_duration = tracks_df["duration"].min()
    max_track_duration = tracks_df["duration"].max()

    avg_track_rank = math.ceil(tracks_df["rank"].mean())
    explicit = tracks_df.loc[tracks_df["explicit_lyrics"]]

    # toggle hide explicit!!

    print(explicit["explicit_lyrics"])

    return data


@app.get("/artist", response_model=schemas.ResponseSchema[schemas.ArtistSchema, None])
async def search_by_artist(artist_name: str):
    response = requests.get(f"{baseURL}/search/artist?q={artist_name}")
    return response.json()


@app.get("/artist/{artist_id}", response_model=schemas.ArtistSchema)
async def artist_by_id(
    artist_id: int,
):
    response = requests.get(f"{baseURL}/artist/{artist_id}")
    return response.json()


@app.get(
    "/artist/{artist_id}/albums",
    response_model=schemas.ResponseSchema[
        schemas.AlbumSchema, schemas.ArtistAlbumsAnalytics
    ],
)
async def artist_albums(
    artist_id: int,
):
    albums = requests.get(f"{baseURL}/artist/{artist_id}/albums")
    data = albums.json()
    df = pd.DataFrame(data.get("data"))

    explicit_tracks = df.loc[df["explicit_lyrics"]]
    albums = df.loc[df["record_type"] == "album"]
    singles = df.loc[df["record_type"] == "single"]
    eps = df.loc[df["record_type"] == "ep"]

    genre_ids = list(
        filter(lambda genre_id: int(genre_id) > 1, df["genre_id"].unique())
    )

    genres = []
    with requests.Session() as session:
        for genre_id in genre_ids:
            response = session.get(f"{baseURL}genre/{genre_id}")
            response.raise_for_status()
            genre = response.json()
            genres.append(genre)

    analytics = {
        "explicit_tracks": len(explicit_tracks),
        "albums": len(albums),
        "singles": len(singles),
        "eps": len(eps),
        "genres": genres,
    }

    data["pandas_data"] = analytics
    return data


@app.get("/api/request")
async def api_request(url: str):
    response = requests.get(url)
    return response.json()
