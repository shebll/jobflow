import { filterSchemaType } from "@/lib/vaildation";
import prisma from "../../lib/prisma";
import JobCard from "./JobCard";
import { Prisma } from "@prisma/client";
async function JobList({
  filterValues: { q, location, remote, jobType },
}: {
  filterValues: filterSchemaType;
}) {
  const searchQuery = q
    ?.split(" ")
    .filter((query) => query.length > 0)
    .join(" ");

  const searchFilter: Prisma.JobWhereInput = {
    AND: [
      {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
          { companyName: { contains: searchQuery, mode: "insensitive" } },
          { type: { contains: searchQuery, mode: "insensitive" } },
          { location: { contains: searchQuery, mode: "insensitive" } },
          { locationType: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
      {
        location: location
          ? { contains: location, mode: "insensitive" }
          : undefined,
      },
      {
        locationType: remote === true ? "Remote" : undefined,
      },
      {
        type: jobType ? { equals: jobType, mode: "insensitive" } : undefined,
      },
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where: searchFilter,
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="shrink-0">
      <div className="flex w-full flex-col gap-2">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <NoJobsFoundCard />
        )}
      </div>
    </section>
  );
}

export default JobList;

function NoJobsFoundCard() {
  return (
    <article className="flex w-full flex-col items-center justify-center gap-3 rounded-lg border p-6 shadow-sm transition-all hover:bg-muted md:flex-row">
      <div className="text-6xl">😔</div>

      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-center text-xl font-semibold md:text-left">
          Oops! No matching jobs found.
        </h1>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          Try adjusting your search or check back later for new opportunities.
        </p>
      </div>
    </article>
  );
}
