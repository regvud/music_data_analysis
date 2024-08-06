import { TrackMapper } from "../../mappers/TrackMapper";
import { SearchAnalyticsType } from "../../types/content";
import { TrackComponent } from "../TrackComponent";

interface SearchAnalyticsComponentProps {
  search_analytics: SearchAnalyticsType;
}

export const SearchAnalyticsComponent = ({
  search_analytics,
}: SearchAnalyticsComponentProps) => {
  return (
    <div>
      <div>
        <h1 className="text-red-500">Rating</h1>
        <TrackComponent track={search_analytics?.highest_rated} />
        <TrackComponent track={search_analytics?.lowest_rated} />
      </div>
      <div>
        <h1 className="text-red-500">Duration</h1>
        <TrackComponent track={search_analytics?.longest_duration} />
        <TrackComponent track={search_analytics?.shortest_duration} />
      </div>
      {search_analytics.title.length > 0 && (
        <div>
          <h1 className="text-red-500">By title</h1>
          <TrackMapper tracks={search_analytics?.title} />
        </div>
      )}
      {search_analytics.album_title.length > 0 && (
        <div>
          <h1 className="text-red-500">By album title</h1>
          <TrackMapper tracks={search_analytics?.album_title} />
        </div>
      )}
      {search_analytics.artist_name.length > 0 && (
        <div>
          <h1 className="text-red-500">By artist name</h1>
          <TrackMapper tracks={search_analytics?.artist_name} />
        </div>
      )}
    </div>
  );
};
