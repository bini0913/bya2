import * as React from "react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => (
    <select
      className={cn(
        "flex h-11 w-full rounded-sm border border-navy-900/15 bg-white px-4 py-2 text-sm text-navy-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:border-gold-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

export { Select };
