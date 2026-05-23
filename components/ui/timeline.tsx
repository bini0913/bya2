import { cn } from "@/lib/utils";

type TimelineItem = {
  step: number;
  title: string;
  description: string;
};

export function Timeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={cn("relative grid gap-8 md:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item, i) => (
        <li key={item.step} className="relative">
          <div className="flex flex-col">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-500 font-display text-lg font-bold text-gold-600">
              {String(item.step).padStart(2, "0")}
            </span>
            <h3 className="font-display text-lg font-semibold text-navy-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
          </div>
          {i < items.length - 1 && (
            <span
              className="absolute left-6 top-12 hidden h-px w-[calc(100%+2rem)] bg-gold-500/30 lg:block"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}
