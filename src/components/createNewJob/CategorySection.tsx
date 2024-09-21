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

const subcategoriesByCategory = {
  Tech: ["Frontend", "Backend", "DevOps"],
  Marketing: ["SEO", "Content Marketing", "Social Media"],
  Design: ["UI/UX", "Graphic Design", "Motion Graphics"],
  Management: ["Project Management", "Product Management", "HR"],
};

const skillsByExperience = {
  FreshGrad: ["Basic Programming", "Communication", "Problem Solving"],
  Junior: ["JavaScript", "React", "Content Writing"],
  "Mid-Level": ["Node.js", "SEO", "UI Design"],
  Senior: ["Leadership", "System Architecture", "Team Management"],
};

const category = ["Tech", "Marketing", "Design", "Management"];
const experienceLevel = ["FreshGrad", "Junior", "Mid-Level", "Senior"];

export function CategorySection({
  control,
}: {
  control: Control<createJobSchemaType>;
}) {
  type CategoryType = keyof typeof subcategoriesByCategory | "";
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    [],
  );

  const handleSubcategoryChange = (subcategory: string) => {
    trigger("subcategory");
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory],
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
        name="category"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select
                {...field}
                defaultValue=""
                onChange={(e) => {
                  setSelectedCategory(e.currentTarget.value as CategoryType);
                  field.onChange(e);
                  setFocus("subcategory");
                  // trigger("experience");
                  // // setValue("subcategory", "");
                  // // setValue("experience", "");
                }}
              >
                <option
                  className="appearance-none hover:bg-muted-foreground"
                  value=""
                  hidden
                >
                  Select a Category
                </option>
                {Object.keys(subcategoriesByCategory).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </FormControl>
            <div className="flex flex-wrap gap-2">
              <FormMessage />
              <FormDescription>
                Please specify the Category of the job
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      {selectedCategory !== "" && (
        <FormField
          name="subcategory"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategories</FormLabel>
              <FormControl>
                <div className="space-y-1">
                  {subcategoriesByCategory[selectedCategory].map(
                    (subcategory) => (
                      <div
                        key={subcategory}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={subcategory}
                          checked={selectedSubcategories.includes(subcategory)}
                          onCheckedChange={() => {
                            handleSubcategoryChange(subcategory);

                            field.onChange(
                              selectedSubcategories.includes(subcategory)
                                ? selectedSubcategories.filter(
                                    (sub) => sub !== subcategory,
                                  )
                                : [...selectedSubcategories, subcategory],
                            );
                          }}
                        />
                        <label htmlFor={subcategory}>{subcategory}</label>
                      </div>
                    ),
                  )}
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription>Select at least one subcategory</FormDescription>
            </FormItem>
          )}
        />
      )}
    </>
  );
}
