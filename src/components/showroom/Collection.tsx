import { useEffect, useRef, useState } from "react";
import { shots } from "@/lib/media";
import { Reveal, SectionLabel, Shot } from "./primitives";
import { useBooking } from "./booking";
import type { Slot } from "@/lib/media";

type Vehicle = {
  brand: string;
  model: string;
  category: string;
  highlight: string;
  spec: [string, string][];
  price: string;
  shot: Slot;
};

const vehicles: Vehicle[] = [
  {
    brand: "Mercedes-Maybach",
    model: "S-Class",
    category: "Chauffeur Flagship",
    highlight: "The rear seat that defines the segment.",
    spec: [
      ["V8", "Engine"],
      ["4.5s", "0–100"],
      ["Executive", "Rear"],
    ],
    price: "₹3.20 Cr",
    shot: shots.maybach,
  },
  {
    brand: "Porsche",
    model: "Panamera",
    category: "Grand Tourer",
    highlight: "A saloon that behaves like a 911 when asked.",
    spec: [
      ["Twin-turbo", "Engine"],
      ["3.7s", "0–100"],
      ["PASM", "Chassis"],
    ],
    price: "₹2.10 Cr",
    shot: shots.panamera,
  },
  {
    brand: "Land Rover",
    model: "Range Rover Autobiography",
    category: "Luxury SUV",
    highlight: "Silence, altitude and absolute composure.",
    spec: [
      ["Air susp.", "Ride"],
      ["Terrain 2", "Drive"],
      ["24-way", "Seating"],
    ],
    price: "₹2.85 Cr",
    shot: shots.rangeRover,
  },
  {
    brand: "BMW",
    model: "XM",
    category: "Performance SUV",
    highlight: "M division's hybrid statement piece.",
    spec: [
      ["653 hp", "Output"],
      ["4.3s", "0–100"],
      ["Hybrid", "Drive"],
    ],
    price: "₹2.60 Cr",
    shot: shots.bmwXm,
  },
  {
    brand: "Audi",
    model: "A8",
    category: "Executive Sedan",
    highlight: "Understatement engineered to the millimetre.",
    spec: [
      ["quattro", "Drive"],
      ["5.6s", "0–100"],
      ["Matrix", "Light"],
    ],
    price: "₹1.65 Cr",
    shot: shots.audiA8,
  },
  {
    brand: "BMW",
    model: "7 Series",
    category: "Luxury Sedan",
    highlight: "Theatre screen rear, limousine front.",
    spec: [
      ["Adaptive", "Chassis"],
      ["5.4s", "0–100"],
      ['31"', "Rear screen"],
    ],
    price: "₹1.90 Cr",
    shot: shots.bmw7,
  },
];

/** A gallery frame — hung on the wall, not a card. */
function GalleryPiece({ v, index, wide }: { v: Vehicle; index: number; wide: boolean }) {
  const { open } = useBooking();
  return (
    <article className="group flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden bg-charcoal">
        <Shot
          slot={v.shot}
          alt={`${v.brand} ${v.model} — ${v.category}`}
          className="h-full w-full"
          imgClassName="transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-onyx/85 via-onyx/5 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] group-hover:opacity-100 warm-wash" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-8">
          <div className="flex items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="text-[0.58rem] uppercase tracking-[0.36em] text-gold-soft">
                {String(index + 1).padStart(2, "0")} — {v.category}
              </p>
              <p className="mt-3 truncate text-[0.68rem] uppercase tracking-[0.3em] text-ivory/60">
                {v.brand}
              </p>
              <h3
                className={`mt-1 font-display leading-[0.95] ${
                  wide ? "text-[clamp(2rem,3.6vw,3.6rem)]" : "text-[clamp(1.8rem,3vw,2.8rem)]"
                }`}
              >
                {v.model}
              </h3>
            </div>
            <span className="hidden shrink-0 text-right text-sm text-ivory/70 sm:block">
              {v.price}
            </span>
          </div>

          {/* specs slide up on hover — desktop refinement, always legible on touch */}
          <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
            <p className="max-w-sm text-sm leading-relaxed text-ivory/75">{v.highlight}</p>
            <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3 border-t border-gold/20 pt-4">
              {v.spec.map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-xl text-ivory">{value}</dt>
                  <dd className="mt-0.5 text-[0.55rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
        <span className="text-sm text-ivory/70 sm:hidden">{v.price}</span>
        <span className="hidden text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground sm:block">
          Available to view
        </span>
        <button
          onClick={() => open("private-viewing", `${v.brand} ${v.model}`)}
          className="group/btn relative shrink-0 text-[0.62rem] uppercase tracking-[0.3em] text-gold-soft transition-colors duration-500 hover:text-ivory"
        >
          Enquire
          <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-30 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-x-100" />
        </button>
      </div>
    </article>
  );
}

export function Collection() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [x, setX] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 1023px)").matches;
    if (reduced || small) {
      setPinned(false);
      return;
    }
    setPinned(true);

    let frame = 0;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 80));
    };
    const update = () => {
      frame = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      setX(p * distance);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return (
    <section id="collection" className="relative section-seam">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 md:px-10 md:pt-36">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <SectionLabel index="01">The Collection</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.94]">
                Six cars on the floor,
                <br />
                <em className="text-gradient-gold not-italic">each one signed off</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Walk the gallery. Every car has been driven, inspected and prepared before it is
              allowed under our lights.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Desktop: a pinned gallery wall that travels sideways.
          Mobile: a purpose-built vertical editorial run — not a squeezed rail. */}
      {pinned ? (
        <div
          ref={wrapRef}
          className="relative mt-16"
          style={{ height: `${100 + vehicles.length * 52}svh` }}
        >
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-[100svh] items-center gap-14 px-10 will-change-transform xl:gap-20"
              style={{ transform: `translate3d(${-x}px, 0, 0)`, transition: "transform 140ms linear" }}
            >
              {vehicles.map((v, i) => (
                <div
                  key={v.model}
                  className={
                    i % 3 === 1
                      ? "h-[58svh] w-[34vw] shrink-0 self-end pb-24"
                      : i % 3 === 2
                        ? "h-[70svh] w-[42vw] shrink-0"
                        : "h-[64svh] w-[30vw] shrink-0 self-start pt-24"
                  }
                >
                  <GalleryPiece v={v} index={i} wide={i % 3 === 2} />
                </div>
              ))}
              <div className="h-[64svh] w-[26vw] shrink-0 self-center">
                <p className="font-display text-[clamp(2rem,3vw,3.2rem)] leading-[1.05] text-ivory/80">
                  Everything here can be
                  <em className="text-gradient-gold not-italic"> driven today.</em>
                </p>
                <div className="mt-8 rule-gold" />
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Tell us which car and we will have it uncovered, warmed and waiting.
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-onyx to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-onyx to-transparent" />

            <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto flex max-w-[1600px] items-center gap-5 px-10">
              <span className="text-[0.58rem] tracking-[0.36em] text-muted-foreground">
                THE GALLERY FLOOR
              </span>
              <span className="h-px flex-1 bg-border">
                <span
                  className="block h-px bg-gold transition-[width] duration-150"
                  style={{ width: `${distance ? (x / distance) * 100 : 0}%` }}
                />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-14 space-y-16 px-6 md:px-10">
          {vehicles.map((v, i) => (
            <Reveal key={v.model} delay={(i % 2) * 80}>
              <div className={i % 2 === 1 ? "ml-auto w-[92%]" : "w-full"}>
                <div className="h-[62svh] min-h-[22rem]">
                  <GalleryPiece v={v} index={i} wide={false} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
