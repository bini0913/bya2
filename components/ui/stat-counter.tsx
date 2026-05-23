"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

export function StatCounter({
  value,
  suffix = "",
  label,
  light = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  light?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, 2200, inView);

  return (
    <div ref={ref} className="text-center">
      <p
        className={cn(
          "font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
          light ? "text-gold-400" : "text-navy-900"
        )}
      >
        {count}
        {suffix}
      </p>
      <p
        className={cn(
          "mt-2 text-sm font-medium uppercase tracking-wider",
          light ? "text-white/60" : "text-muted"
        )}
      >
        {label}
      </p>
    </div>
  );
}
