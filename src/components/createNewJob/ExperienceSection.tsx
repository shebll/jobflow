import { createJobSchemaType } from "@/lib/vaildation";
import React, { useState } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Select from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const skillsByExperience = {
  FreshGrad: ["Basic Programming", "Communication", "Problem Solving"],
  Junior: ["JavaScript", "React", "Content Writing"],
  "Mid-Level": ["Node.js", "SEO", "UI Design"],
  Senior: ["Leadership", "System Architecture", "Team Management"],
};

export function ExperienceSection({
  control,
}: {
  control: Control<createJobSchemaType>;
}) {
  type SkillLevelType = keyof typeof skillsByExperience | "";
  const [selectedExperienceLevel, setSelectedExperienceLevel] =
    useState<SkillLevelType>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill],
    );
  };

  const {
    watch,
    setValue,
    trigger,
    setFocus,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormField
        name="experienceLevel"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Experience Level</FormLabel>
            <FormControl>
              <Select
                {...field}
                defaultValue=""
                onChange={(e) => {
                  setSelectedExperienceLevel(
                    e.currentTarget.value as SkillLevelType,
                  );
                  field.onChange(e);
                  setFocus("skills");
                }}
              >
                <option value="" hidden>
                  Select an Experience Level
                </option>
                {Object.keys(skillsByExperience).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Select>
            </FormControl>
            <div className="flex flex-wrap gap-2">
              <FormMessage />
              <FormDescription>
                Please specify the Experience Level of the job
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {selectedExperienceLevel && (
        <FormField
          name="skills"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <div className="space-y-1">
                  {skillsByExperience[selectedExperienceLevel].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => {
                          trigger("skills");
                          handleSkillChange(skill);
                          field.onChange(
                            selectedSkills.includes(skill)
                              ? selectedSkills.filter((s) => s !== skill)
                              : [...selectedSkills, skill],
                          );
                        }}
                      />
                      <label htmlFor={skill}>{skill}</label>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription>Select at least one skill</FormDescription>
            </FormItem>
          )}
        />
      )}
    </>
  );
}
