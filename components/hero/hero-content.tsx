"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeUpVariants, headlineVariants } from "@/components/hero/hero-animations";
import { HeroAccentCurve } from "@/components/hero/hero-accent-curve";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function HeroButton({
  href,
  variant,
  children,
  icon,
}: {
  href: string;
  variant: "primary" | "outline" | "video";
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300",
        "hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081B33]",
        variant === "primary" &&
          "bg-[#C9A86A] text-[#081B33] shadow-lg shadow-[#C9A86A]/20 hover:shadow-[#C9A86A]/40",
        variant === "outline" &&
          "border border-[#C9A86A] bg-transparent text-white hover:bg-[#C9A86A]/10 hover:shadow-[0_0_24px_rgba(201,168,106,0.25)]",
        variant === "video" &&
          "border border-[#C9A86A]/80 bg-transparent text-white hover:bg-[#C9A86A]/10 hover:shadow-[0_0_24px_rgba(201,168,106,0.2)]"
      )}
    >
      {icon}
      {children}
      {variant === "primary" && (
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#081B33]/30 bg-[#081B33]/15 transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </Link>
  );
}

export function HeroContent() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("common");
  const reduced = useReducedMotion();

  const lines = [t("line1"), t("line2"), t("line3")] as const;

  return (
    <div className="relative z-10 flex flex-col justify-center px-4 pb-8 pt-28 sm:px-6 sm:pt-32 md:max-w-[58%] md:px-8 md:pb-12 lg:max-w-[52%] lg:px-10 lg:pt-36 xl:max-w-[48%]">
      <div className="relative">
        <h1 className="font-sans uppercase leading-[1.05] tracking-tight">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              custom={i}
              initial={reduced ? false : "hidden"}
              animate={reduced ? undefined : "visible"}
              variants={headlineVariants}
              className={cn(
                "block text-[clamp(1.75rem,5vw,3.25rem)] font-bold sm:text-[clamp(2rem,4.5vw,3.5rem)] lg:text-[clamp(2.25rem,3.8vw,3.75rem)]",
                i === 1 ? "text-[#C9A86A]" : "text-white"
              )}
            >
              {line}
            </motion.span>
          ))}
        </h1>
        <HeroAccentCurve />
      </div>

      <motion.p
        initial={reduced ? false : "hidden"}
        animate={reduced ? undefined : "visible"}
        variants={fadeUpVariants}
        className="mt-8 max-w-xl font-sans text-sm leading-relaxed text-white/75 sm:text-base md:mt-10 md:leading-7"
      >
        {t("subtitle")}
      </motion.p>

      <motion.div
        initial={reduced ? false : "hidden"}
        animate={reduced ? undefined : "visible"}
        variants={fadeUpVariants}
        className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
      >
        <HeroButton href="/admissions/apply" variant="primary">
          {tc("applyNow")}
        </HeroButton>
        <HeroButton href="/academics" variant="outline">
          {tc("explorePrograms")}
        </HeroButton>
        <HeroButton
          href="/gallery"
          variant="video"
          icon={
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A86A]">
              <Play className="h-3 w-3 fill-[#C9A86A] text-[#C9A86A]" />
            </span>
          }
        >
          {t("watchVideo")}
        </HeroButton>
      </motion.div>
    </div>
  );
}
