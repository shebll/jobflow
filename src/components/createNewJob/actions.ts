"use server";

import { titleToSlug } from "@/lib/utils";
import { createJobSchema, createJobSchemaType } from "@/lib/vaildation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const parseFormData = async (formData: FormData) => {
  const entries = Array.from(formData.entries());
  const parsedValues: Record<string, any> = {};

  entries.forEach(([key, value]) => {
    if (value instanceof File) {
      parsedValues[key] = value;
    } else if (value === "true" || value === "false") {
      parsedValues[key] = value === "true";
    } else if (["skills", "subcategory"].includes(key)) {
      parsedValues[key] = value.split(",");
    } else {
      parsedValues[key] = value;
    }
  });

  return parsedValues;
};

export const PostAJob = async (formData: FormData) => {
  const parsedValues = await parseFormData(formData);

  const {
    salary,
    title,
    location,
    description,
    applicationEmail,
    applicationUrl,
    negotiable,
    timezonePreference,
    locationType,
    type,
    experienceLevel,
    skills,
    category,
    subcategory,
    contractDuration,
    currency,
    companyLogo,
    companyName,
  } = createJobSchema.parse(parsedValues);

  const slug = `${titleToSlug(title)}-${nanoid(10)}`;

  let companyUrl = "";
  if (companyLogo) {
    await put(
      // foldername/ filename.path.extname
      `companies_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    ).then(({ url }) => {
      companyUrl = url;
    });
  }
  const job = await prisma.job.create({
    data: {
      title: title.trim(),
      description: description?.trim(),
      companyName: companyName.trim(),
      companyLogoUrl: companyUrl,
      type,
      location,
      locationType,
      experienceLevel,
      skills,
      category,
      subcategories: subcategory,
      contractDuration,
      currency,
      salary: +salary,
      negotiable,
      timezonePreference,
      applicationEmail,
      applicationUrl,
      approved: false,
      slug,
    },
  });

  redirect(`/jobs-submitted/${slug}`);
};

/* 
import { put } from "@vercel/blob";

const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' }); */
