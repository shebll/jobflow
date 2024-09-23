import { Suspense } from "react";
import Loading from "@/components/jobFeed/JobLoading";
import prisma from "@/lib/prisma";
import { JobAdminDetail } from "./JobAdminDetail";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      slug: true,
    },
  });

  return jobs.map((job) => job.slug);
}
export default async function JobPage({ params: { slug } }: PageProps) {
  return (
    <div className="container mx-auto flex-1 px-2 py-8">
      <Suspense fallback={<Loading />}>
        <JobAdminDetail slug={slug} />
      </Suspense>
    </div>
  );
}
