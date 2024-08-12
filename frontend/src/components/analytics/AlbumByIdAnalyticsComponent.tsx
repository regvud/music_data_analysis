import { useState } from "react";
import { ContributorMapper } from "../../mappers/ContributorMapper";
import { GenreMapper } from "../../mappers/GenreMapper";
import { AlbumByIdAnalyticsType } from "../../types/content";
import { ExplicitTrackComponent } from "../ExplicitTrackComponent";

interface AlbumByIdAnalyticsComponentProps {
  albumData: AlbumByIdAnalyticsType;
}
export const AlbumByIdAnalyticsComponent = ({
  albumData,
}: AlbumByIdAnalyticsComponentProps) => {
  const analytics = albumData?.analytics;
  const album = albumData?.album;

  const [showExplicit, setShowExplicit] = useState<boolean>(false);
  const [showContributors, setShowContributors] = useState<boolean>(false);
  const [showGenres, setShowGenres] = useState<boolean>(false);
  const [showTracks, setShowTracks] = useState<boolean>(false);

  const avgTrackDuration = (analytics.avg_track_duration / 60).toFixed(2);
  const maxTrackDuration = (analytics.max_track_duration / 60).toFixed(2);
  const minTrackDuration = (analytics.min_track_duration / 60).toFixed(2);

  const albumDuration = (album.duration / 60).toFixed();
  const avgRank = (analytics?.avg_track_rank / 1000).toFixed();

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
            {album?.title}
          </h1>
          <img
            src={album?.cover_big}
            alt="albumCover"
            className="w-50% object-cover rounded-lg mb-5 shadow-md"
          />
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <h1 className="text-lg font-semibold text-gray-600">
              Record Type: {album?.record_type}
            </h1>
            <h1 className="text-lg font-semibold text-gray-600 text-end">
              Release Date: {album?.release_date}
            </h1>
            <h1 className="text-lg font-semibold text-gray-600">
              Duration: {albumDuration} minutes
            </h1>
            <h1 className="text-lg font-semibold text-gray-600 text-end">
              Label: {album?.label}
            </h1>
            <h1 className="text-lg font-semibold text-gray-600">
              Fans: {album?.fans}
            </h1>
          </div>
          <div>
            <h1
              className="text-lg font-semibold text-indigo-500 cursor-pointer mb-2"
              onClick={() => setShowContributors((prev) => !prev)}
            >
              Contributors
            </h1>
            {showContributors && (
              <div className="pl-4 border-l-2 border-cyan-500">
                <ContributorMapper contributors={album.contributors} />
              </div>
            )}
          </div>
          <div>
            <h1
              className="text-lg font-semibold text-indigo-500 cursor-pointer mb-4"
              onClick={() => setShowGenres((prev) => !prev)}
            >
              Genres
            </h1>
            <div className="pl-4 border-l-2 border-cyan-500">
              {showGenres && (
                <GenreMapper genres={album?.genres?.data} flex={true} />
              )}
            </div>
            <div>
              <h1
                className="text-lg font-semibold text-indigo-500 cursor-pointer mb-4"
                onClick={() => setShowTracks((prev) => !prev)}
              >
                Tracks
              </h1>
              <div className="grid grid-cols-2 gap-4">
                {showTracks &&
                  album?.tracks?.data.map((explicitTrack) => (
                    <ExplicitTrackComponent
                      explicitTrack={explicitTrack}
                      key={explicitTrack.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">Analytics</h1>
        <h1 className="text-lg font-semibold text-gray-600">
          Average Track Rank: {avgRank}
        </h1>
        <div className="mt-4">
          <h1 className="text-lg font-semibold text-gray-600">
            Track Duration (minutes):
          </h1>
          <div className="flex justify-around w-full mt-2 bg-gray-100 p-4 rounded-lg shadow-inner">
            <h1 className="text-base text-gray-600">
              Average: {avgTrackDuration}
            </h1>
            <h1 className="text-base text-gray-600">Max: {maxTrackDuration}</h1>
            <h1 className="text-base text-gray-600">Min: {minTrackDuration}</h1>
          </div>
        </div>
        <h1
          className="text-lg font-semibold text-indigo-500 cursor-pointer mt-4"
          onClick={() => setShowExplicit((prev) => !prev)}
        >
          Explicit Tracks: {analytics.explicit_tracks.length}
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {showExplicit &&
            analytics.explicit_tracks.map((track) => (
              <ExplicitTrackComponent explicitTrack={track} key={track.id} />
            ))}
        </div>
      </div>
    </>
  );
};
