import { TrackType } from "../types/content";
import { TrackAlbumComponent } from "./TrackAlbumComponent";
import { TrackArtistComponent } from "./TrackArtistComponent";

interface TrackComponentProps {
  track: TrackType;
}

export const TrackComponent = ({ track }: TrackComponentProps) => {
  return (
    <div className="border border-black rounded">
      <h1>Track title: {track?.title}</h1>
      <h1>Duration: {Math.ceil(track?.duration / 60)}</h1>
      <h1>Rank: {Math.ceil(track?.rank / 1000)}</h1>
      <h1>Link: {track?.link}</h1>
      <div className="flex justify-around">
        <div>
          <h1 className="text-yellow-600">Artist: </h1>
          <TrackArtistComponent trackArtist={track?.artist} />
        </div>
        <div>
          <h1 className="text-yellow-600">Album: </h1>
          <TrackAlbumComponent trackAlbum={track?.album} />
        </div>
      </div>
    </div>
  );
};
