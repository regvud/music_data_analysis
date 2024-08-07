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

export type BaseTrackArtistType = {
  id: number;
  name: string;
  tracklist: string;
  type: string;
};

export type TrackArtistType = BaseTrackArtistType & {
  link: string | undefined;
  picture_small: string | undefined;
  picture_medium: string | undefined;
  picture_big: string | undefined;
  picture_xl: string | undefined;
};

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

export type TrackType = BaseTrackType & {
  artist: TrackArtistType;
  album: TrackAlbumType;
};

export type ExplicitTrackWithArtistType = BaseTrackType & {
  artist: BaseTrackArtistType;
};

export type AlbumType = TrackAlbumType & {
  link: string;
  genre_id: number;
  record_type: string;
};

export type ArtistAlbumType = AlbumType & {
  fans: number;
  explicit_lyrics: boolean;
  release_date: string;
};

export type ArtistType = TrackArtistType & {
  nb_album: number;
  nb_fan: number;
  radio: boolean;
};

export type ContributorType = TrackArtistType & {
  share: number;
  radio: boolean;
  role: string;
};

export type TrackListType = {
  data: ExplicitTrackWithArtistType[];
};

export type AlbumByIdType = ArtistAlbumType & {
  upc: string;
  share: string;
  contributors: ContributorType[] | [];
  genres: { data: GenreType[] };
  label: string;
  duration: number;
  available: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  tracks: TrackListType;
};

export type GenreType = {
  id: number;
  name: string;
  picture: string;
};

export type AlbumAnalyticsType = {
  avg_track_duration: number;
  min_track_duration: number;
  max_track_duration: number;

  avg_track_rank: number;
  explicit_tracks: ExplicitTrackWithArtistType[] | [];
};

export type AlbumByIdAnalyticsType = {
  album: AlbumByIdType;
  analytics: AlbumAnalyticsType;
};

export type ArtistAlbumsAnalyticsType = {
  explicit_content: ArtistAlbumType[] | [];
  albums: ArtistAlbumType[] | [];
  eps: ArtistAlbumType[] | [];
  singles: ArtistAlbumType[] | [];
  popular_genre: GenreType | undefined;
  genres: GenreType[] | [];
};

export type SearchAnalyticsType = {
  highest_rated: TrackType;
  lowest_rated: TrackType;
  longest_duration: TrackType;
  shortest_duration: TrackType;
  title: TrackType[] | [];
  artist_name: TrackType[] | [];
  album_title: TrackType[] | [];
};
