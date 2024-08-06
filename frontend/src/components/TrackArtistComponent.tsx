import { TrackArtistType } from "../types/content";

interface TrackArtistComponentProps {
  trackArtist: TrackArtistType;
}
export const TrackArtistComponent = ({
  trackArtist,
}: TrackArtistComponentProps) => {
  return (
    <div>
      <h2>Name: {trackArtist?.name}</h2>
      <h2>Tracklist: {trackArtist?.tracklist}</h2>
      {trackArtist?.picture_medium && (
        <img src={trackArtist.picture_medium} alt="artistPicture" />
      )}
    </div>
  );
};
