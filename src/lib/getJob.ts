import { notFound } from "next/navigation";
import { cache } from "react";
import prisma from "@/lib/prisma";

export const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({ where: { slug } });
  if (!job) notFound();

  return job;
});
