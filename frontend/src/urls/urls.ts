export const baseURL = "http://localhost:8000";
export const deezerURL = "https://www.deezer.com/";

export const urls = {
  search: {
    base: (query: string) => `/?search_query=${query}`,
    artist: (name: string) => `/artist?artist_name=${name}`,
    album: (title: string) => `/album?album_title=${title}`,
  },
  artist: {
    byId: (id: number) => `/artist/${id}`,
    albums: (id: number) => `/artist/${id}/albums`,
  },
  album: {
    byId: (id: number) => `/album/${id}`,
  },
};
