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
import RichTextEditor from "./RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";

export function DescriptionInput({
  control,
}: {
  control: Control<createJobSchemaType>;
}) {
  const { setFocus } = useFormContext();

  return (
    <FormField
      name="description"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel onClick={() => setFocus("description")}>
            Job Description
          </FormLabel>

          <FormControl>
            <RichTextEditor
              onChange={(draft) => field.onChange(draftToMarkdown(draft))}
              ref={field.ref}
            />
          </FormControl>
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2">
              <FormMessage />
              <FormDescription>
                Pleas specify the job description.
              </FormDescription>
            </div>
            <p className="text-end text-xs text-muted-foreground">
              {!field.value ? 5000 : 5000 - field.value.length} characters left
            </p>
          </div>
        </FormItem>
      )}
    />
  );
}
