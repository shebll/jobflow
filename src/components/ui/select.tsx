import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { forwardRef } from "react";

export default forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  return (
    <div className="relative">
      <select
        className={cn(
          "disabled:cursor-not-allow block w-full cursor-pointer appearance-none truncate rounded-md border bg-background py-1.5 pl-3 pr-8 text-sm outline-none ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50",
          className,
        )}
        {...props}
        ref={ref}
      />
      <ChevronDown className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 opacity-50" />
    </div>
  );
});
