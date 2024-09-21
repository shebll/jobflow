"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitFilterButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      type={props.type}
      className={cn(props.className, "")}
      disabled={props.disabled || pending}
    >
      <span className="flex items-center justify-center gap-1">
        {pending && <LoaderIcon size={16} className="animate-spin" />}
        {props.children}
      </span>
    </Button>
  );
}

export default SubmitFilterButton;
