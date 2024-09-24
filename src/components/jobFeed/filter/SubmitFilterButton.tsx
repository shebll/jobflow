"use client";

import { LoadingButton } from "@/components/ui/loadingButton";
import { useFormStatus } from "react-dom";

function SubmitFilterButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return (
    <LoadingButton type="submit" pending={pending} {...props}>
      {props.children}
    </LoadingButton>
  );
}

export default SubmitFilterButton;
