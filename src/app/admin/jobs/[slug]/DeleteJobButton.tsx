"use client";
import SubmitFilterButton from "@/components/jobFeed/filter/SubmitFilterButton";
import { deleteJob } from "../../actions";
import { useFormState } from "react-dom";

export function DeleteJobButton({ id }: { id: number }) {
  const [formState, formAction] = useFormState(deleteJob, undefined);
  return (
    <form action={formAction}>
      <input value={id} hidden type="text" name="jobId" id="jobId" />
      <SubmitFilterButton
        className="w-full bg-red-400 hover:bg-red-600"
        type="submit"
      >
        Delete Job
      </SubmitFilterButton>
      {formState?.error && (
        <p className="text-destructive">{formState.error}</p>
      )}
    </form>
  );
}
