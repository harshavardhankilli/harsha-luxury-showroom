import { shots } from "@/lib/media";
import { useParallax } from "@/hooks/use-reveal";
import { Reveal, SectionLabel, Shot } from "./primitives";

export function Interior() {
  const { ref, progress } = useParallax<HTMLDivElement>();
  const shift = (progress - 0.5) * 40;

  return (
    <section
      id="interior"
      ref={ref}
      className="relative border-t border-border px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel index="04">Interior</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.6vw,4rem)] leading-[0.95]">
                Cabins built
                <br />
                <em className="text-gradient-gold not-italic">to be lived in</em>
              </h2>
              <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Hide, wood and metal — inspected under daylight, not showroom spot. Stitching,
                bolster wear, switch feel and screen calibration are all part of the handover
                report.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <ul className="mt-10 space-y-4 border-t border-border pt-7">
                {[
                  ["Craft", "Hand-finished veneers and stitched hide"],
                  ["Comfort", "Rear lounge seating, climate and acoustics"],
                  ["Technology", "Calibrated displays, audio and driver aids"],
                ].map(([k, v]) => (
                  <li key={k} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4">
                    <span className="text-[0.6rem] uppercase tracking-[0.28em] text-gold-soft">
                      {k}
                    </span>
                    <span className="text-sm text-muted-foreground">{v}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-12">
              <Reveal className="sm:col-span-8">
                <Shot
                  slot={shots.frontCabin}
                  alt="Front cabin of a luxury car"
                  className="aspect-16/10 w-full"
                  imgClassName="scale-105"
                  style={{ transform: `translate3d(0, ${-shift * 0.5}px, 0) scale(1.08)` }}
                />
              </Reveal>

              <Reveal delay={120} className="sm:col-span-4 sm:mt-14">
                <Shot
                  slot={shots.dashboardDetail}
                  alt="Dashboard detail"
                  className="aspect-3/4 w-full"
                />
                <p className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                  Dashboard
                </p>
              </Reveal>

              <Reveal delay={80} className="sm:col-span-5 sm:-mt-6">
                <Shot
                  slot={shots.harshaInside}
                  alt="Harsha seated inside the car"
                  className="aspect-4/5 w-full"
                />
              </Reveal>

              <Reveal delay={180} className="sm:col-span-7">
                <Shot
                  slot={shots.rearLounge}
                  alt="Rear lounge seating"
                  className="aspect-4/3 w-full"
                  imgClassName="scale-105"
                  style={{ transform: `translate3d(0, ${shift * 0.4}px, 0) scale(1.08)` }}
                />
                <p className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                  Rear lounge
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const craft = [
  {
    n: "01",
    title: "Precision",
    copy: "Panel gaps, alignment and torque checked against factory tolerance.",
    shot: shots.wheelDetail,
  },
  {
    n: "02",
    title: "Craft",
    copy: "Paint corrected by hand, then ceramic sealed before it reaches the floor.",
    shot: shots.touchDetail,
  },
  {
    n: "03",
    title: "Detail",
    copy: "Forged wheels refinished, brake hardware cleaned and re-coated.",
    shot: shots.wheelDetail,
  },
  {
    n: "04",
    title: "Technology",
    copy: "Software, sensors and driver aids verified before handover.",
    shot: shots.dashboardDetail,
  },
];

export function Details() {
  return (
    <section
      id="details"
      className="relative overflow-hidden border-t border-border px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <SectionLabel index="05">Precision · Craft · Detail · Technology</SectionLabel>
        </Reveal>

        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-4">
          {craft.map((c, i) => (
            <Reveal key={c.n} delay={i * 90}>
              <article className="group h-full bg-background p-6 transition-colors duration-700 hover:bg-charcoal md:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[0.6rem] tracking-[0.34em] text-gold-soft">{c.n}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <Shot
                  slot={c.shot}
                  alt={`${c.title} — automotive detail`}
                  className="mt-6 aspect-square w-full"
                  imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                />
                <h3 className="mt-6 font-display text-3xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
