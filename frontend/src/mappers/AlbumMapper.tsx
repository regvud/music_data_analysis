import { AlbumComponent } from "../components/AlbumComponent";
import { AlbumType, ArtistAlbumType } from "../types/content";

interface AlbumMapperProps {
  albums: AlbumType[] | ArtistAlbumType[] | undefined;
}

export const AlbumMapper = ({ albums }: AlbumMapperProps) => {
  return (
    <>
      {albums?.map((album) => <AlbumComponent album={album} key={album.id} />)}
    </>
  );
};
