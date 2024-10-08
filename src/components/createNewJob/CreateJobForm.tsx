"use client";
import { useForm } from "react-hook-form";
import { createJobSchema, createJobSchemaType } from "@/lib/vaildation";
import { zodResolver } from "@hookform/resolvers/zod";

import { LogoFileInput } from "./LogoFileInput";
import { SalaryInput } from "./SalaryInput";
import { ApplicationSection } from "./ApplicationSection";
import { DescriptionInput } from "./DescriptionInput";
import { LocationSection } from "./LocationSection";

import { jobTypes } from "@/lib/Job-data";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Select from "../ui/select";
import { CategorySection } from "./CategorySection";
import { ExperienceSection } from "./ExperienceSection";
import { LoadingButton } from "../ui/loadingButton";
import { PostAJob } from "./actions";
import { useState } from "react";
import { ErrorDialog, ZodErrorsArray } from "../ui/ErrorDialog";

export function CreateJobForm() {
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [zodErrors, setZodErrors] = useState<ZodErrorsArray>([]);

  const form = useForm<createJobSchemaType>({
    resolver: zodResolver(createJobSchema),
  });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = form;

  const onSubmit = async (values: createJobSchemaType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return; // Skip null or undefined values
      }

      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else if (Array.isArray(value)) {
        formData.append(key, value.join(","));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    try {
      await PostAJob(formData);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        const parsedErrors = error as any; // Assuming issues are passed as an array of error objects
        setZodErrors(parsedErrors);
        setErrorDialogOpen(true);
      }
    }
  };
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 rounded-lg border p-4">
      <div>
        <h2 className="font-semibold">Job details</h2>
        <p className="text-muted-foreground">
          Provide a job description and details
        </p>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* title */}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Job Title</FormLabel>
                  <span className="text-xs text-muted-foreground">
                    {!field.value ? 100 : 100 - field.value.length} characters
                    left
                  </span>
                </div>
                <FormControl>
                  <Input
                    maxLength={100}
                    placeholder="e.g. Front-end Developer"
                    {...field}
                  />
                </FormControl>
                <div className="flex flex-wrap gap-2">
                  <FormMessage />
                  <FormDescription>
                    100 characters max. Please specify the title of the job.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {/* jobType */}
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <Select {...field} defaultValue="">
                    <option value="" hidden>
                      Select a job type
                    </option>
                    {jobTypes.map((job) => (
                      <option key={job} value={job}>
                        {job}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <div className="flex flex-wrap gap-2">
                  <FormMessage />
                  <FormDescription>
                    Please specify the type of the job.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {/* companyName */}
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Company Name</FormLabel>
                  <span className="text-xs text-muted-foreground">
                    {!field.value ? 50 : 50 - field.value.length} characters
                    left
                  </span>
                </div>
                <FormControl>
                  <Input maxLength={50} placeholder="e.g. Google" {...field} />
                </FormControl>
                <div className="flex flex-wrap gap-2">
                  <FormMessage />
                  <FormDescription>
                    Pleas specify the company name.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {/* companyLogo */}
          <LogoFileInput control={control} />
          {/* companyLogo */}
          <CategorySection control={control} />
          {/* companyLogo */}
          <ExperienceSection control={control} />
          {/* LocationType */}
          <LocationSection control={control} />
          {/* application */}
          <ApplicationSection control={control} />
          {/* description */}
          <DescriptionInput control={control} />
          {/* salary */}
          <SalaryInput control={control} />
          <div className="flex gap-2">
            <LoadingButton
              pending={isSubmitting}
              className="w-full"
              type="submit"
            >
              Post a Job
            </LoadingButton>
            <Button variant={"outline"} type="reset">
              Reset
            </Button>
          </div>
          {/* Error Dialog */}
          {/* <ErrorDialog
            errors={zodErrors}
            open={errorDialogOpen}
            onClose={() => setErrorDialogOpen(false)}
          /> */}
        </form>
      </Form>
    </div>
  );
}
