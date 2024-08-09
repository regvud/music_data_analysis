import { AlbumComponent } from "../components/AlbumComponent";
import { AlbumType, ArtistAlbumType } from "../types/content";

interface AlbumMapperProps {
  albums: AlbumType[] | ArtistAlbumType[] | undefined;
  flex?: boolean;
}

export const AlbumMapper = ({ albums, flex }: AlbumMapperProps) => {
  return (
    <div className={`flex ${flex ? "flex-row overflow-auto" : ""}`}>
      {albums?.map((album) => <AlbumComponent album={album} key={album.id} />)}
    </div>
  );
};
