import { filterSchemaType } from "@/lib/vaildation";
import prisma from "../../lib/prisma";
import JobCard from "./JobCard";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";
async function JobList({
  filterValues,
  page = 1,
}: {
  filterValues: filterSchemaType;
  page?: number;
}) {
  const { q, location, remote, jobType } = filterValues;

  const pageSize = 6;
  const skip = (page - 1) * pageSize;

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

  const jobsPromise = prisma.job.findMany({
    where: searchFilter,
    orderBy: { createdAt: "desc" },
    take: pageSize,
    skip,
  });

  const jobsCountPromise = prisma.job.count({ where: searchFilter });

  const [jobs, jobsCount] = await Promise.all([jobsPromise, jobsCountPromise]);
  return (
    <section className="shrink-0">
      <div className="flex w-full flex-col gap-2">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.slug}`}>
              <JobCard job={job} />
            </Link>
          ))
        ) : (
          <NoJobsFoundCard />
        )}
      </div>
      {Math.ceil(jobsCount / pageSize) > 1 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(jobsCount / pageSize)}
          searchFilter={filterValues}
        />
      )}
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

function Pagination({
  currentPage,
  totalPages,
  searchFilter: { q, location, remote, jobType },
}: {
  currentPage: number;
  totalPages: number;
  searchFilter: filterSchemaType;
}) {
  const generateUrl = (page: number) => {
    const url = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(jobType && { jobType }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      ...(page !== 1 && { page: page.toString() }),
    });

    return `/?${url.toString()}`;
  };

  return (
    <div className="flex items-center justify-between">
      <Link
        className={cn(
          "flex items-center",
          currentPage === 1 &&
            "pointer-events-none cursor-not-allowed text-muted-foreground",
        )}
        href={generateUrl(currentPage - 1)}
      >
        <ArrowLeft size={16} /> <p>Prevues Page</p>
      </Link>
      <Link
        className={cn(
          "flex items-center",
          totalPages <= currentPage &&
            "pointer-events-none cursor-not-allowed text-muted-foreground",
        )}
        href={generateUrl(currentPage + 1)}
      >
        Next Page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
