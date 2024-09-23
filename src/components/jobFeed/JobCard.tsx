import { Job } from "@prisma/client";
import Image from "next/image";
import CompanyLogoPlaceHolder from "../../public/images/company-logo-placeholder.png";
import Badge from "../shared/Badge";
import { Banknote, House, LocateIcon, MapPin } from "lucide-react";
import { formatCurrency, timeAgo } from "@/lib/utils";

function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex w-full flex-col gap-3 rounded-lg border p-6 shadow-sm transition-all hover:bg-muted md:flex-row">
      <div className="">
        <Image
          src={job.companyLogoUrl || CompanyLogoPlaceHolder}
          alt={`${job.companyName} Logo Image`}
          width={100}
          height={100}
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between gap-10 md:flex-row">
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">{job.title}</h1>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <House size={15} className="shrink-0" />

              {job.companyName}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={15} className="shrink-0" />
              {job.locationType}
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <LocateIcon size={15} className="shrink-0" />
              {job.location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <Banknote size={15} className="shrink-0" />
              {formatCurrency(job.salary)}
            </p>
          </div>
        </div>
        <div className="flex w-fit flex-col justify-between gap-1">
          <Badge
            content={job.type}
            color={"bg-green-200/50 border border-green-200 "}
          />
          <Badge
            content={timeAgo(job.createdAt)}
            color={"bg-gray-200/50 border border-gray-200 "}
          />
        </div>
      </div>
    </article>
  );
}

export default JobCard;
