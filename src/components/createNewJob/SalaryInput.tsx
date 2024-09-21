import { createJobSchemaType } from "@/lib/vaildation";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../ui/form";
import { Input } from "../ui/input";
import Select from "../ui/select";
import { Switch } from "../ui/switch"; // For negotiable switch
import { Control, useFormContext } from "react-hook-form";

const currencies = ["USD", "EGP", "EUR"];
const contractDurations = ["3 months", "6 months", "1 year", "Ongoing"];

interface SalaryInputProps {
  control: Control<createJobSchemaType>;
}

export const SalaryInput: React.FC<SalaryInputProps> = ({ control }) => {
  const { watch, setValue } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Currency</FormLabel>
            <FormControl>
              <Select {...field} defaultValue="">
                <option value="" hidden>
                  Select a Currency
                </option>
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-2">
        <FormField
          control={control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Salary Amount</FormLabel>
                <span className="text-xs text-muted-foreground">
                  {!field.value ? 6 : 6 - field.value.length} digits left
                </span>
              </div>
              <FormControl>
                <Input type="number" placeholder="e.g. 5000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiable"
          render={({ field }) => (
            <FormItem>
              <div className="ml-2 flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      setValue("negotiable", checked)
                    }
                  />
                </FormControl>
                <FormLabel>Is the salary negotiable?</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="contractDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contract Duration</FormLabel>
            <FormControl>
              <Select {...field} defaultValue="">
                <option value="" hidden>
                  Select a Duration
                </option>
                {contractDurations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
