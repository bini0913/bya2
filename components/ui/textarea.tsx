import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-sm border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 transition-colors",
        "placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:border-gold-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
