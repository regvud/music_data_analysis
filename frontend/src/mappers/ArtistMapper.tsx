import { ArtistComponent } from "../components/ArtistComponent";
import { ArtistType } from "../types/content";

interface ArtistMapperProps {
  artists: ArtistType[];
}

export const ArtistMapper = ({ artists }: ArtistMapperProps) => {
  return (
    <>
      {artists.map((artist) => (
        <ArtistComponent artist={artist} key={artist.id} />
      ))}
    </>
  );
};
