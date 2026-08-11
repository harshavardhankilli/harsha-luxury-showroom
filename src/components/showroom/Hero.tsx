import { useEffect, useState } from "react";
import { shots } from "@/lib/media";
import { Shot } from "./primitives";
import { BookingButtons } from "./booking";

/** Cinematic opening: black → wordmark → champagne sweep → image → headline. */
function Curtain() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(3);
      return;
    }
    const t1 = setTimeout(() => setStage(1), 120);
    const t2 = setTimeout(() => setStage(2), 1500);
    const t3 = setTimeout(() => setStage(3), 2400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  if (stage === 3) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[80] flex items-center justify-center bg-onyx transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ opacity: stage === 2 ? 0 : 1 }}
    >
      <div className="relative overflow-hidden px-6 text-center">
        <p
          className="font-display text-[clamp(2rem,9vw,5rem)] tracking-[0.42em] text-ivory transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: stage >= 1 ? 1 : 0, transform: stage >= 1 ? "none" : "translateY(24%)" }}
        >
          HARSHA
        </p>
        <div
          className="mx-auto mt-5 h-px w-56 max-w-full shimmer-line transition-opacity duration-700"
          style={{ opacity: stage >= 1 ? 1 : 0 }}
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

export function Hero() {
  const [offset, setOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setLoaded(true), reduced ? 0 : 2200);
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

  return (
    <>
      <Curtain />
      <section id="top" className="vignette relative min-h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ transform: `translate3d(0, ${offset * 0.25}px, 0)` }}
        >
          <Shot
            slot={shots.heroMain}
            alt="Harsha at the showroom with a black luxury car"
            loading="eager"
            position="center 30%"
            className="h-[100svh] w-full"
            imgClassName="transition-transform duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: loaded ? "scale(1)" : "scale(1.08)" }}
          />
          {/* gradient kept low so the face stays clear */}
          <div className="absolute inset-0 bg-linear-to-t from-onyx via-onyx/25 to-onyx/45" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-end">
            <div>
              <div className="overflow-hidden">
                <p
                  className="eyebrow transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: loaded ? "none" : "translateY(120%)" }}
                >
                  Hyderabad — By Appointment
                </p>
              </div>

              <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.92] tracking-tight">
                {["The Art of", "the Automobile"].map((line, i) => (
                  <span key={line} className="block overflow-hidden">
                    <span
                      className="block transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: loaded ? "none" : "translateY(110%)",
                        transitionDelay: `${160 + i * 150}ms`,
                      }}
                    >
                      {i === 1 ? <em className="text-gradient-gold not-italic">{line}</em> : line}
                    </span>
                  </span>
                ))}
              </h1>

              <div
                className="mt-8 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "none" : "translateY(26px)",
                  transitionDelay: "620ms",
                }}
              >
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  A private showroom of exceptional machines — selected, prepared and delivered
                  personally by Harsha.
                </p>
                <BookingButtons className="mt-8" />
              </div>
            </div>

            <div
              className="hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(30px)",
                transitionDelay: "760ms",
              }}
            >
              <Shot
                slot={shots.heroSide}
                alt="Harsha, portrait at the showroom"
                className="ml-auto aspect-3/4 w-56 border border-border xl:w-64"
              />
              <p className="mt-4 text-right text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                Harsha — Founder
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="text-[0.6rem] tracking-[0.4em] text-muted-foreground">SCROLL</span>
          <span className="h-12 w-px bg-linear-to-b from-gold/70 to-transparent" />
        </div>
      </section>
    </>
  );
}
