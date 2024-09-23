"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

interface LoadingButtonyType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pending: boolean;
}

export function LoadingButton(props: LoadingButtonyType) {
  return (
    <Button
      {...props}
      type={props.type}
      className={cn(props.className, "")}
      disabled={props.disabled || props.pending}
    >
      <span className="flex items-center justify-center gap-1">
        {props.pending && <LoaderIcon size={16} className="animate-spin" />}
        {props.children}
      </span>
    </Button>
  );
}
