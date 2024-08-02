from pydantic import BaseModel
from typing import Dict, Generic, List, Optional, TypeVar


T = TypeVar("T")
A = TypeVar("A")


class ResponseSchema(BaseModel, Generic[T]):
    data: List[T]
    total: int
    prev: Optional[str] = None
    next: Optional[str] = None


class Analytics(BaseModel, Generic[A]):
    analytics: A


class AnalyticsResponseSchema(ResponseSchema[T], Analytics[A], Generic[T, A]):
    pass


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


class BaseTrackArtistSchema(BaseModel):
    id: int
    name: str
    tracklist: str
    type: str


class TrackArtistSchema(BaseTrackArtistSchema):
    link: Optional[str] = None
    picture_small: Optional[str] = None
    picture_medium: Optional[str] = None
    picture_big: Optional[str] = None
    picture_xl: Optional[str] = None


class BaseTrackSchema(BaseModel):
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
    type: str


class TrackSchema(BaseTrackSchema):
    artist: TrackArtistSchema
    album: TrackAlbumSchema


class TrackSchemaNoArtistPictures(BaseTrackSchema):
    artist: BaseTrackArtistSchema


class AlbumSchema(TrackAlbumSchema):
    link: str
    genre_id: int
    nb_tracks: Optional[int] = None
    record_type: str
    artist: Optional[TrackArtistSchema] = None


# Artist
class ArtistAlbumSchema(AlbumSchema):
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


class AlbumByIdSchema(ArtistAlbumSchema, Analytics, Generic[A]):
    upc: str
    share: str
    contributors: Optional[List[ContributorSchema]] = []
    genres: Dict[str, List["GenreSchema"]]
    label: str
    duration: int
    available: bool
    explicit_content_lyrics: int
    explicit_content_cover: int
    tracks: Dict[str, List[TrackSchemaNoArtistPictures]]


# Analytics schemas
class GenreSchema(BaseModel):
    id: int
    name: str
    picture: str


class ExplicitTrackSchema(BaseModel):
    id: int
    title: str
    image: str


class AlbumAnalytics(BaseModel):
    avg_track_duration: int
    min_track_duration: int
    max_track_duration: int

    avg_track_rank: int
    explicit_tracks: List[TrackSchemaNoArtistPictures] = []


class ArtistAlbumsAnalytics(BaseModel):
    explicit_content: List[ArtistAlbumSchema] = []
    albums: List[ArtistAlbumSchema] = []
    eps: List[ArtistAlbumSchema] = []
    singles: List[ArtistAlbumSchema] = []
    popular_genre: GenreSchema
    genres: List[GenreSchema] = []


class SearchAnalytics(BaseModel):
    highest_rated: TrackSchema
    lowest_rated: TrackSchema
    longest_duration: TrackSchema
    shortest_duration: TrackSchema
    title: List[TrackSchema] = []
    artist_name: List[TrackSchema] = []
    album_title: List[TrackSchema] = []
