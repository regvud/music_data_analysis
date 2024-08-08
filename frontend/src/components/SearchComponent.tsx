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
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-2 w-full max-w-md">
        <input
          className="flex-1 p-2 border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search..."
          onChange={(e) => (inputRef.current = e.target.value)}
        />
        <button
          onClick={searchForInput}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {title}
        </button>
      </div>
      {errorMsg && (
        <h1 className="text-red-500 text-lg font-semibold">{errorMsg}</h1>
      )}
    </div>
  );
};
