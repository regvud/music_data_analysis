import { useNavigate } from "react-router-dom";
import { AlbumType, ArtistAlbumType } from "../types/content";

interface AlbumComponentProps {
  album: AlbumType | ArtistAlbumType;
}

export const AlbumComponent = ({ album }: AlbumComponentProps) => {
  const navigate = useNavigate();

  function goToAlbum() {
    navigate(`/album/${album.id}`);
  }

  function isArtistAlbumType(
    album: AlbumType | ArtistAlbumType,
  ): album is ArtistAlbumType {
    return (
      (album as ArtistAlbumType).fans !== undefined &&
      (album as ArtistAlbumType).release_date !== undefined
    );
  }

  if (isArtistAlbumType(album)) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 m-4 shadow-lg bg-white max-w-[400px]">
        <div className="flex justify-center">
          {album?.cover_medium && (
            <img
              onClick={goToAlbum}
              src={album.cover_medium}
              alt="Album Cover"
              className="rounded-md mb-4 cursor-pointer transform transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>
        <h1 className="text-nowrap overflow-ellipsis overflow-hidden text-xl font-semibold mb-3">
          {album?.title}
        </h1>
        <h1 className="text-md text-gray-600 mb-2">Fans: {album?.fans}</h1>
        <h1 className="text-md text-gray-600 mb-2">
          Released: {album?.release_date}
        </h1>
        <h1 className="text-md text-gray-600 mb-2">
          Link:{" "}
          <a
            href={album?.link}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {album?.link}
          </a>
        </h1>
      </div>
    );
  }

  return (
    <div className="border border-black rounded">
      {album?.cover_medium && (
        <img onClick={goToAlbum} src={album.cover_medium} alt="" />
      )}
      <h1>Title: {album?.title}</h1>
      <h1>Tracklist: {album?.tracklist}</h1>
    </div>
  );
};
