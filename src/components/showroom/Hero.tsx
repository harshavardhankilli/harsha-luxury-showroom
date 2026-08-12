import { useEffect, useRef, useState } from "react";
import { shots } from "@/lib/media";
import { Shot } from "./primitives";
import { BookingButtons } from "./booking";

/* ────────────────────────────────────────────────────────────────────────────
 * ★ HARSHA PHOTO SLOT — REPLACE HERE ★
 *
 * The two hero frames below render the founder's real photographs:
 *   src/assets/hero/01-hero-harsha.jpg       → shots.heroMain  (full-bleed hero)
 *   src/assets/hero/02-hero-harsha-side.jpg  → shots.heroSide  (portrait inset)
 *
 * To swap in a new photo, drop a file at that EXACT path (or replace the
 * matching *.asset.json pointer next to it). No code change is required —
 * src/lib/media.ts resolves it automatically. Never substitute a generated or
 * stock human face here: with no file present the frame renders a clearly
 * named reserved slot instead.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Cinematic opening: black → wordmark → champagne sweep → car reveal. */
function Curtain() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(3);
      return;
    }
    const timers = [
      setTimeout(() => setStage(1), 140),
      setTimeout(() => setStage(2), 1650),
      setTimeout(() => setStage(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (stage === 3) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-80 flex items-center justify-center bg-onyx transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ opacity: stage === 2 ? 0 : 1 }}
    >
      <div className="relative px-6 text-center">
        <p
          className="font-display text-[clamp(2rem,9vw,5rem)] tracking-[0.42em] text-ivory transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: stage >= 1 ? 1 : 0, transform: stage >= 1 ? "none" : "translateY(18%)" }}
        >
          HARSHA
        </p>
        <div
          className="mx-auto mt-5 h-px w-56 max-w-full shimmer-line transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: stage >= 1 ? 1 : 0, transform: `scaleX(${stage >= 1 ? 1 : 0})` }}
        />
        <p
          className="mt-5 text-[0.6rem] tracking-[0.6em] text-muted-foreground transition-opacity duration-1000"
          style={{ opacity: stage >= 1 ? 1 : 0 }}
        >
          AUTOMOBILE SHOWROOM
        </p>
      </div>
    </div>
  );
}

/** Fine pointer-only parallax — a few pixels of drift, never a gimmick. */
function usePointerDrift(strength = 14) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        setPos({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return { dx: pos.x * strength, dy: pos.y * strength };
}

export function Hero() {
  const [offset, setOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { dx, dy } = usePointerDrift(16);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setLoaded(true), reduced ? 0 : 2400);
    let frame = 0;
    const update = () => {
      frame = 0;
      setOffset(window.scrollY);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const fade = Math.max(0, 1 - offset / 620);

  return (
    <>
      <Curtain />
      <section id="top" className="vignette relative min-h-[100svh] overflow-hidden bg-onyx">
        {/* Cinematic plate: slow scale-out reveal + scroll and pointer parallax */}
        <div
          className="absolute inset-0"
          style={{ transform: `translate3d(${dx * 0.5}px, ${offset * 0.28 + dy * 0.5}px, 0)` }}
        >
          <Shot
            slot={shots.heroMain}
            alt="Harsha at the Hyderabad showroom beside a black luxury saloon"
            loading="eager"
            position="center 32%"
            className="h-[108svh] w-full"
            imgClassName="transition-transform duration-[2600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: loaded ? "scale(1.02)" : "scale(1.14)" }}
          />
          {/* warm architectural wash — keeps the face readable, adds showroom light */}
          <div className="pointer-events-none absolute inset-0 warm-wash" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-onyx via-onyx/20 to-onyx/40" />
          {/* glossy floor falloff */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38svh] floor-gloss" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-6 pb-14 md:px-10 md:pb-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-end">
            <div style={{ opacity: fade }}>
              <div className="overflow-hidden">
                <p
                  className="eyebrow transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: loaded ? "none" : "translateY(130%)" }}
                >
                  Hyderabad — By Appointment
                </p>
              </div>

              <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,8.4vw,7.5rem)] leading-[0.9] tracking-[-0.02em]">
                {["The Art of", "the Automobile"].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.08em]">
                    <span
                      className="block transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: loaded ? "none" : "translateY(115%)",
                        transitionDelay: `${180 + i * 170}ms`,
                      }}
                    >
                      {i === 1 ? <em className="text-gradient-gold not-italic">{line}</em> : line}
                    </span>
                  </span>
                ))}
              </h1>

              <div
                className="mt-7 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:mt-9"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "none" : "translateY(26px)",
                  transitionDelay: "680ms",
                }}
              >
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  A private showroom of exceptional machines — selected, prepared and delivered
                  personally by Harsha.
                </p>
                <BookingButtons className="mt-7 md:mt-9" />
              </div>
            </div>

            {/* ★ HARSHA PORTRAIT SLOT — src/assets/hero/02-hero-harsha-side.jpg ★ */}
            <div
              className="hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block"
              style={{
                opacity: loaded ? fade : 0,
                transform: loaded ? `translate3d(${dx * -0.35}px, ${dy * -0.35}px, 0)` : "translateY(30px)",
                transitionDelay: "820ms",
              }}
            >
              <div className="ml-auto w-56 xl:w-64">
                <Shot
                  slot={shots.heroSide}
                  alt="Harsha, founder, portrait at the showroom"
                  className="aspect-3/4 w-full border border-gold/20 shadow-[var(--shadow-lux)]"
                  imgClassName="transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                />
                <div className="mt-4 flex items-center justify-end gap-3">
                  <span className="h-px w-8 bg-gold/50" />
                  <p className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                    Harsha — Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
          style={{ opacity: fade }}
        >
          <span className="text-[0.6rem] tracking-[0.4em] text-muted-foreground">SCROLL</span>
          <span className="h-12 w-px bg-linear-to-b from-gold/70 to-transparent" />
        </div>
      </section>
    </>
  );
}
