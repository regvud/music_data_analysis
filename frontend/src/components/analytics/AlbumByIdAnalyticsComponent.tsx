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

  const avgTrackDuration = (analytics.avg_track_duration / 60).toFixed(2);
  const maxTrackDuration = (analytics.max_track_duration / 60).toFixed(2);
  const minTrackDuration = (analytics.min_track_duration / 60).toFixed(2);

  const albumDuration = (album.duration / 60).toFixed(2);

  // TODO: visualize poping values
  return (
    <>
      <div>
        <h1>Album Title: {album?.title}</h1>
        <img src={album?.cover_big} alt="albumCover" />
        <h1>Record Type: {album?.record_type}</h1>
        <h1>Release Date: {album?.release_date}</h1>
        <h1>Duration: {albumDuration}</h1>
        <h1>Label: {album?.label}</h1>
        <h1>Fans: {album?.fans}</h1>
        <h1
          className="cursor-pointer"
          onClick={() => setShowContributors((prev) => !prev)}
        >
          Contributors
        </h1>
        {showContributors && (
          <ContributorMapper contributors={album.contributors} />
        )}
        <h1
          className="cursor-pointer"
          onClick={() => setShowGenres((prev) => !prev)}
        >
          Genres
        </h1>
        <div>{showGenres && <GenreMapper genres={album?.genres?.data} />}</div>
      </div>
      <div>
        <h1>Analytics: </h1>
        <h1>Average Rank: {analytics?.avg_track_rank}</h1>
        <div>
          <h1>Track Duration: </h1>
          <div className="flex justify-around w-[500px]">
            <h1>Average: {avgTrackDuration}</h1>
            <h1>Max: {maxTrackDuration}</h1>
            <h1>Min: {minTrackDuration}</h1>
          </div>
        </div>
        <h1
          className="cursor-pointer"
          onClick={() => setShowExplicit((prev) => !prev)}
        >
          Explicit Tracks: {analytics.explicit_tracks.length}
        </h1>
        {showExplicit &&
          analytics.explicit_tracks.map((track) => (
            <ExplicitTrackComponent explicitTrack={track} key={track.id} />
          ))}
      </div>
    </>
  );
};
