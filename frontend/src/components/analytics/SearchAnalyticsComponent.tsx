import { TrackMapper } from "../../mappers/TrackMapper";
import { SearchAnalyticsType } from "../../types/content";
import { TrackComponent } from "../TrackComponent";
import { v4 as uuid } from "uuid";

interface SearchAnalyticsComponentProps {
  search_analytics: SearchAnalyticsType;
}

const headerStyle =
  "text-2xl font-bold text-Purple-300 mb-4 border-b-2 border-Purple-500 pb-2";

const paragraphStyle = "text-lg font-medium text-gray-700 mb-2";

export const SearchAnalyticsComponent = ({
  search_analytics,
}: SearchAnalyticsComponentProps) => {
  return (
    <div className="space-y-6">
      {search_analytics.title.length > 0 && (
        <div>
          <h1 className={headerStyle}>By Title</h1>
          <TrackMapper tracks={search_analytics?.title} key={uuid()} />
        </div>
      )}
      {search_analytics.album_title.length > 0 && (
        <div>
          <h1 className={headerStyle}>By Album Title</h1>
          <TrackMapper tracks={search_analytics?.album_title} key={uuid()} />
        </div>
      )}
      {search_analytics.artist_name.length > 0 && (
        <div>
          <h1 className={headerStyle}>By Artist Name</h1>
          <TrackMapper tracks={search_analytics?.artist_name} key={uuid()} />
        </div>
      )}
      <div>
        <h1 className={headerStyle}>Rating</h1>
        <p className={paragraphStyle}>Highest:</p>
        <TrackComponent track={search_analytics?.highest_rated} />
        <p className={paragraphStyle}>Lowest: </p>
        <TrackComponent track={search_analytics?.lowest_rated} />
      </div>
      <div>
        <h1 className={headerStyle}>Duration</h1>
        <p className={paragraphStyle}>Longest: </p>
        <TrackComponent track={search_analytics?.longest_duration} />
        <p className={paragraphStyle}>Shortest: </p>
        <TrackComponent track={search_analytics?.shortest_duration} />
      </div>
    </div>
  );
};
