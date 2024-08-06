import { useLocation } from "react-router-dom";
import { ArtistMapper } from "../mappers/ArtistMapper";
import { ResponseType } from "../types/axiosTypes";
import { ArtistType } from "../types/content";

export const ArtistResultsPage = () => {
  const location = useLocation();
  const results = location.state as ResponseType<ArtistType>;
  const artists = results.data;

  return (
    <div>
      <h1>Artists: </h1>
      <ArtistMapper artists={artists} />
    </div>
  );
};
