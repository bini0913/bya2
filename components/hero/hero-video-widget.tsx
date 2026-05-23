"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { iconFloat } from "@/components/hero/hero-animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HeroVideoWidget() {
  const t = useTranslations("home.hero");
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      className="group absolute bottom-[22%] right-[6%] z-[4] hidden items-center gap-3 rounded-lg border border-[#C9A86A]/50 bg-[#081B33]/85 p-2 pr-4 shadow-2xl backdrop-blur-md transition-shadow hover:shadow-[#C9A86A]/20 lg:flex xl:right-[8%]"
      animate={reduced ? undefined : iconFloat(5)}
      aria-label={t("watchVideo")}
    >
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border border-[#C9A86A]/30">
        <Image
          src="/hero/bya-hero-cinematic.jpg"
          alt=""
          fill
          className="object-cover object-[90%_60%]"
          sizes="80px"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-[#081B33]/40">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A86A] bg-[#C9A86A]/20 text-[#C9A86A] transition-transform group-hover:scale-110">
            <Play className="h-3.5 w-3.5 fill-current" />
          </span>
        </span>
      </div>
      <div className="text-left">
        <p className="text-xs font-semibold text-white">{t("campusLife")}</p>
        <p className="text-[10px] text-white/50">4:45</p>
      </div>
    </motion.button>
  );
}
