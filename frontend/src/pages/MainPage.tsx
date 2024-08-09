import { SearchComponent } from "../components/SearchComponent";

export const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md mb-6">
        <SearchComponent title="By anything" navigateTo="/search" />
      </div>
      <div className="w-full max-w-md">
        <SearchComponent title="By Artist" navigateTo="/artist" />
      </div>
    </div>
  );
};
