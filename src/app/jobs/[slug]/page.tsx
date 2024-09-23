import { Metadata } from "next";
import { JobDetail } from "@/components/jobFeed/JobDetail";
import { Suspense } from "react";
import Loading from "@/components/jobFeed/JobLoading";
import { getJob } from "@/lib/getJob";
import prisma from "@/lib/prisma";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const job = await getJob(params.slug);

  if (!job) {
    return {
      title: "Job Not Found",
      description: "The requested job posting could not be found.",
    };
  }

  return {
    title: `${job.title} at ${job.companyName} | Job Posting`,
    description: `${job.type} ${job.category} job opportunity: ${job.title} at ${job.companyName}. ${job.description?.slice(0, 150)}...`,
    openGraph: {
      title: `${job.title} at ${job.companyName}`,
      description: `${job.type} ${job.category} job opportunity. Apply now!`,
      type: "website",
    },
  };
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
        <JobDetail slug={slug} />
      </Suspense>
    </div>
  );
}
