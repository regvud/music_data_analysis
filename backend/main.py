import math
import os

import pandas as pd
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

import schemas
from pd_related import (
    dataframe_to_dict,
    df_column_contains,
    group_dataframe,
    normalize_keys_in_list,
)
from urls import baseURL, generate_image_url, searchURL

load_dotenv()

app = FastAPI()

app.add_middleware(
    SessionMiddleware, secret_key=os.getenv("SECRET_KEY", "skey_sequence")
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(
    "/",
    response_model=schemas.AnalyticsResponseSchema[
        schemas.TrackSchema, schemas.SearchAnalytics
    ],
)
async def search(search_query: str):
    response = requests.get(f"{searchURL}?q={search_query}")
    response_json = response.json()

    data = response_json.get("data")
    normalized_df = pd.json_normalize(data)

    search_df = pd.DataFrame(normalized_df)

    max_rating = search_df["rank"].max()
    min_rating = search_df["rank"].min()

    max_duration = search_df["duration"].max()
    min_duration = search_df["duration"].min()

    highest_rated_song = search_df[(search_df["rank"] == max_rating)]
    lowest_rated_song = search_df[(search_df["rank"] == min_rating)]
    longest_song = search_df[(search_df["duration"] == max_duration)]
    shortest_song = search_df[(search_df["duration"] == min_duration)]

    analytics = {
        "highest_rated": highest_rated_song,
        "lowest_rated": lowest_rated_song,
        "longest_duration": longest_song,
        "shortest_duration": shortest_song,
    }

    for k, df in analytics.items():
        analytics[k] = dataframe_to_dict(df)

    keys = ["title", "artist.name", "album.title"]
    for key in keys:
        ss_match = df_column_contains(search_df, key, search_query)

        key = key.replace(".", "_")
        if not ss_match.empty:
            grouped_data = group_dataframe(ss_match, group_by="id")
            normalized_list = normalize_keys_in_list(grouped_data)
            analytics.update({key: normalized_list})
        else:
            analytics[key] = []

    response_json.update({"analytics": analytics})
    return response_json


@app.get("/album", response_model=schemas.ResponseSchema[schemas.AlbumSchema])
async def search_by_album(album_title: str):
    response = requests.get(f"{searchURL}/album?q={album_title}")
    return response.json()


@app.get(
    "/album/{album_id}",
    response_model=schemas.AlbumByIdAnalyticsSchema[schemas.AlbumAnalytics],
)
async def album_by_id(album_id: int):
    response = requests.get(f"{baseURL}album/{album_id}")
    data: dict = response.json()
    tracks_data = data["tracks"]["data"]

    tracks_dataframe = pd.json_normalize(tracks_data)

    explicit_lyrics = tracks_dataframe.loc[tracks_dataframe["explicit_lyrics"]]
    explicit_lyrics["md5_image"] = explicit_lyrics["md5_image"].map(
        lambda image: generate_image_url(image)
    )

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

    album_by_id_response = {
        "album": data,
        "analytics": schemas.AlbumAnalytics(**analytics),
    }

    return album_by_id_response


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
