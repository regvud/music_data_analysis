import { useLocation } from "react-router-dom";
import { AnalyticsMapper } from "../mappers/AnalyticsMapper";
import { AnalyticsResponseType } from "../types/axiosTypes";
import { SearchAnalyticsType, TrackType } from "../types/content";

export const SearchResultsPage = () => {
  const location = useLocation();
  const results = location.state as AnalyticsResponseType<
    TrackType,
    SearchAnalyticsType
  >;

  const analytics = results.analytics;

  return (
    <div>
      <AnalyticsMapper analytics={analytics} />
    </div>
  );
};
