import { redirect } from "next/navigation";

import { filterSchema, filterSchemaType } from "@/lib/vaildation";
import { jobTypes } from "@/lib/Job-data";
import prisma from "@/lib/prisma";

import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import Select from "../../ui/select";
import SubmitFilterButton from "./SubmitFilterButton";

const filterJobs = async (formData: FormData) => {
  "use server";
  const values = Object.fromEntries(formData.entries());

  const parsFormData = filterSchema.parse(values);

  const { q, jobType, location, remote } = parsFormData;

  const url = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(jobType && { jobType }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${url.toString()}`);
};

async function FilterForm({
  filterValues: { q, location, remote, jobType },
}: {
  filterValues: filterSchemaType;
}) {
  const Location = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((data) =>
      data.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <form
      action={filterJobs}
      key={JSON.stringify({ q, location, remote, jobType })}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="q">Search</Label>
          <Input
            id="q"
            name="q"
            placeholder="Job title, keywords, or company"
            defaultValue={q || ""}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="jobType">Job Type</Label>
          <Select
            placeholder="Select Job Type"
            id="jobType"
            name="jobType"
            defaultValue={jobType || ""}
          >
            <option value="">All Job Types </option>
            {jobTypes.map((jobType) => (
              <option key={jobType} value={jobType}>
                {jobType}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <Select
            placeholder="Select Location"
            id="location"
            name="location"
            defaultValue={location || ""}
          >
            <option value="">Anywhere</option>
            {Location.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remote"
            name="remote"
            className="scale-125 accent-black"
            defaultChecked={remote || false}
          />
          <Label htmlFor="remote">Remote Jobs</Label>
        </div>
        <div className="flex gap-2">
          <SubmitFilterButton type="submit" className="w-full grow">
            Filter Jobs
          </SubmitFilterButton>
          <Button variant={"outline"} type="reset">
            Reset Filter
          </Button>
        </div>
      </div>
    </form>
  );
}

export default FilterForm;
