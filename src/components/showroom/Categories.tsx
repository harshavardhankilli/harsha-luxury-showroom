import { Reveal, SectionLabel } from "./primitives";

const categories = [
  { name: "Luxury", count: "18 cars", note: "Chauffeur-grade comfort" },
  { name: "Performance", count: "12 cars", note: "Track-bred engineering" },
  { name: "SUV", count: "15 cars", note: "Command and capability" },
  { name: "Sedan", count: "21 cars", note: "The classical silhouette" },
  { name: "Electric", count: "09 cars", note: "Silent, immediate torque" },
  { name: "Executive", count: "07 cars", note: "Business-class rear seats" },
];

export function Categories() {
  return (
    <section id="categories" className="relative border-y border-border px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <SectionLabel index="02">Categories</SectionLabel>
        </Reveal>

        <div className="mt-14 border-t border-border">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <a
                href="#collection"
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-b border-border py-7 transition-colors duration-500 hover:bg-charcoal/60 md:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1fr)_auto] md:py-9"
              >
                <span className="hidden text-xs tracking-[0.3em] text-muted-foreground md:block md:pl-6">
                  0{i + 1}
                </span>
                <h3 className="min-w-0 truncate font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:group-hover:translate-x-6">
                  {c.name}
                </h3>
                <span className="hidden text-sm text-muted-foreground md:block">{c.note}</span>
                <span className="shrink-0 pr-1 text-xs uppercase tracking-[0.24em] text-gold-soft md:pr-6">
                  {c.count}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
