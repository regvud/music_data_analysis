import { TrackComponent } from "../components/TrackComponent";
import { TrackType } from "../types/content";

interface TrackMapperProps {
  tracks: TrackType[];
}

export const TrackMapper = ({ tracks }: TrackMapperProps) => {
  return (
    <>
      {tracks.map((track) => (
        <TrackComponent track={track} key={track.id} />
      ))}
    </>
  );
};
