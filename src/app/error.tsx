"use client";

import React from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold">Oops! Something Went Wrong</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        We encountered an error while trying to load this job posting. Please
        try again later.
      </p>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
