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
      (album as ArtistAlbumType).release_data !== undefined
    );
  }

  if (isArtistAlbumType(album)) {
    return (
      <div className="border border-black rounded">
        {album?.cover_medium && (
          <img onClick={goToAlbum} src={album.cover_medium} alt="" />
        )}
        <h1>Title: {album?.title}</h1>
        <h1>Fans: {album?.fans}</h1>
        <h1>Tracklist: {album?.release_data}</h1>
        <h1>Tracklist: {album?.tracklist}</h1>
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
