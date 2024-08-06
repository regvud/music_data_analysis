import { TrackAlbumType } from "../types/content";

interface TrackAlbumComponentProps {
  trackAlbum: TrackAlbumType;
}

export const TrackAlbumComponent = ({
  trackAlbum,
}: TrackAlbumComponentProps) => {
  return (
    <div>
      <h2>Title: {trackAlbum.title}</h2>
      <h2>Tracklist: {trackAlbum.tracklist}</h2>
      {trackAlbum?.cover_medium && (
        <img src={trackAlbum.cover_medium} alt="coverPicture" />
      )}
    </div>
  );
};
