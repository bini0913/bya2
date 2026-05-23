"use client";

import { motion } from "framer-motion";
import { BookOpen, FlaskConical, Globe, GraduationCap, Lightbulb } from "lucide-react";
import { iconFloat } from "@/components/hero/hero-animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const ICONS = [
  { Icon: GraduationCap, className: "left-[54%] top-[20%]", duration: 5 },
  { Icon: BookOpen, className: "left-[48%] top-[36%]", duration: 6 },
  { Icon: Lightbulb, className: "right-[24%] top-[26%]", duration: 4 },
  { Icon: Globe, className: "right-[20%] top-[44%]", duration: 5 },
  { Icon: FlaskConical, className: "right-[28%] top-[58%] hidden lg:block", duration: 6 },
] as const;

export function HeroFloatingIcons() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-[3] hidden md:block" aria-hidden>
      {ICONS.map(({ Icon, className, duration }, i) => (
        <motion.div
          key={i}
          className={cn("absolute", className)}
          animate={reduced ? undefined : iconFloat(duration)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A86A]/35 bg-[#081B33]/40 backdrop-blur-sm lg:h-12 lg:w-12">
            <Icon className="h-5 w-5 text-[#C9A86A]/90 lg:h-6 lg:w-6" strokeWidth={1.25} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
