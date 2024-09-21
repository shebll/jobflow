import { z } from "zod";
import { jobTypes, locationTypes } from "./Job-data";

// 1. requiredString
const requiredString = z.string().min(1, "Required");

// 2. salarySchema
const salarySchema = z.object({
  contractDuration: z.enum(["3 months", "6 months", "1 year", "Ongoing"]),
  currency: z.enum(["USD", "EGP", "EUR"]),
  salary: requiredString
    .regex(/^\d+$/, "Invalid salary format")
    .max(6, "Salary must be less than 6 digits")
    .min(4, "Salary must be greater than 4 digits"),
  negotiable: z.boolean().optional().default(false),
});

// 3. company logo file schema
const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (fileValue) =>
      !fileValue ||
      (fileValue instanceof File && fileValue.type.startsWith("image/")),
    "Invalid file type",
  )
  .refine(
    (fileValue) => !fileValue || fileValue.size <= 1024 * 1024 * 2,
    "Max file size is 2MB",
  )
  .transform((fileValue) => {
    return fileValue ? fileValue : undefined;
  });

// 4. application contact schema
const applicationSchema = z
  .object({
    application: z.string().optional(),
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "At least one contact method is required",
    path: ["application"], // Adjust this path as necessary
  });

// 4.location section schema
const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      {
        message: "Invalid Location type",
      },
    ),
    location: z.string().max(100).optional(),
    timezonePreference: z.string().optional(),
  })
  .refine(
    (data) =>
      data.location || data.locationType === "Remote" || !data.locationType,
    {
      message: "Location is Required in On-site jobs and Hybrid jobs",
      path: ["location"],
    },
  )
  .refine(
    (data) =>
      data.locationType === "Remote" ? !!data.timezonePreference : true,
    {
      message: "Timezone is required for remote jobs",
      path: ["timezonePreference"],
    },
  );

// . Category section
const categorySchema = z.object({
  category: z.enum(["Tech", "Marketing", "Design", "Management"]),
  subcategory: z
    .array(z.string())
    .min(1, "At least one subcategory is required"),
});

// 6. experience level and skills
const experienceSchema = z.object({
  experienceLevel: z.enum(["FreshGrad", "Junior", "Mid-Level", "Senior"]),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
});

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    description: z.string().max(5000).optional(),
    companyName: requiredString.max(50),
    companyLogo: companyLogoSchema.optional(),
    type: requiredString.refine((value) => jobTypes.includes(value), {
      message: "Invalid job type",
    }),
  })
  .and(categorySchema)
  .and(experienceSchema)
  .and(applicationSchema)
  .and(locationSchema)
  .and(salarySchema);

export type createJobSchemaType = z.infer<typeof createJobSchema>;

///////////////////////////////////////////
export const filterSchema = z.object({
  q: z.string().optional(),
  jobType: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});
export type filterSchemaType = z.infer<typeof filterSchema>;
