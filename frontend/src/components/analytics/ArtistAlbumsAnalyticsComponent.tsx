import { useState } from "react";
import { AlbumMapper } from "../../mappers/AlbumMapper";
import { ArtistAlbumsAnalyticsType } from "../../types/content";

interface ArtistAlbumsAnalyticsComponentProps {
  analytics: ArtistAlbumsAnalyticsType | undefined;
}

export const ArtistAlbumsAnalyticsComponent = ({
  analytics,
}: ArtistAlbumsAnalyticsComponentProps) => {
  const [showAlbums, setShowAlbums] = useState<boolean>(false);
  const [showSingles, setShowSingles] = useState<boolean>(false);
  const [showEps, setShowEps] = useState<boolean>(false);
  const [showExplicit, setShowExplicit] = useState<boolean>(false);

  const cursorPointer = "cursor-pointer";
  const tagColor = `text-teal-500 ${cursorPointer}`;

  return (
    <>
      <h1
        className={showAlbums ? tagColor : cursorPointer}
        onClick={() => setShowAlbums((prev) => !prev)}
      >
        Albums
      </h1>
      {showAlbums && <AlbumMapper albums={analytics?.albums} />}
      <h1
        className={showEps ? tagColor : cursorPointer}
        onClick={() => setShowEps((prev) => !prev)}
      >
        Eps
      </h1>
      {showEps && <AlbumMapper albums={analytics?.eps} />}
      <h1
        className={showSingles ? tagColor : cursorPointer}
        onClick={() => setShowSingles((prev) => !prev)}
      >
        Singles
      </h1>
      {showSingles && <AlbumMapper albums={analytics?.singles} />}
      <h1
        className={showExplicit ? tagColor : cursorPointer}
        onClick={() => setShowExplicit((prev) => !prev)}
      >
        Explicit
      </h1>
      {showExplicit && <AlbumMapper albums={analytics?.explicit_content} />}
    </>
  );
};
