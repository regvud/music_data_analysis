import { useNavigate } from "react-router-dom";
import { ContributorType } from "../types/content";

interface ContributorMapperProps {
  contributors: ContributorType[];
}

export const ContributorMapper = ({ contributors }: ContributorMapperProps) => {
  const navigate = useNavigate();

  function goToArtist(artistId: number, artistName: string) {
    navigate(`/artist/${artistId}`, { state: { artistName: artistName } });
  }

  return (
    <div className="flex flex-row">
      {contributors.map((contributor) => (
        <div
          key={contributor.id}
          className="flex flex-col items-center text-center bg-white rounded-lg p-4 w-[40%]"
        >
          <img
            onClick={() => goToArtist(contributor.id, contributor.name)}
            src={contributor?.picture_big}
            alt="contributorImage"
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />
          <h1 className="text-lg font-semibold">{contributor?.name}</h1>
          <h2 className="text-sm text-gray-500">{contributor?.role}</h2>
        </div>
      ))}
    </div>
  );
};
