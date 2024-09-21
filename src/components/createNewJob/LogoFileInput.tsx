"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UploadCloud, X } from "lucide-react";

import { Control, useFormContext } from "react-hook-form";
import Image from "next/image";
import { createJobSchemaType } from "@/lib/vaildation";

type LogoFileInputProps = {
  control: Control<createJobSchemaType>;
};

export function LogoFileInput({ control }: LogoFileInputProps) {
  const { watch, setValue, setError } = useFormContext();

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      let progressInterval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(progressInterval);
            setLoading(false);
            return 100;
          }
          return oldProgress + 10;
        });
      }, 100);
    }
  }, [loading]);
  return (
    <FormField
      control={control}
      name="companyLogo"
      render={({ field: { value, ...fieldValues } }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Company Logo</FormLabel>

            <span className="text-xs text-muted-foreground">{2} MB</span>
          </div>

          {loading ? (
            <div className="flex w-fit flex-col items-start rounded-lg border-2 border-dashed p-4">
              <div className="h-32 w-32 animate-pulse rounded-md bg-gray-200" />
              <div className="mt-2 h-2 w-32 rounded-full bg-gray-300">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : preview ? (
            <div className="flex w-fit flex-col items-start justify-center gap-2 rounded-lg border-2 border-dashed p-2">
              <div className="relative">
                <FormLabel className="cursor-pointer">
                  <Image
                    src={preview}
                    alt="Company Logo"
                    width={200}
                    height={200}
                    className="rounded-xl shadow-lg"
                  />
                </FormLabel>
                <button type="button" onClick={() => setPreview(null)}>
                  <X className="absolute -right-10 top-0 cursor-pointer rounded-full bg-destructive/60 p-1" />
                </button>
              </div>
            </div>
          ) : (
            <FormLabel className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-2">
              <UploadCloud className="h-32 w-32" />
              <div className="flex flex-col items-center">
                <p className="text-muted-foreground">Click to upload</p>
                <p className="text-muted-foreground">Drag and Drop File 🤏</p>
              </div>
            </FormLabel>
          )}
          <FormControl>
            <Input
              className="hidden"
              type="file"
              accept="image/*"
              max={2 * 1024 * 1024}
              {...fieldValues}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setLoading(true);
                  setProgress(0);
                  if (file.size > 2 * 1024 * 1024) {
                    setError("companyLogo", { message: "Max File 2MB" });
                    setPreview(null);
                    setLoading(false);
                    return;
                  } else {
                    const objectUrl = URL.createObjectURL(file);
                    setPreview(objectUrl);
                    setValue("companyLogo", file);
                  }
                }
              }}
            />
          </FormControl>
          <div className="flex flex-wrap gap-2">
            <FormMessage />
            <FormDescription>Select the company logo.</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
}
