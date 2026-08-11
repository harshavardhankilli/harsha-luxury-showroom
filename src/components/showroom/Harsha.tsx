import { shots } from "@/lib/media";
import { Reveal, SectionLabel, Shot } from "./primitives";
import { BookingButtons } from "./booking";

const marquee = "HARSHA × AUTOMOBILE — CURATION — PREPARATION — DELIVERY — ";

export function HarshaXAutomobile() {
  return (
    <section id="harsha" className="relative overflow-hidden border-y border-border">
      <div className="relative flex overflow-hidden border-b border-border py-6">
        {[0, 1].map((k) => (
          <div
            key={k}
            aria-hidden={k === 1}
            className="flex min-w-full shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-8 whitespace-nowrap"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-[clamp(1.75rem,4vw,3.25rem)] tracking-tight text-ivory/12"
              >
                {marquee}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <Shot
            slot={shots.harshaMaybach}
            alt="Harsha with a Mercedes-Maybach at the showroom"
            className="aspect-3/4 w-full"
          />
        </Reveal>

        <Reveal delay={140} className="lg:col-span-3 lg:mt-28">
          <Shot
            slot={shots.harshaMercedes}
            alt="Harsha beside a Mercedes"
            className="aspect-3/4 w-full"
          />
          <p className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            Harsha — Founder
          </p>
        </Reveal>

        <div className="flex flex-col justify-center lg:col-span-4 lg:pl-6">
          <Reveal>
            <SectionLabel index="06">Harsha × Automobile</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,4rem)] leading-[0.95]">
              A lifetime spent
              <br />
              <em className="text-gradient-gold not-italic">around the machine</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              The showroom carries one person's judgement. Every car listed here has been driven,
              inspected and signed off personally — not sourced from a catalogue. Fewer cars, better
              cars, and a straight answer about each one.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-7">
              {[
                ["16", "Years in motoring"],
                ["900+", "Cars delivered"],
                ["214", "Point inspection"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl text-gradient-gold">{v}</dt>
                  <dd className="mt-2 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
            <BookingButtons className="mt-9" variant="compact" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AboutHarsha() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <Reveal>
            <SectionLabel index="07">About Harsha</SectionLabel>
            <h2 className="mt-6 max-w-xl font-display text-[clamp(2rem,4.6vw,4.25rem)] leading-[0.95]">
              The person behind the showroom
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-9 max-w-xl space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                What began as weekends in a workshop became a practice: sourcing exceptional
                vehicles, restoring their presentation to factory intent, and matching them to the
                right owner rather than the fastest buyer.
              </p>
              <p>
                Clients come for the cars and stay for the counsel — advice on specification,
                ownership costs, servicing and eventual resale, given plainly and without pressure.
              </p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-11 border-l border-gold/40 pl-6">
              <p className="font-display text-2xl leading-snug text-ivory/90 md:text-3xl">
                “A car should be delivered the way it was designed — nothing hidden, nothing
                hurried.”
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-gold-soft">
                Harsha — Founder
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <Shot
            slot={shots.heroSide}
            alt="Harsha at the showroom"
            className="h-full min-h-[26rem] w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
