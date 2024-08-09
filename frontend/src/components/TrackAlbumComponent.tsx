import { useNavigate } from "react-router-dom";
import { TrackAlbumType } from "../types/content";
import { deezerURL } from "../urls/urls";

interface TrackAlbumComponentProps {
  trackAlbum: TrackAlbumType;
}

export const TrackAlbumComponent = ({
  trackAlbum,
}: TrackAlbumComponentProps) => {
  const navigate = useNavigate();

  function goToAlbum() {
    navigate(`/album/${trackAlbum?.id}`);
  }

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white flex flex-col justify-evenly items-center h-[300px] w-[400px]">
      <p className="text-xl font-semibold text-gray-800 mb-2 w-full">
        <span className="font-normal text-gray-600 text-ellipsis text-center whitespace-nowrap overflow-hidden block w-full">
          {trackAlbum?.title}
        </span>
      </p>
      {trackAlbum?.cover_medium && (
        <img
          src={trackAlbum.cover_medium}
          alt="Album Cover"
          className="w-32 h-32 object-cover rounded-md mt-4 border-2 border-gray-300"
          onClick={goToAlbum}
        />
      )}
      <p className="text-lg font-semibold text-gray-800 mb-2">
        <a
          href={`${deezerURL}album/${trackAlbum.id}`}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${deezerURL}/album/${trackAlbum.id}`}
        </a>
      </p>
    </div>
  );
};
