from pydantic import BaseModel
from typing import Dict, Generic, List, Optional, TypeVar


T = TypeVar("T")
P = TypeVar("P")


class ResponseSchema(BaseModel, Generic[T, P]):
    data: List[T]
    total: int
    prev: Optional[str] = None
    next: Optional[str] = None

    pandas_data: Optional[P] = None


# Track
class TrackAlbumSchema(BaseModel):
    id: int
    title: str
    cover: str
    cover_small: str
    cover_medium: str
    cover_big: str
    cover_xl: str
    md5_image: str
    tracklist: str
    type: str


class TrackArtistSchema(BaseModel):
    id: int
    name: str
    link: Optional[str] = None
    picture_small: Optional[str] = None
    picture_medium: Optional[str] = None
    picture_big: Optional[str] = None
    picture_xl: Optional[str] = None
    tracklist: str
    type: str


class TrackSchema(BaseModel):
    id: int
    readable: bool
    title: str
    title_short: str
    title_version: Optional[str] = ""
    link: str
    duration: int
    rank: int
    explicit_lyrics: bool
    explicit_content_lyrics: int
    explicit_content_cover: int
    preview: str
    md5_image: str
    artist: TrackArtistSchema
    album: TrackAlbumSchema
    type: str


class AlbumSchema(TrackAlbumSchema):
    link: str
    genre_id: int
    nb_tracks: Optional[int] = None
    record_type: str
    artist: Optional[TrackArtistSchema] = None


# Artist
class ArtistAlbumsSchema(AlbumSchema):
    fans: int
    explicit_lyrics: bool
    release_date: str


class ArtistSchema(TrackArtistSchema):
    nb_album: int
    nb_fan: int
    radio: bool


class ContributorSchema(TrackArtistSchema):
    share: str
    radio: bool
    role: str


class AlbumByIdSchema(ArtistAlbumsSchema):
    upc: str
    share: str
    contributors: Optional[List[ContributorSchema]] = None
    genres: Dict[str, List["GenreSchema"]]
    label: str
    duration: int
    available: bool
    explicit_content_lyrics: int
    explicit_content_cover: int
    tracks: Dict[str, List[TrackSchema]]


# Pandas schemas
class GenreSchema(BaseModel):
    id: int
    name: str
    picture: str


class ArtistAlbumsAnalytics(BaseModel):
    explicit_tracks: int
    albums: int
    eps: int
    singles: int
    genres: List[GenreSchema]
