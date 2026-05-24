import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export function LeadershipMessageSection() {
  return (
    <Section id="leadership-message" className="bg-[#F8F7F4]">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-[#eef2f7] shadow-[0_20px_50px_rgba(8,27,51,0.16)]">
          <div className="leadership-photo-pulse relative aspect-[4/5] w-full">
            <Image
              src="/about/jalane-tadesse.jpg"
              alt="General Manager Jalane Tadesse"
              fill
              priority
              className="object-contain p-2 md:p-3"
              sizes="(max-width: 1024px) 100vw, 42vw"
              unoptimized
            />
          </div>
        </div>

        <ScrollReveal>
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-600">LEADERSHIP MESSAGE</p>

            <h2 className="font-display text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">
              A Welcome From Our Leadership
            </h2>

            <div>
              <p className="font-display text-2xl font-semibold text-navy-900">Jalane Tadesse</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                General Manager
                <br />
                Boriyad Youth Academy
              </p>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-navy-900/85 md:text-lg">
              At Boriyad Youth Academy, we believe education extends beyond classrooms. Our mission is
              to nurture disciplined, confident and capable young people prepared to contribute
              meaningfully to Ethiopia and the world. Every learner deserves an environment built on
              excellence, integrity and opportunity, and together with parents and educators, we are
              building future leaders.
            </p>

            <div className="rounded-lg border-l-2 border-gold-500/70 pl-4">
              <p className="font-display text-xl text-navy-900/80">General Manager Signature</p>
            </div>

            <Button
              asChild
              variant="gold"
              className="group w-fit shadow-[0_8px_20px_rgba(201,168,106,0.28)] hover:shadow-[0_0_28px_rgba(201,168,106,0.52)]"
            >
              <Link href="/about#leadership-message">
                Read Full Message
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
