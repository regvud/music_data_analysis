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

  // TODO: visualize poping values

  return (
    <>
      <div className="p-4">
        <h1
          className={`text-2xl font-bold mb-2 ${showAlbums ? "text-blue-500 underline" : "text-gray-700"} cursor-pointer transition-all duration-200 hover:text-blue-700`}
          onClick={() => setShowAlbums((prev) => !prev)}
        >
          Albums: {analytics?.albums.length}
        </h1>

        {showAlbums && <AlbumMapper albums={analytics?.albums} flex={true} />}
      </div>

      <div className="p-4">
        <h1
          className={`text-2xl font-bold mb-2 ${showEps ? "text-blue-500 underline" : "text-gray-700"} cursor-pointer transition-all duration-200 hover:text-blue-700`}
          onClick={() => setShowEps((prev) => !prev)}
        >
          Eps: {analytics?.eps.length}
        </h1>
        {showEps && <AlbumMapper albums={analytics?.eps} flex={true} />}
      </div>

      <div className="p-4">
        <h1
          className={`text-2xl font-bold mb-2 ${showSingles ? "text-blue-500 underline" : "text-gray-700"} cursor-pointer transition-all duration-200 hover:text-blue-700`}
          onClick={() => setShowSingles((prev) => !prev)}
        >
          Singles: {analytics?.singles.length}
        </h1>
        {showSingles && <AlbumMapper albums={analytics?.singles} />}
      </div>

      <div className="p-4">
        <h1
          className={`text-2xl font-bold mb-2 ${showExplicit ? "text-blue-500 underline" : "text-gray-700"} cursor-pointer transition-all duration-200 hover:text-blue-700 `}
          onClick={() => setShowExplicit((prev) => !prev)}
        >
          Explicit: {analytics?.explicit_content.length}
        </h1>
        {showExplicit && (
          <AlbumMapper albums={analytics?.explicit_content} flex={true} />
        )}
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Popular genre:</h1>
        <GenreComponent genre={analytics?.popular_genre} />
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Genres:</h1>
        <div className="flex flex-wrap gap-2">
          <GenreMapper genres={analytics?.genres} flex={true} />
        </div>
      </div>
    </>
  );
};
