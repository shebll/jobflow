import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircleIcon } from "lucide-react";
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
      <Alert className="mx-auto mb-6 max-w-3xl bg-green-100/40">
        <CheckCircleIcon className="h-4 w-4" />
        <AlertTitle className="text-2xl">Job Successfully Submitted</AlertTitle>
        <AlertDescription>
          Your job posting has been received and is pending admin approval.
          We&apos;ll notify you once it&apos;s live.
        </AlertDescription>
      </Alert>
      <Suspense fallback={<Loading />}>
        <JobDetail slug={slug} />
      </Suspense>
    </div>
  );
}
