import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold">Not Found</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Please check the
        URL and try again.
      </p>
      <Button asChild>
        <Link href="/">Browse All Jobs</Link>
      </Button>
    </div>
  );
}
