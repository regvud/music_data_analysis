// # Track
// class TrackAlbumSchema(BaseModel):
//     id: int
//     title: str
//     cover: str
//     cover_small: str
//     cover_medium: str
//     cover_big: str
//     cover_xl: str
//     md5_image: str
//     tracklist: str
//     type: str
export type TrackAlbumType = {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
};

//
//
// class BaseTrackArtistSchema(BaseModel):
//     id: int
//     name: str
//     tracklist: str
//     type: str
//
export type BaseTrackArtistType = {
  id: number;
  name: string;
  tracklist: string;
  type: string;
};

// class TrackArtistSchema(BaseTrackArtistSchema):
//     link: Optional[str] = None
//     picture_small: Optional[str] = None
//     picture_medium: Optional[str] = None
//     picture_big: Optional[str] = None
//     picture_xl: Optional[str] = None
export type TrackArtistType = BaseTrackArtistType & {
  link: string | null;
  picture_small: string | null;
  picture_medium: string | null;
  picture_big: string | null;
  picture_xl: string | null;
};
//
// class BaseTrackSchema(BaseModel):
//     id: int
//     readable: bool
//     title: str
//     title_short: str
//     title_version: Optional[str] = ""
//     link: str
//     duration: int
//     rank: int
//     explicit_lyrics: bool
//     explicit_content_lyrics: int
//     explicit_content_cover: int
//     preview: str
//     md5_image: str
//     type: str
export type BaseTrackType = {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string | "";
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  type: string;
};

//
// class TrackSchema(BaseTrackSchema):
//     artist: TrackArtistSchema
//     album: TrackAlbumSchema
export type TrackType = BaseTrackType & {
  artist: TrackArtistType;
  album: TrackAlbumType;
};

//
// class TrackSchemaNoArtistPictures(BaseTrackSchema):
//     artist: BaseTrackArtistSchema
export type TrackNoArtistPicturesType = BaseTrackType & {
  artist: BaseTrackArtistType;
};
//
// class AlbumSchema(TrackAlbumSchema):
//     link: str
//     genre_id: int
//     nb_tracks: Optional[int] = None
//     record_type: str
//     artist: Optional[TrackArtistSchema] = None
export type AlbumType = TrackAlbumType & {
  link: string;
  genre_id: number;
  // nb_tracks: number | null;
  record_type: string;
  // artist: TrackArtistType | null;
};

//
// # Artist
// class ArtistAlbumSchema(AlbumSchema):
//     fans: int
//     explicit_lyrics: bool
//     release_date: str
export type ArtistAlbumType = AlbumType & {
  fans: number;
  explicit_lyrics: boolean;
  release_data: string;
};

// class ArtistSchema(TrackArtistSchema):
//     nb_album: int
//     nb_fan: int
//     radio: bool
export type ArtistType = TrackArtistType & {
  nb_album: number;
  nb_fan: number;
  radio: boolean;
};
//
// class ContributorSchema(TrackArtistSchema):
//     share: str
//     radio: bool
//     role: str
export type ContributorType = TrackArtistType & {
  share: number;
  radio: boolean;
  role: string;
};
//
// class AlbumByIdSchema(ArtistAlbumSchema, Analytics, Generic[A]):
//     upc: str
//     share: str
//     contributors: Optional[List[ContributorSchema]] = []
//     genres: Dict[str, List["GenreSchema"]]
//     label: str
//     duration: int
//     available: bool
//     explicit_content_lyrics: int
//     explicit_content_cover: int
//     tracks: Dict[str, List[TrackSchemaNoArtistPictures]]
export type TrackListType = {
  data: TrackNoArtistPicturesType[];
};

export type AlbumByIdType = ArtistAlbumType & {
  ups: string;
  share: string;
  contributors: ContributorType[] | [];
  genres: GenreType[];
  label: string;
  duration: number;
  availabel: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  tracks: TrackListType;
};

//
// # Analytics schemas
// class GenreSchema(BaseModel):
//     id: int
//     name: str
//     picture: str
export type GenreType = {
  id: number;
  name: string;
  picture: string;
};
//
// class ExplicitTrackSchema(BaseModel):
//     id: int
//     title: str
//     image: str
export type ExplicitTrackType = {
  id: number;
  title: string;
  image: string;
};
//
// class AlbumAnalytics(BaseModel):
//     avg_track_duration: int
//     min_track_duration: int
//     max_track_duration: int
//
//     avg_track_rank: int
//     explicit_tracks: List[TrackSchemaNoArtistPictures] = []
export type AlbumAnalyticsType = {
  avg_track_duration: number;
  min_track_duration: number;
  max_track_duration: number;

  avg_track_rank: number;
  explicit_tracks: TrackNoArtistPicturesType[] | [];
};

//
// class ArtistAlbumsAnalytics(BaseModel):
//     explicit_content: List[ArtistAlbumSchema] = []
//     albums: List[ArtistAlbumSchema] = []
//     eps: List[ArtistAlbumSchema] = []
//     singles: List[ArtistAlbumSchema] = []
//     popular_genre: GenreSchema
//     genres: List[GenreSchema] = []
export type ArtistAlbumsAnalyticsType = {
  explicit_content: ArtistAlbumType[] | [];
  albums: ArtistAlbumType[] | [];
  eps: ArtistAlbumType[] | [];
  singles: ArtistAlbumType[] | [];
  popular_genre: GenreType | null;
  genres: GenreType[] | [];
};
//
// class SearchAnalytics(BaseModel):
//     highest_rated: TrackSchema
//     lowest_rated: TrackSchema
//     longest_duration: TrackSchema
//     shortest_duration: TrackSchema
//     title: List[TrackSchema] = []
//     artist_name: List[TrackSchema] = []
//     album_title: List[TrackSchema] = []
export type SearchAnalyticsType = {
  highest_rated: TrackType;
  lowest_rated: TrackType;
  longest_duration: TrackType;
  shortest_duration: TrackType;
  title: TrackType[] | [];
  artist_name: TrackType[] | [];
  album_title: TrackType[] | [];
};
