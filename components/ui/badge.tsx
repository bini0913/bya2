import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "bg-navy-900/10 text-navy-900",
        gold: "bg-gold-500/15 text-gold-700",
        luxury: "bg-white/10 text-gold-400 border border-white/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
