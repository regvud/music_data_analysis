import { createBrowserRouter } from "react-router-dom";
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
    ],
  },
]);
