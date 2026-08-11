import { shots, type Slot } from "@/lib/media";
import { Reveal, SectionLabel, Shot } from "./primitives";

type Beat = {
  n: string;
  title: string;
  copy: string;
  shot: Slot;
  size: "tall" | "wide" | "small";
};

const beats: Beat[] = [
  {
    n: "I",
    title: "The arrival",
    copy: "Ten in the morning. The floor is cleaned before the first car is uncovered.",
    shot: shots.arrivalWalking,
    size: "tall",
  },
  {
    n: "II",
    title: "The floor",
    copy: "Light is set before anyone walks in — the cars are read the way they were designed.",
    shot: shots.arrivalShowroom,
    size: "wide",
  },
  {
    n: "III",
    title: "The door",
    copy: "A door tells you everything about how a car was built, and how it was kept.",
    shot: shots.openingDoor,
    size: "small",
  },
  {
    n: "IV",
    title: "The hand on the hood",
    copy: "Paint depth, panel gaps, the temperature of the metal. Checked by hand, every time.",
    shot: shots.touchingHood,
    size: "tall",
  },
  {
    n: "V",
    title: "Behind the wheel",
    copy: "Every car is driven before it is offered. Nothing leaves without that hour.",
    shot: shots.harshaInside,
    size: "wide",
  },
  {
    n: "VI",
    title: "The last look",
    copy: "Lights down, covers on. The floor is reset for tomorrow's appointment.",
    shot: shots.showroomFinal,
    size: "small",
  },
];

const spans: Record<Beat["size"], string> = {
  tall: "lg:col-span-5 aspect-3/4",
  wide: "lg:col-span-7 aspect-16/10",
  small: "lg:col-span-4 aspect-square",
};

export function Journey() {
  return (
    <section id="journey" className="relative border-t border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <SectionLabel index="03">A Day at Harsha</SectionLabel>
              <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95]">
                One morning, told
                <em className="text-gradient-gold not-italic"> in six frames</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Arrival, inspection, the drive, the reset. The same sequence behind every car we hand
              over.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-x-6 gap-y-16 lg:grid-cols-12">
          {beats.map((b, i) => (
            <div
              key={b.n}
              className={`${spans[b.size]} ${i % 2 === 1 ? "lg:mt-20" : ""} lg:col-start-auto`}
            >
              <Reveal delay={(i % 2) * 90} className="h-full">
                <figure className="flex h-full flex-col">
                  <div className="relative flex-1">
                    <Shot
                      slot={b.shot}
                      alt={`${b.title} — Harsha Automobile Showroom`}
                      className="h-full min-h-[16rem] w-full"
                      imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                    />
                    <span className="absolute -left-3 top-4 bg-onyx px-2 py-1 font-display text-sm tracking-[0.3em] text-gold-soft">
                      {b.n}
                    </span>
                  </div>
                  <figcaption className="mt-5 border-t border-border pt-4">
                    <h3 className="font-display text-2xl">{b.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {b.copy}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
