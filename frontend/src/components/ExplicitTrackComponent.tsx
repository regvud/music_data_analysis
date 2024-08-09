import { ExplicitTrackWithArtistType } from "../types/content";

interface ExplicitTrackComponentProps {
  explicitTrack: ExplicitTrackWithArtistType;
}

export const ExplicitTrackComponent = ({
  explicitTrack,
}: ExplicitTrackComponentProps) => {
  const trackDuration = (explicitTrack?.duration / 60).toFixed(2);
  const trackRank = (explicitTrack?.rank / 60).toFixed();

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 m-5 max-w-sm mx-auto bg-white w-[400px]">
      <img
        src={explicitTrack?.md5_image}
        alt="trackImage"
        className="w-full object-cover rounded-md mb-4"
      />
      <div className="space-y-2">
        <h1 className="text-nowrap overflow-ellipsis overflow-hidden text-2xl font-bold text-gray-800">
          {explicitTrack?.title}
        </h1>
        <h2 className="text-lg text-gray-600">Rank: {trackRank}</h2>
        <h2 className="text-md text-gray-500">
          Duration: {trackDuration} minutes
        </h2>
        <a
          href={explicitTrack?.link}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {explicitTrack?.link}
        </a>
      </div>
    </div>
  );
};
