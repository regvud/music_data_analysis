import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AlbumByIdAnalyticsComponent } from "../components/analytics/AlbumByIdAnalyticsComponent";
import { Loader } from "../components/Loader";
import { fetchService } from "../services/fetchApi";

const fetchAlbum = (albumId: string | undefined) => {
  if (albumId) {
    return fetchService.albumById(+albumId);
  }
  throw new Error("Album ID is undefined");
};

export const AlbumPage = () => {
  const { albumId } = useParams();

  const { data, error, isPending } = useQuery({
    queryKey: [albumId],
    queryFn: () => fetchAlbum(albumId),
    enabled: albumId !== undefined,
  });

  if (isPending) {
    return <Loader />;
  }

  if (error) return <h1>{error?.message}</h1>;
  return (
    <div>
      <AlbumByIdAnalyticsComponent albumData={data?.data} />
    </div>
  );
};
