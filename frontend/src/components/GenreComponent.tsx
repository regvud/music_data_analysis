import { GenreType } from "../types/content";

interface GenreComponentProps {
  genre: GenreType | null | undefined;
}

export const GenreComponent = ({ genre }: GenreComponentProps) => {
  return (
    <div className="flex flex-col items-center bg-white p-8 m-5 shadow-md rounded-lg w-[300px]">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{genre?.name}</h1>
      <img
        src={genre?.picture}
        alt="genrePicture"
        className="w-32 h-32 object-cover rounded-full shadow-lg"
      />
    </div>
  );
};
