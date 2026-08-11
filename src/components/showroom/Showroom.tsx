import { shots } from "@/lib/media";
import { useParallax } from "@/hooks/use-reveal";
import { Reveal, SectionLabel, Shot } from "./primitives";
import { BookingButtons } from "./booking";

export function Showroom() {
  const { ref, progress } = useParallax<HTMLDivElement>();

  return (
    <section id="showroom" className="relative border-t border-border">
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <Reveal>
              <Shot
                slot={shots.arrivalShowroom}
                alt="The Harsha showroom floor"
                className="aspect-16/10 w-full"
                imgClassName="scale-105"
                style={{ transform: `translate3d(0, ${(progress - 0.5) * -28}px, 0) scale(1.08)` }}
              />
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5 lg:pl-10">
            <Reveal>
              <SectionLabel index="02">The Showroom</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]">
                A real floor,
                <br />
                <em className="text-gradient-gold not-italic">a real address</em>
              </h2>
              <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Polished stone, controlled light and a handful of cars at a time. Nothing is parked
                here that hasn't been prepared to delivery standard — you can walk the floor, sit in
                every car, and take the one you want out on the road the same day.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-7">
                {[
                  ["4", "Cars on the floor"],
                  ["214", "Point preparation"],
                  ["1:1", "Appointments only"],
                  ["10–19", "Mon to Sat"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="font-display text-3xl text-gradient-gold">{v}</dt>
                    <dd className="mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                      {l}
                    </dd>
                  </div>
                ))}
              </dl>
              <BookingButtons className="mt-9" variant="compact" />
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-3">
            <Reveal delay={120}>
              <Shot
                slot={shots.showroomFinal}
                alt="Harsha showroom, evening light"
                className="aspect-4/5 w-full"
              />
              <p className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Lakeside Avenue — Hyderabad
              </p>
            </Reveal>
          </div>

          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={200}>
              <p className="max-w-md font-display text-2xl leading-snug text-ivory/90 md:text-3xl">
                “The floor is quiet on purpose. You should hear the door close, not a sales pitch.”
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
