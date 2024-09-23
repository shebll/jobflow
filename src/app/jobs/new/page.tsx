import React from "react";
import type { Metadata } from "next";
import { CreateJobForm } from "@/components/createNewJob/CreateJobForm";

export const metadata: Metadata = {
  title: "Create a New Job",
  description: "",
};
function page() {
  return (
    <main className="flex flex-col gap-10 px-2 py-20 ">
      <section className="text-center">
        <h1 className="text-4xl font-bold">
          Find Your Best Developers - (Create a New Job)
        </h1>
        <p className="text-sm text-gray-500">
          Get your job posting seen by thousands of job seekers.
        </p>
      </section>
      <CreateJobForm />
    </main>
  );
}

export default page;
