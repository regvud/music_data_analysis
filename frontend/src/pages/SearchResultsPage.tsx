import { useLocation } from "react-router-dom";
import { AnalyticsMapper } from "../mappers/AnalyticsMapper";
import { TrackMapper } from "../mappers/TrackMapper";
import { AnalyticsResponseType } from "../types/axiosTypes";
import { SearchAnalyticsType, TrackType } from "../types/content";

export const SearchResultsPage = () => {
  const location = useLocation();
  const results = location.state as AnalyticsResponseType<
    TrackType,
    SearchAnalyticsType
  >;

  // const tracks = results.data;
  const analytics = results.analytics;

  return (
    <div>
      {/* <h1>Search results</h1> */}
      {/* <TrackMapper tracks={tracks} /> */}
      <AnalyticsMapper analytics={analytics} />
    </div>
  );
};
