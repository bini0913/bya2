"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { studentFloat, studentTransition } from "@/components/hero/hero-animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HeroStudent() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] hidden w-[48%] md:block lg:w-[46%] xl:w-[44%]">
      <motion.div
        className="relative h-full w-full"
        animate={reduced ? undefined : studentFloat}
        transition={reduced ? undefined : studentTransition}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/hero/bya-hero-cinematic.jpg"
            alt="Boriyad Youth Academy student in uniform"
            fill
            priority
            className="object-cover object-[78%_22%] scale-[1.35] lg:scale-[1.28]"
            sizes="(max-width: 1024px) 50vw, 44vw"
          />
        </div>
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#081B33] to-transparent" />
      </motion.div>
    </div>
  );
}
