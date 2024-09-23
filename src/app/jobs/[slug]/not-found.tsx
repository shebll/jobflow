import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold">Job Not Found</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        We couldn&apos;t find the job posting you&apos;re looking for. It may
        have been removed or doesn&apos;t exist.
      </p>
      <Button asChild>
        <Link href="/">Browse All Jobs</Link>
      </Button>
    </div>
  );
}
