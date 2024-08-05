import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchService } from "../services/fetchApi";
import { AnalyticsResponseType } from "../types/axiosTypes";
import { SearchAnalyticsType, TrackType } from "../types/content";

export const SearchComponent = () => {
  const inputRef = useRef("");
  const navigate = useNavigate();

  const [searchData, setSearchData] =
    useState<AnalyticsResponseType<TrackType, SearchAnalyticsType>>();

  const [errorMsg, setErrorMsg] = useState<string>("");

  function searchForInput() {
    fetchService
      .search(inputRef.current)
      .then(({ data }) => setSearchData(data))
      .catch((error: AxiosError) => setErrorMsg(error.message));
  }

  useEffect(() => {
    if (searchData) {
      navigate("/search", { state: searchData });
    }
  }, [searchData, navigate]);

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => (inputRef.current = e.target.value)}
      />
      <button onClick={searchForInput}>Submit</button>
      {errorMsg && <h1>{errorMsg}</h1>}
    </div>
  );
};
