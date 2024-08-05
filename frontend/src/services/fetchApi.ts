import axios from "axios";
import { AnalyticsResponseType } from "../types/axiosTypes";
import { SearchAnalyticsType, TrackType } from "../types/content";
import { baseURL, urls } from "../urls/urls";

const apiService = axios.create({ baseURL });

export const fetchService = {
  search: (query: string) =>
    apiService.get<AnalyticsResponseType<TrackType, SearchAnalyticsType>>(
      urls.search.base(query),
    ),
};
