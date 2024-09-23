import SubmitFilterButton from "@/components/jobFeed/filter/SubmitFilterButton";
import { approveSubmission } from "../../actions";

export function ApproveButton({ id }: { id: number }) {
  return (
    <form action={approveSubmission}>
      <input value={id} hidden type="text" name="jobId" id="jobId" />
      <SubmitFilterButton
        className="w-full bg-green-400 hover:bg-green-600"
        type="submit"
      >
        Approve Job
      </SubmitFilterButton>
    </form>
  );
}
