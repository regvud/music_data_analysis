import { createBrowserRouter } from "react-router-dom";
import { AlbumPage } from "../pages/AlbumPage";
import { ArtistPage } from "../pages/ArtistPage";
import { ArtistResultsPage } from "../pages/ArtistResultsPage";
import { Layout } from "../pages/Layout";
import { MainPage } from "../pages/MainPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/search",
        element: <SearchResultsPage />,
      },
      {
        path: "/album",
        element: <AlbumPage />,
      },
      {
        path: "/artist",
        element: <ArtistResultsPage />,
      },
      {
        path: "/artist/:artistId",
        element: <ArtistPage />,
      },
    ],
  },
]);
