import { media } from "@/lib/media";
import { Reveal, SectionLabel } from "./primitives";

const vehicles = [
  {
    name: "Solstice Saloon",
    type: "Luxury Sedan",
    image: media.sedan,
    spec: ["4.0L V8", "0–100 in 4.1s", "Hand-stitched cabin"],
    price: "From ₹1.85 Cr",
  },
  {
    name: "Vantara GT",
    type: "Performance Coupe",
    image: media.coupe,
    spec: ["Twin-turbo", "0–100 in 3.2s", "Carbon aero"],
    price: "From ₹2.40 Cr",
  },
  {
    name: "Meridian Estate",
    type: "Luxury SUV",
    image: media.suv,
    spec: ["Air suspension", "Seven seats", "Executive rear"],
    price: "From ₹2.10 Cr",
  },
];

export function Collection() {
  return (
    <section id="collection" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <SectionLabel index="01">Featured Collection</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[0.95]">
                Three machines,
                <br />
                <em className="text-gradient-gold not-italic">one standard</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Each car in the showroom passes a 214-point preparation before it is allowed under
              our lights.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
          {vehicles.map((v, i) => (
            <Reveal key={v.name} delay={i * 140}>
              <article className="group relative h-full bg-background p-6 transition-colors duration-700 hover:bg-charcoal md:p-8">
                <div className="relative aspect-4/3 overflow-hidden bg-onyx">
                  <img
                    src={v.image}
                    alt={`${v.name} — ${v.type}`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-onyx/70 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-30" />
                </div>

                <div className="mt-7 flex items-baseline justify-between gap-4">
                  <h3 className="min-w-0 truncate font-display text-3xl">{v.name}</h3>
                  <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft">
                    {v.type}
                  </span>
                </div>

                <ul className="mt-6 space-y-2">
                  {v.spec.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <span className="h-px w-4 bg-gold/50" />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                  <span className="text-sm text-ivory/80">{v.price}</span>
                  <span className="text-xs uppercase tracking-[0.24em] text-gold-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Enquire →
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
