import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
  Link as LinkIcon,
  LocateIcon,
  Mail,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/getJob";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export const JobDetail = async ({ slug }: { slug: string }) => {
  const job = await getJob(slug);

  if (!job) {
    return notFound();
  }
  return (
    <Card className="mx-auto w-full max-w-3xl space-y-4">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-start space-x-4">
          {job.companyLogoUrl && (
            <Image
              width={200}
              height={200}
              className="rounded-xl"
              src={job.companyLogoUrl}
              alt={`${job.companyName} logo`}
            />
          )}
          <div className="flex flex-col gap-2">
            <div>
              <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{job.companyName}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <span>{job.locationType}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                <span>{job.experienceLevel}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LocateIcon className="h-4 w-4 text-muted-foreground" />
                <span>{job.location || "WorldWide"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Badge variant="secondary">{job.type}</Badge>
          <Badge className="text-center">{job.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="mb-4 flex flex-col gap-1">
          {job.timezonePreference && (
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span>{job.timezonePreference}</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>{job.contractDuration}</span>
          </div>
          {job.applicationUrl && (
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <Link
                className="text-blue-600 underline"
                href={job.applicationUrl}
                target="blank"
              >
                {job.applicationUrl}
              </Link>
            </div>
          )}
          {job.applicationEmail && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Link href={`mailto:${job.applicationEmail}`} target="blank">
                {job.applicationEmail}
              </Link>
            </div>
          )}
        </div>
        <div className="mb-4">
          <h3 className="mb-2 font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="mb-2 font-semibold">Subcategories</h3>
          <div className="flex flex-wrap gap-2">
            {job.subcategories.map((cat) => (
              <Badge key={cat} variant="outline">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
        {job.description && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Description</h3>
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-4 text-sm leading-relaxed text-foreground/80">
                    {children}
                  </p>
                ),
                h1: ({ children }) => (
                  <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="mb-4 scroll-m-20 text-xl font-semibold tracking-tight">
                    {children}
                  </h4>
                ),
                ul: ({ children }) => (
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-sm leading-relaxed text-foreground/80">
                    {children}
                  </li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="mt-6 border-l-2 pl-6 italic text-foreground/80">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="my-4 border-border" />,
                code: ({ children }) => (
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4">
                    {children}
                  </pre>
                ),
              }}
              className="prose dark:prose-invert max-w-none text-foreground"
            >
              {job.description}
            </ReactMarkdown>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">
              {formatCurrency(job.salary)} {job.currency}
              {job.negotiable && " (Negotiable)"}
            </span>
          </div>
        </div>
        <hr />
        <Button className="w-full" asChild>
          <Link
            href={`${job.applicationEmail ? `mailto:${job.applicationEmail}` : job.applicationUrl}`}
          >
            Apply Now
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
