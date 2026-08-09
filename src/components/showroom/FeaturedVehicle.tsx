import { media } from "@/lib/media";
import { useParallax } from "@/hooks/use-reveal";
import { Reveal, SectionLabel } from "./primitives";

export function FeaturedVehicle() {
  const { ref, progress } = useParallax<HTMLDivElement>();
  const clip = 18 - progress * 18; // curtain opens as it enters
  const scale = 1.18 - progress * 0.18;

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="relative h-[130svh] min-h-[720px]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(${clip}% ${clip / 1.4}% ${clip}% ${clip / 1.4}%)`,
              transition: "clip-path 120ms linear",
            }}
          >
            <img
              src={media.featureDetail}
              alt="Macro detail of a black luxury car headlight"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
              style={{ transform: `scale(${scale})`, transition: "transform 120ms linear" }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-onyx via-onyx/50 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-onyx via-transparent to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 md:px-10">
            <SectionLabel index="03">The Featured Machine</SectionLabel>
            <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.92]">
              Vantara GT
              <br />
              <em className="text-gradient-gold not-italic">Nero Edition</em>
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Twelve examples prepared for India. Ceramic-coated obsidian paint, forged wheels,
              and a cabin trimmed to a single owner's specification.
            </p>

            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
              {[
                ["3.2s", "0–100 km/h"],
                ["710 hp", "Output"],
                ["318", "Top speed km/h"],
                ["12", "Units in India"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl text-ivory md:text-4xl">{v}</dt>
                  <dd className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Technology() {
  return (
    <section id="technology" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
        <Reveal>
          <div className="relative overflow-hidden">
            <img
              src={media.techInterior}
              alt="Ambient-lit luxury car cockpit at night"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-onyx to-transparent" />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel index="04">Technology & Performance</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95]">
              Engineering you
              <br />
              <em className="text-gradient-gold not-italic">feel before you see</em>
            </h2>
          </Reveal>

          <div className="mt-12 space-y-px bg-border">
            {[
              {
                t: "Adaptive Chassis Control",
                d: "Damping recalculated a thousand times a second, so the road arrives filtered.",
              },
              {
                t: "Acoustic Isolation",
                d: "Laminated glass and active cancellation hold the cabin near 58 dB at highway pace.",
              },
              {
                t: "Electrified Torque",
                d: "Hybrid and full-electric drivetrains delivering instant, seamless response.",
              },
              {
                t: "Certified Preparation",
                d: "Every car leaves our bay with documented history and a 214-point inspection.",
              },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 100}>
                <div className="group bg-background p-6 transition-colors duration-500 hover:bg-charcoal md:p-8">
                  <div className="flex items-start gap-6">
                    <span className="mt-2 h-px w-8 shrink-0 bg-gold/60 transition-all duration-500 group-hover:w-14" />
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl">{f.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
