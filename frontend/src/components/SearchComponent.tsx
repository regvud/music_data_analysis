import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchService } from "../services/fetchApi";

interface SearchComponentProps {
  title: string;
  navigateTo: string;
}

export const SearchComponent = ({
  title,
  navigateTo,
}: SearchComponentProps) => {
  const inputRef = useRef("");
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState<any>();

  const [errorMsg, setErrorMsg] = useState<string>("");

  function searchForInput() {
    switch (navigateTo) {
      case "/search":
        fetchService.search
          .base(inputRef.current)
          .then(({ data }) => setSearchData(data))
          .catch((error: AxiosError) => setErrorMsg(error.message));
        break;
      case "/artist":
        fetchService.search
          .artist(inputRef.current)
          .then(({ data }) => setSearchData(data))
          .catch((error: AxiosError) => setErrorMsg(error.message));
        break;
      case "/albums":
        fetchService.search
          .album(inputRef.current)
          .then(({ data }) => setSearchData(data))
          .catch((error: AxiosError) => setErrorMsg(error.message));
        break;
    }
  }

  useEffect(() => {
    if (searchData) {
      navigate(`${navigateTo}`, { state: searchData });
    }
  }, [searchData, navigate, navigateTo]);

  return (
    <div>
      <input
        className="border border-black"
        type="text"
        placeholder="search"
        onChange={(e) => (inputRef.current = e.target.value)}
      />
      <button onClick={searchForInput}>{title}</button>
      {errorMsg && <h1>{errorMsg}</h1>}
    </div>
  );
};
