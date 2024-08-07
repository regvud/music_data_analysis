import { GenreComponent } from "../components/GenreComponent";
import { GenreType } from "../types/content";

interface GenreMapperProps {
  genres: GenreType[] | undefined;
}

export const GenreMapper = ({ genres }: GenreMapperProps) => {
  return (
    <>
      {genres?.map((genre) => <GenreComponent genre={genre} key={genre.id} />)}
    </>
  );
};
