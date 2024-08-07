import { useState } from "react";
import { AlbumMapper } from "../../mappers/AlbumMapper";
import { GenreMapper } from "../../mappers/GenreMapper";
import { ArtistAlbumsAnalyticsType } from "../../types/content";
import { GenreComponent } from "../GenreComponent";

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

  // TODO: visualize poping values

  return (
    <>
      <div>
        <h1
          className={showAlbums ? tagColor : cursorPointer}
          onClick={() => setShowAlbums((prev) => !prev)}
        >
          Albums: {analytics?.albums.length}
        </h1>
        {showAlbums && <AlbumMapper albums={analytics?.albums} />}
      </div>
      <div>
        <h1
          className={showEps ? tagColor : cursorPointer}
          onClick={() => setShowEps((prev) => !prev)}
        >
          Eps: {analytics?.eps.length}
        </h1>
        {showEps && <AlbumMapper albums={analytics?.eps} />}
      </div>
      <div>
        <h1
          className={showSingles ? tagColor : cursorPointer}
          onClick={() => setShowSingles((prev) => !prev)}
        >
          Singles: {analytics?.singles.length}
        </h1>
        {showSingles && <AlbumMapper albums={analytics?.singles} />}
      </div>
      <div>
        <h1
          className={showExplicit ? tagColor : cursorPointer}
          onClick={() => setShowExplicit((prev) => !prev)}
        >
          Explicit: {analytics?.explicit_content.length}
        </h1>
        {showExplicit && <AlbumMapper albums={analytics?.explicit_content} />}
      </div>
      <div>
        <h1>Popular genre: </h1>
        <GenreComponent genre={analytics?.popular_genre} />
      </div>
      <div>
        <h1>Genres: </h1>
        <div className="flex">
          <GenreMapper genres={analytics?.genres} />
        </div>
      </div>
    </>
  );
};
