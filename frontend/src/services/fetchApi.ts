import axios from "axios";
import { AnalyticsResponseType, ResponseType } from "../types/axiosTypes";
import {
  AlbumByIdAnalyticsType,
  AlbumType,
  ArtistAlbumsAnalyticsType,
  ArtistType,
  SearchAnalyticsType,
  TrackType,
} from "../types/content";
import { baseURL, urls } from "../urls/urls";

const apiService = axios.create({ baseURL });

export const fetchService = {
  search: {
    base: (query: string) =>
      apiService.get<AnalyticsResponseType<TrackType, SearchAnalyticsType>>(
        urls.search.base(query),
      ),
    album: (album_title: string) =>
      apiService.get(urls.search.album(album_title)),
    artist: (artist_name: string) =>
      apiService.get<ResponseType<ArtistType[]>>(
        urls.search.artist(artist_name),
      ),
  },
  artistAlbums: (artistId: number) =>
    apiService.get<AnalyticsResponseType<AlbumType, ArtistAlbumsAnalyticsType>>(
      urls.artist.albums(artistId),
    ),
  albumById: (albumId: number) =>
    apiService.get<AlbumByIdAnalyticsType>(urls.album.byId(albumId)),
};
