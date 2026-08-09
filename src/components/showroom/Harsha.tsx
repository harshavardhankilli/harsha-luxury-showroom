import { harshaMedia } from "@/lib/media";
import { Reveal, ReservedPhotoSlot, SectionLabel } from "./primitives";

const marquee = "HARSHA × AUTOMOBILE — CURATION — PREPARATION — DELIVERY — ";

export function HarshaXAutomobile() {
  return (
    <section id="harsha" className="relative overflow-hidden border-y border-border">
      {/* WOW: infinite editorial marquee */}
      <div className="relative flex overflow-hidden border-b border-border py-6">
        <div className="flex min-w-full shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[clamp(1.75rem,4vw,3.25rem)] tracking-tight text-ivory/12"
            >
              {marquee}
            </span>
          ))}
        </div>
        <div
          aria-hidden
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
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-24">
        <Reveal>
          {harshaMedia.portrait ? (
            <img
              src={harshaMedia.portrait}
              alt="Harsha, founder of Harsha Automobile Showroom"
              loading="lazy"
              className="aspect-3/4 w-full object-cover"
            />
          ) : (
            <ReservedPhotoSlot
              label="Portrait of Harsha"
              filename="src/assets/harsha-portrait.jpg"
              className="aspect-3/4"
            />
          )}
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <SectionLabel index="05">Harsha × Automobile</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.95]">
              A lifetime spent
              <br />
              <em className="text-gradient-gold not-italic">around the machine</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              The showroom carries one person's judgement. Every car listed here has been driven,
              inspected and signed off personally — not sourced from a catalogue. That is the whole
              proposition: fewer cars, better cars, and a straight answer about each one.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-3">
              {[
                ["16", "Years in motoring"],
                ["900+", "Cars delivered"],
                ["214", "Point inspection"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-4xl text-gradient-gold">{v}</dt>
                  <dd className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AboutHarsha() {
  return (
    <section id="about" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-24">
        <div>
          <Reveal>
            <SectionLabel index="06">About Harsha</SectionLabel>
            <h2 className="mt-6 max-w-xl font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95]">
              The person behind the showroom
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 max-w-xl space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
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
            <div className="mt-12 border-l border-gold/40 pl-6">
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
          {harshaMedia.about ? (
            <img
              src={harshaMedia.about}
              alt="Harsha at the showroom"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <ReservedPhotoSlot
              label="Editorial photograph of Harsha"
              filename="src/assets/harsha-about.jpg"
              className="h-full min-h-[26rem]"
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}
