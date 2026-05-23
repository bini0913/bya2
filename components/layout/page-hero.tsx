import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 cinematic-gradient">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.1),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl font-semibold text-white md:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/65 md:text-lg">{description}</p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
