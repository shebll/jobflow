import React from "react";
import { Control, useFormContext } from "react-hook-form";
import { createJobSchemaType } from "@/lib/vaildation";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function ApplicationSection({
  control,
}: {
  control: Control<createJobSchemaType>;
}) {
  const {
    formState: { errors },
    trigger,
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <Label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="application"
      >
        How To Apply
      </Label>
      <div className="flex items-start gap-2">
        <FormField
          control={control}
          name="applicationEmail"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  id="application"
                  type="email"
                  maxLength={50}
                  placeholder="email@example.ai"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger([
                      "applicationEmail",
                      "applicationUrl",
                      "application",
                    ]);
                  }}
                />
              </FormControl>
              <div className="flex justify-between">
                <FormMessage className="w-full" />
                <p className="w-full text-end text-xs text-muted-foreground">
                  {!field.value ? 50 : 50 - field.value.length} characters left
                </p>
              </div>
            </FormItem>
          )}
        />
        <span className="h-fit text-sm font-semibold text-muted-foreground">
          OR
        </span>
        <FormField
          control={control}
          name="applicationUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="url"
                  maxLength={50}
                  placeholder="Website"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger([
                      "applicationEmail",
                      "applicationUrl",
                      "application",
                    ]);
                  }}
                />
              </FormControl>
              <div className="flex justify-between">
                <FormMessage className="w-full" />
                <p className="w-full text-end text-xs text-muted-foreground">
                  {!field.value ? 50 : 50 - field.value.length} characters left
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-between">
        {errors.application && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.application.message?.toString()}
          </p>
        )}
        <FormDescription>
          Pleas specify the application contact email or url.
        </FormDescription>
      </div>
    </div>
  );
}
