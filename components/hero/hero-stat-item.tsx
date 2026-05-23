"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

export function HeroStatItem({
  value,
  suffix,
  label,
  sublabel,
  icon: Icon,
  showDivider,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: LucideIcon;
  showDivider?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, 2200, inView);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-w-0 flex-1 items-center gap-3 px-4 py-5 sm:gap-4 sm:px-5 md:px-6 lg:px-8",
        showDivider &&
          "before:absolute before:left-0 before:top-1/2 before:hidden before:h-10 before:w-px before:-translate-y-1/2 before:bg-white/15 sm:before:block"
      )}
    >
      <Icon className="h-7 w-7 shrink-0 text-[#C9A86A] sm:h-8 sm:w-8" strokeWidth={1.25} />
      <div className="min-w-0">
        <p className="font-sans text-xl font-bold tracking-tight text-[#C9A86A] sm:text-2xl lg:text-[1.65rem]">
          {count}
          {suffix}
        </p>
        <p className="truncate font-sans text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
          {label}
        </p>
        <p className="truncate text-[10px] text-white/45 sm:text-xs">{sublabel}</p>
      </div>
    </div>
  );
}
