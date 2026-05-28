"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { backgroundMotion, heroEase } from "@/components/hero/hero-animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HeroBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 scale-105"
        animate={reduced ? undefined : backgroundMotion}
        transition={reduced ? undefined : heroEase}
      >
        <Image
          src="/hero/bya-hero-cinematic.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[72%_center]"
          sizes="100vw"
          quality={92}
        />
      </motion.div>

      {/* Cinematic depth */}
      <div className="absolute inset-0 bg-[#081B33]/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#081B33]/98 via-[#081B33]/88 to-[#081B33]/12" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#081B33] via-transparent to-[#081B33]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(201,168,106,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(8,27,51,0.9),transparent_50%)]" />
    </div>
  );
}
