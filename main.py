from fastapi import FastAPI, HTTPException
import math
import requests
import pandas as pd
import schemas
import math

from pd_related import group_dataframe, normalize_keys_in_list

app = FastAPI()

baseURL = "https://api.deezer.com/"
searchURL = "https://api.deezer.com/search"


def cover_url(md5_hash: str, size: int = 120):
    return f"https://e-cdns-images.dzcdn.net/images/cover/{md5_hash}/{str(size)}x{str(size)}-000000-80-0-0.jpg"


@app.get("/", response_model=schemas.ResponseSchema[schemas.TrackSchema])
async def search(search_query: str):
    response = requests.get(f"{searchURL}?q={search_query}")
    data = response.json()
    return data


@app.get("/album", response_model=schemas.ResponseSchema[schemas.AlbumSchema])
async def search_by_album(album_title: str):
    response = requests.get(f"{searchURL}/album?q={album_title}")
    return response.json()


@app.get(
    "/album/{album_id}", response_model=schemas.AlbumByIdSchema[schemas.AlbumAnalytics]
)
async def album_by_id(album_id: int):
    response = requests.get(f"{baseURL}album/{album_id}")
    data: dict = response.json()
    tracks_data = data["tracks"]["data"]

    tracks_dataframe = pd.json_normalize(tracks_data)

    explicit_lyrics = tracks_dataframe.loc[tracks_dataframe["explicit_lyrics"]]

    explicit_tracks = []
    if not explicit_lyrics.empty:
        grouped_tracks = group_dataframe(explicit_lyrics, "id")
        explicit_tracks = normalize_keys_in_list(grouped_tracks)

    analytics = {
        "avg_track_duration": math.ceil(tracks_dataframe["duration"].mean()),
        "min_track_duration": tracks_dataframe["duration"].min(),
        "max_track_duration": tracks_dataframe["duration"].max(),
        "avg_track_rank": math.ceil(tracks_dataframe["rank"].mean()),
        "explicit_tracks": explicit_tracks,
    }

    data.update({"analytics": schemas.AlbumAnalytics(**analytics)})
    return data


@app.get("/artist", response_model=schemas.ResponseSchema[schemas.ArtistSchema])
async def search_by_artist(artist_name: str):
    response = requests.get(f"{baseURL}/search/artist?q={artist_name}")
    return response.json()


@app.get("/artist/{artist_id}", response_model=schemas.ArtistSchema)
async def artist_by_id(
    artist_id: int,
):
    response = requests.get(f"{baseURL}/artist/{artist_id}")
    response_json = response.json()

    if response_json.get("error"):
        raise HTTPException(404, "invalid artist id")

    return response_json


@app.get(
    "/artist/{artist_id}/albums",
    response_model=schemas.AnalyticsResponseSchema[
        schemas.AlbumSchema, schemas.ArtistAlbumsAnalytics
    ],
)
async def artist_albums(artist_id: int, index: int = 0):
    api_genres_request = requests.get(f"{baseURL}/genre")
    api_genres = api_genres_request.json().get("data")

    albums_request = requests.get(f"{baseURL}/artist/{artist_id}/albums?index={index}")
    response_json = albums_request.json()
    data = response_json.get("data")

    if not data:
        raise HTTPException(404, "invalid index provided")

    album_data_dataframe = pd.DataFrame(data)

    explicit_content_dataframe = album_data_dataframe.loc[
        album_data_dataframe["explicit_lyrics"]
    ]
    albums_dataframe = album_data_dataframe.loc[
        album_data_dataframe["record_type"] == "album"
    ]
    singles_dataframe = album_data_dataframe.loc[
        album_data_dataframe["record_type"] == "single"
    ]
    eps_dataframe = album_data_dataframe.loc[
        album_data_dataframe["record_type"] == "ep"
    ]

    explicit_content = []
    albums = []
    singles = []
    eps = []

    if not explicit_content_dataframe.empty:
        explicit_content = group_dataframe(explicit_content_dataframe, "id")

    if not albums_dataframe.empty:
        albums = group_dataframe(albums_dataframe, "id")

    if not singles_dataframe.empty:
        singles = group_dataframe(singles_dataframe, "id")

    if not eps_dataframe.empty:
        eps = group_dataframe(eps_dataframe, "id")

    genre_ids = list(
        filter(
            lambda genre_id: int(genre_id) > 1,
            album_data_dataframe["genre_id"].unique(),
        )
    )

    genres = list(filter(lambda genre: genre["id"] in genre_ids, api_genres))

    mode_genre_series = album_data_dataframe["genre_id"].mode()
    popular_genre_id = mode_genre_series.iloc[0]

    most_popular_genre = list(
        filter(lambda genre: genre["id"] == popular_genre_id, genres)
    )[0]

    analytics = {
        "explicit_content": explicit_content,
        "albums": albums,
        "singles": singles,
        "eps": eps,
        "popular_genre": most_popular_genre,
        "genres": genres,
    }

    response_json.update({"analytics": schemas.ArtistAlbumsAnalytics(**analytics)})
    return response_json


@app.get("/api/request")
async def api_request(url: str):
    response = requests.get(url)
    return response.json()
