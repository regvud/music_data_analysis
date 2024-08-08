import { SearchComponent } from "../components/SearchComponent";

export const MainPage = () => {
  return (
    <>
      <SearchComponent title="Search" navigateTo="/search" />
      <SearchComponent title="By Artist" navigateTo="/artist" />
    </>
  );
};
