import { SearchAnalyticsComponent } from "../components/analytics/SearchAnalyticsComponent";
import { SearchAnalyticsType } from "../types/content";

interface AnalyticsMapperProps {
  analytics: SearchAnalyticsType;
}

export const AnalyticsMapper = ({ analytics }: AnalyticsMapperProps) => {
  return (
    <>
      <SearchAnalyticsComponent search_analytics={analytics} />
    </>
  );
};
