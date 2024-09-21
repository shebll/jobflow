import React, { useRef, useState } from "react";
import { Control, useFormContext } from "react-hook-form";
import { createJobSchemaType } from "@/lib/vaildation";
import { locationTypes } from "@/lib/Job-data";
import { X } from "lucide-react";
import LocationInput from "./LocationInput";
import { timezones } from "@/lib/timezones";
import Select from "../ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function LocationSection({
  control,
}: {
  control: Control<createJobSchemaType>;
}) {
  const { watch, setValue, trigger, setFocus } = useFormContext();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <FormField
        name="locationType"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location Type</FormLabel>
            <FormControl>
              <Select
                {...field}
                defaultValue=""
                onChange={(e) => {
                  field.onChange(e);
                  trigger(["location", "timezonePreference"]);
                  if (e.currentTarget.value === "Remote") {
                    setTimeout(() => inputRef.current?.focus(), 0);
                  } else {
                    setFocus("location");
                  }
                }}
              >
                <option value="" hidden>
                  Select a location type
                </option>
                {locationTypes.map((Location) => (
                  <option key={Location} value={Location}>
                    {Location}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormMessage />
            <FormDescription>Please specify the location type.</FormDescription>
          </FormItem>
        )}
      />

      {/* {watch("locationType") !== "Remote" && ( */}
      <FormField
        name="location"
        control={control}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Office Location</FormLabel>
              <span className="text-xs text-muted-foreground">
                {!field.value ? 100 : 100 - field.value.length} characters left
              </span>
            </div>
            <FormControl>
              <LocationInput
                ref={field.ref}
                onLocationSelected={(e) => {
                  field.onChange(e);
                  trigger("location");
                }}
              />
            </FormControl>
            {watch("location") && (
              <div className="flex w-fit items-center gap-1 rounded-md border bg-muted px-4 py-2 text-sm text-muted-foreground">
                {watch("location")}
                <button
                  type="button"
                  onClick={() =>
                    setValue("location", "", {
                      shouldValidate: true,
                    })
                  }
                >
                  <X
                    size={14}
                    className="ml-2 cursor-pointer text-destructive"
                  />
                </button>
              </div>
            )}
            <FormMessage />
            <FormDescription>
              Please specify the office location.
            </FormDescription>
          </FormItem>
        )}
      />
      {/* )} */}

      {/* {watch("locationType") === "Remote" && ( */}
      <FormField
        control={control}
        name="timezonePreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Timezone</FormLabel>
            <FormControl>
              <Command className="rounded-md border">
                <CommandInput
                  ref={inputRef}
                  placeholder="Search timezone..."
                  value={field.value}
                  onValueChange={field.onChange}
                  onFocus={() => setOpen(true)}
                  onBlur={() => setOpen(false)}
                />
                <CommandList className={open ? "" : "hidden"}>
                  <CommandEmpty>No timezone found.</CommandEmpty>
                  <CommandGroup>
                    {timezones.map((tz) => (
                      <CommandItem
                        key={tz.value}
                        value={tz.label}
                        onMouseDown={(e) => {
                          field.onChange(e.currentTarget.textContent);
                          setOpen(false);
                          trigger("timezonePreference");
                        }}
                      >
                        {tz.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* )} */}
    </>
  );
}
