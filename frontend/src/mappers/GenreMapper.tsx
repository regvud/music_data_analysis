import { GenreComponent } from "../components/GenreComponent";
import { GenreType } from "../types/content";

interface GenreMapperProps {
  genres: GenreType[] | undefined;
  flex?: boolean;
}

export const GenreMapper = ({ genres, flex }: GenreMapperProps) => {
  return (
    <div className={flex ? "flex flex-row overflow-auto" : ""}>
      {genres?.map((genre) => <GenreComponent genre={genre} key={genre.id} />)}
    </div>
  );
};
