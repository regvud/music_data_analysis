import { TrackType } from "../types/content";
import { TrackAlbumComponent } from "./TrackAlbumComponent";
import { TrackArtistComponent } from "./TrackArtistComponent";

interface TrackComponentProps {
  track: TrackType;
}

export const TrackComponent = ({ track }: TrackComponentProps) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 m-5 max-w-[60%] mx-auto bg-white">
      <h1 className="text-2xl font-bold text-green-500 mb-2">{track?.title}</h1>
      <p className="text-gray-600 mb-1">
        Duration: {Math.ceil(track?.duration / 60)} minutes
      </p>
      <p className="text-gray-600 mb-1">
        Rank: {Math.ceil(track?.rank / 1000)}
      </p>
      <p className="text-gray-600 mb-4">
        Link:{" "}
        <a
          href={track?.link}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {track?.link}
        </a>
      </p>

      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-semibold text-yellow-600 mb-1">
            Artist:
          </h2>
          <TrackArtistComponent trackArtist={track?.artist} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-yellow-600 mb-1">Album:</h2>
          <TrackAlbumComponent trackAlbum={track?.album} />
        </div>
      </div>
    </div>
  );
};
