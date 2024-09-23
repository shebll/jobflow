"use client";

import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loadingButton";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
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
