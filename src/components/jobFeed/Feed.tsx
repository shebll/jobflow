import JobList from "./JobList";
import Filter from "./filter/Filter";
import { filterSchemaType } from "@/lib/vaildation";
import { Suspense } from "react";
import { generateTitle } from "@/lib/generateTitle";

function Feed({ filterValues }: { filterValues: filterSchemaType }) {
  return (
    <section className="flex w-full flex-col gap-4 lg:flex-row">
      <Filter filterValues={filterValues} />
      <Suspense fallback={<LoadingFeedUi />}>
        <JobList filterValues={filterValues} />
      </Suspense>
    </section>
  );
}

export default Feed;

export const LoadingFeedUi = () => {
  const skeletons = [
    {
      titleWidth: "w-48",
      companyWidth: "w-32",
      locationWidth: "w-36",
      salaryWidth: "w-24",
    },
    {
      titleWidth: "w-56",
      companyWidth: "w-40",
      locationWidth: "w-32",
      salaryWidth: "w-28",
    },
    {
      titleWidth: "w-44",
      companyWidth: "w-28",
      locationWidth: "w-40",
      salaryWidth: "w-24",
    },
    {
      titleWidth: "w-60",
      companyWidth: "w-36",
      locationWidth: "w-44",
      salaryWidth: "w-32",
    },
    {
      titleWidth: "w-50",
      companyWidth: "w-30",
      locationWidth: "w-38",
      salaryWidth: "w-26",
    },
    {
      titleWidth: "w-52",
      companyWidth: "w-34",
      locationWidth: "w-42",
      salaryWidth: "w-30",
    },
    {
      titleWidth: "w-48",
      companyWidth: "w-32",
      locationWidth: "w-38",
      salaryWidth: "w-28",
    },
    {
      titleWidth: "w-56",
      companyWidth: "w-36",
      locationWidth: "w-44",
      salaryWidth: "w-30",
    },
  ];

  return (
    <div className="space-y-2">
      {skeletons.map((skeleton, index) => (
        <article
          key={index}
          className="flex w-[680px] animate-pulse flex-col gap-3 rounded-lg border p-6 shadow-sm md:flex-row"
        >
          {/* Company Logo Skeleton */}
          <div className="h-[100px] w-[100px] rounded-md bg-muted"></div>

          {/* Main Content Skeleton */}
          <div className="flex flex-grow flex-col justify-between gap-10 md:flex-row">
            {/* Job Info Skeleton */}
            <div className="flex flex-col items-start justify-start gap-4">
              <div className="flex flex-col gap-1">
                {/* Title Skeleton */}
                <div
                  className={`h-6 bg-muted ${skeleton.titleWidth} rounded-md`}
                ></div>
                {/* Company Name Skeleton */}
                <div
                  className={`h-4 bg-muted ${skeleton.companyWidth} rounded-md`}
                ></div>
              </div>

              <div className="flex flex-col gap-1">
                {/* Location Type Skeleton */}
                <div className="h-4 w-28 rounded-md bg-muted"></div>
                {/* Location Skeleton */}
                <div
                  className={`h-4 bg-muted ${skeleton.locationWidth} rounded-md`}
                ></div>
                {/* Salary Skeleton */}
                <div
                  className={`h-4 bg-muted ${skeleton.salaryWidth} rounded-md`}
                ></div>
              </div>
            </div>

            {/* Badges Skeleton */}
            <div className="flex w-fit flex-col justify-between gap-1">
              {/* Job Type Badge Skeleton */}
              <div className="h-6 w-20 rounded-md bg-muted"></div>
              {/* Time Ago Badge Skeleton */}
              <div className="h-6 w-24 rounded-md bg-muted"></div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
