"use client";

import { cn } from "@/lib/utils";

export function HeroSliderDots() {
  return (
    <div
      className="absolute right-4 top-1/2 z-[4] hidden -translate-y-1/2 flex-col gap-2.5 lg:flex xl:right-6"
      aria-hidden
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn(
            "block h-2.5 w-2.5 rounded-full border transition-colors",
            i === 0
              ? "border-[#C9A86A] bg-[#C9A86A]"
              : "border-white/40 bg-transparent"
          )}
        />
      ))}
    </div>
  );
}
