import { TrackType } from "../types/content";

interface TrackComponentProps {
  track: TrackType;
}

export const TrackComponent = ({ track }: TrackComponentProps) => {
  return (
    <div className="border border-black rounded">
      <h1>{track.id}</h1>
      <h1>{track.title}</h1>
      <h1>{track.link}</h1>
      <h1>{track.duration}</h1>
      <h1>{track.rank}</h1>
      <h1>{track.type}</h1>
      {/* <h2>{track.album}</h1> */}
      {/* <h1>{track.atrist}</h1> */}
    </div>
  );
};
