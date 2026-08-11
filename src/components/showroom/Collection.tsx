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
      ["31\"", "Rear screen"],
    ],
    price: "₹1.90 Cr",
    shot: shots.bmw7,
  },
];

function VehiclePanel({ v, index }: { v: Vehicle; index: number }) {
  const { open } = useBooking();
  return (
    <article className="group relative flex h-full w-[86vw] shrink-0 flex-col border-r border-border bg-background sm:w-[62vw] lg:w-[46vw] xl:w-[38vw]">
      <div className="relative flex-1 overflow-hidden">
        <Shot
          slot={v.shot}
          alt={`${v.brand} ${v.model} — ${v.category}`}
          className="h-full w-full"
          imgClassName="transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-onyx via-onyx/10 to-transparent" />
        <span className="absolute left-6 top-6 text-[0.62rem] tracking-[0.4em] text-gold-soft">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-6 top-6 text-[0.62rem] uppercase tracking-[0.28em] text-ivory/70">
          {v.category}
        </span>
      </div>

      <div className="relative z-10 -mt-16 px-6 pb-8 md:px-8">
        <p className="text-[0.62rem] uppercase tracking-[0.34em] text-muted-foreground">
          {v.brand}
        </p>
        <h3 className="mt-2 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-none">
          {v.model}
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{v.highlight}</p>

        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
          {v.spec.map(([value, label]) => (
            <div key={label}>
              <dt className="font-display text-xl text-ivory">{value}</dt>
              <dd className="mt-1 text-[0.58rem] uppercase tracking-[0.24em] text-muted-foreground">
                {label}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
          <span className="text-sm text-ivory/80">{v.price}</span>
          <button
            onClick={() => open("private-viewing", `${v.brand} ${v.model}`)}
            className="shrink-0 border border-gold/40 px-5 py-3 text-[0.62rem] uppercase tracking-[0.26em] text-gold-soft transition-all duration-500 hover:bg-gold hover:text-primary-foreground"
          >
            Explore Vehicle
          </button>
        </div>
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
    const coarse = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || coarse) {
      setPinned(false);
      return;
    }
    setPinned(true);

    let frame = 0;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
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
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      onScroll();
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return (
    <section id="collection" className="relative border-t border-border">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 md:px-10 md:pt-32">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <SectionLabel index="01">The Collection</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.94]">
                Six cars on the floor,
                <br />
                <em className="text-gradient-gold not-italic">each one signed off</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Scroll through the floor. Every car has been driven, inspected and prepared before it
              is allowed under our lights.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Desktop: pinned horizontal sequence. Mobile: natural swipe rail. */}
      <div
        ref={wrapRef}
        className="relative mt-14"
        style={pinned ? { height: `${100 + vehicles.length * 55}svh` } : undefined}
      >
        <div className={pinned ? "sticky top-0 h-[100svh] overflow-hidden" : ""}>
          <div
            ref={trackRef}
            className={
              pinned
                ? "flex h-[82svh] items-stretch border-y border-border will-change-transform"
                : "flex snap-x snap-mandatory gap-0 overflow-x-auto border-y border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            }
            style={
              pinned
                ? { transform: `translate3d(${-x}px, 0, 0)`, transition: "transform 120ms linear" }
                : undefined
            }
          >
            {vehicles.map((v, i) => (
              <div key={v.model} className={pinned ? "h-full" : "h-[78svh] shrink-0 snap-start"}>
                <VehiclePanel v={v} index={i} />
              </div>
            ))}
          </div>

          {pinned ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-[1600px] items-center gap-4 px-10">
              <span className="text-[0.6rem] tracking-[0.34em] text-muted-foreground">
                DRAG THE FLOOR — SCROLL
              </span>
              <span className="h-px flex-1 bg-border">
                <span
                  className="block h-px bg-gold transition-[width] duration-150"
                  style={{ width: `${distance ? (x / distance) * 100 : 0}%` }}
                />
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
