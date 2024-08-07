import { GenreType } from "../types/content";

interface GenreComponentProps {
  genre: GenreType | null | undefined;
}

export const GenreComponent = ({ genre }: GenreComponentProps) => {
  return (
    <div>
      <h1>{genre?.name}</h1>
      <img src={genre?.picture} alt="genrePicture" />
    </div>
  );
};
