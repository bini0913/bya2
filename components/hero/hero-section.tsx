"use client";

import { HeroBackground } from "@/components/hero/hero-background";
import { HeroContent } from "@/components/hero/hero-content";
import { HeroFloatingIcons } from "@/components/hero/hero-floating-icons";
import { HeroSliderDots } from "@/components/hero/hero-slider-dots";
import { HeroStatsStrip } from "@/components/hero/hero-stats-strip";
import { HeroStudent } from "@/components/hero/hero-student";
import { HeroVideoWidget } from "@/components/hero/hero-video-widget";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#081B33]" aria-label="Hero">
      <div className="relative flex min-h-0 flex-1 flex-col">
        <HeroBackground />
        <HeroStudent />
        <HeroFloatingIcons />
        <HeroVideoWidget />
        <HeroSliderDots />

        {/* Mobile student preview */}
        <div className="pointer-events-none absolute bottom-32 right-0 z-[2] h-48 w-40 opacity-90 md:hidden">
          <div
            className="h-full w-full bg-cover bg-[78%_22%]"
            style={{ backgroundImage: "url(/hero/bya-hero-cinematic.jpg)" }}
            role="img"
            aria-label=""
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#081B33]" />
        </div>

        <div className="relative mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col justify-center">
          <HeroContent />
        </div>
      </div>

      <HeroStatsStrip />
    </section>
  );
}
