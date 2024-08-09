import { useNavigate } from "react-router-dom";
import { ArtistType } from "../types/content";

interface ArtistComponentProps {
  artist: ArtistType;
}

export const ArtistComponent = ({ artist }: ArtistComponentProps) => {
  const navigate = useNavigate();

  function goToArtist() {
    navigate(`${artist.id}`, { state: { artistName: artist?.name } });
  }

  return (
    <div className="border-2 border-indigo-500 rounded-xl shadow-2xl p-6 m-5 bg-white">
      {artist?.picture_xl && (
        <img
          onClick={goToArtist}
          src={artist.picture_xl}
          alt=""
          className="w-full object-cover rounded-xl cursor-pointer"
        />
      )}
      <div className="mt-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Name: {artist?.name}
        </h1>
        <h1 className="text-xl text-gray-800">Albums: {artist?.nb_album}</h1>
        <h1 className="text-xl text-gray-800">Fans: {artist?.nb_fan}</h1>
        <h1 className="text-xl text-gray-800">
          Link:{" "}
          <a
            href={artist?.link}
            className="text-blue-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {artist?.link}
          </a>
        </h1>
      </div>
    </div>
  );
};
