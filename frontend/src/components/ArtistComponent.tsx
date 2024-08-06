import { useNavigate } from "react-router-dom";
import { ArtistType } from "../types/content";

interface ArtistComponentProps {
  artist: ArtistType;
}

export const ArtistComponent = ({ artist }: ArtistComponentProps) => {
  const navigate = useNavigate();

  function goToArtist() {
    navigate(`${artist.id}`);
  }

  return (
    <div className="border border-black rounded">
      {artist?.picture_medium && (
        <img onClick={goToArtist} src={artist.picture_medium} alt="" />
      )}
      <h1>Name: {artist?.name}</h1>
      <h1>Albums: {artist?.nb_album}</h1>
      <h1>Fans: {artist?.nb_fan}</h1>
      <h1>Tracklist: {artist?.tracklist}</h1>
    </div>
  );
};
