import { Loader } from "lucide-react";
import React from "react";

export default function JobLoadingSkeleton() {
  return (
    <div className="h-screen w-screen">
      <Loader size={50} className="mx-auto mt-10 h-10 w-10 animate-spin" />
    </div>
  );
}
