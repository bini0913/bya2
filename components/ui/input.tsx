import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-sm border border-navy-900/15 bg-white px-4 py-2 text-sm text-navy-900 transition-colors",
        "placeholder:text-muted/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:border-gold-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
