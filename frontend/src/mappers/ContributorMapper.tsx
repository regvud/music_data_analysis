import { ContributorType } from "../types/content";

interface ContributorMapperProps {
  contributors: ContributorType[];
}
export const ContributorMapper = ({ contributors }: ContributorMapperProps) => {
  return (
    <>
      {contributors.map((contributor) => (
        <div key={contributor.id}>
          <img src={contributor?.picture_small} alt="contributorImage" />
          <h1>Name: {contributor?.name}</h1>
          <h1>Role: {contributor?.role}</h1>
        </div>
      ))}
    </>
  );
};
