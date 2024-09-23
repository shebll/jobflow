import prisma from "@/lib/prisma";
import Link from "next/link";
import JobCard from "../jobFeed/JobCard";

async function AdminFeed() {
  const jobs = await prisma.job.findMany({
    where: { approved: false },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="shrink-0">
      <div className="flex w-full flex-col gap-2">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Link key={job.id} href={`/admin/jobs/${job.slug}`}>
              <JobCard job={job} />
            </Link>
          ))
        ) : (
          <NoJobsFoundCard />
        )}
      </div>
    </section>
  );
}

export default AdminFeed;

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
