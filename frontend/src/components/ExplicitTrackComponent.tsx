import { ExplicitTrackWithArtistType } from "../types/content";

interface ExplicitTrackComponentProps {
  explicitTrack: ExplicitTrackWithArtistType;
}

export const ExplicitTrackComponent = ({
  explicitTrack,
}: ExplicitTrackComponentProps) => {
  return (
    <div className="border border-black">
      <h1>Title: {explicitTrack.title}</h1>
      <h1>Rank: {explicitTrack.rank}</h1>
      <h1>Duration: {explicitTrack.duration}</h1>
      <img src={explicitTrack.md5_image} alt="trackImage" />
    </div>
  );
};
