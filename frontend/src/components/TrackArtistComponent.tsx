import { TrackArtistType } from "../types/content";

interface TrackArtistComponentProps {
  trackArtist: TrackArtistType;
}
export const TrackArtistComponent = ({
  trackArtist,
}: TrackArtistComponentProps) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white flex flex-col justify-evenly items-center h-[300px]">
      <p className="text-xl font-semibold text-gray-800 mb-2">
        <span className="font-normal text-gray-600">{trackArtist?.name}</span>
      </p>
      {trackArtist?.picture_medium && (
        <img
          src={trackArtist.picture_medium}
          alt="ArtistPicture"
          className="w-32 h-32 object-cover rounded-full mt-4 border-2 border-gray-300"
        />
      )}
      <p className="text-lg font-semibold text-gray-800 mb-2">
        Link:{" "}
        <a
          href={trackArtist?.link}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {trackArtist?.link}
        </a>
      </p>
    </div>
  );
};
