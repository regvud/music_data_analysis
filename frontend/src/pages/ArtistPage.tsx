import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { ArtistAlbumsAnalyticsComponent } from "../components/analytics/ArtistAlbumsAnalyticsComponent";
import { fetchService } from "../services/fetchApi";

const fetchArtistAlbums = (artistId: string | undefined) => {
  if (artistId) {
    return fetchService.artistAlbums(+artistId);
  }
  throw new Error("Artist ID is undefined");
};

export const ArtistPage = () => {
  const { artistId } = useParams();
  const { state } = useLocation();

  const { data, error, isPending } = useQuery({
    queryKey: [artistId],
    queryFn: () => fetchArtistAlbums(artistId),
    enabled: artistId !== undefined,
  });

  const analytics = data?.data?.analytics;

  if (isPending) return <h1>Loading..</h1>;
  if (error) return <h1>{error?.message}</h1>;
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-200 dark:text-gray-100 bg-gray-900 shadow-lg p-4">
        {state?.artistName ? state?.artistName : ""}
      </h1>
      <ArtistAlbumsAnalyticsComponent analytics={analytics} />
    </>
  );
};
