import { useEffect, useState } from "react";
import { media } from "@/lib/media";

export function Hero() {
  const [offset, setOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
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
    <section id="top" className="vignette relative h-[100svh] min-h-[640px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${offset * 0.35}px, 0)` }}
      >
        <img
          src={media.hero}
          alt="Black luxury production sedan under showroom light"
          width={1920}
          height={1088}
          className="drift h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-t from-onyx via-onyx/40 to-onyx/70" />
      </div>

      <div
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 md:px-10 md:pb-28"
        style={{ opacity: Math.max(0, 1 - offset / 620) }}
      >
        <div className="overflow-hidden">
          <p
            className="eyebrow transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: loaded ? "none" : "translateY(120%)" }}
          >
            Est. Collection — Curated Motoring
          </p>
        </div>

        <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,9vw,8rem)] leading-[0.92] tracking-tight">
          {["The Art of", "the Automobile"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="block transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: loaded ? "none" : "translateY(110%)",
                  transitionDelay: `${180 + i * 160}ms`,
                }}
              >
                {i === 1 ? <em className="text-gradient-gold not-italic">{line}</em> : line}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="mt-10 grid gap-8 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(30px)",
            transitionDelay: "700ms",
          }}
        >
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            A private showroom of exceptional machines — selected, prepared and presented with the
            precision they were engineered with.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#collection"
              className="border border-gold/50 bg-gold/5 px-8 py-4 text-xs uppercase tracking-[0.28em] text-gold-soft transition-all duration-500 hover:bg-gold hover:text-primary-foreground"
            >
              View Collection
            </a>
            <a
              href="#test-drive"
              className="border border-border px-8 py-4 text-xs uppercase tracking-[0.28em] text-ivory/80 transition-all duration-500 hover:border-ivory/60 hover:text-ivory"
            >
              Book a Drive
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[0.6rem] tracking-[0.4em] text-muted-foreground">SCROLL</span>
        <span className="h-14 w-px bg-linear-to-b from-gold/70 to-transparent" />
      </div>
    </section>
  );
}
