import Feed from "@/components/jobFeed/Feed";
import { generateTitle } from "@/lib/generateTitle";
import { filterSchemaType } from "@/lib/vaildation";
import { Metadata } from "next";

interface props {
  searchParams: {
    q?: string;
    jobType?: string;
    location?: string;
    remote?: string;
  };
}

export const generateMetadata = ({ searchParams }: props): Metadata => {
  const filterValues: filterSchemaType = {
    q: searchParams.q,
    jobType: searchParams.jobType,
    location: searchParams.location,
    remote: searchParams.remote === "true",
  };
  return {
    title: `${generateTitle(filterValues)} | JobFlow`,
    description: `Discover ${generateTitle(filterValues)} . Browse through thousands of job opportunities, filter by location, skills, and more.`,
  };
};
export default function Home({ searchParams }: props) {
  const filterValues: filterSchemaType = {
    q: searchParams.q,
    jobType: searchParams.jobType,
    location: searchParams.location,
    remote: searchParams.remote === "true",
  };
  return (
    <main className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-start gap-10 p-4 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Discover {generateTitle(filterValues)}
        </h1>
        <p className="text-sm text-gray-500">
          Browse through thousands of job opportunities, filter by location,
          skills, and more.
        </p>
      </div>
      <Feed filterValues={filterValues} />
    </main>
  );
}
