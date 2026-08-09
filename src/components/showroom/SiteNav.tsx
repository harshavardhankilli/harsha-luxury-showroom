import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Collection", href: "#collection" },
  { label: "Categories", href: "#categories" },
  { label: "Technology", href: "#technology" },
  { label: "Harsha", href: "#harsha" },
  { label: "Test Drive", href: "#test-drive" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled ? "bg-onyx/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 transition-all duration-700 md:px-10",
          scrolled ? "py-4" : "py-7",
        )}
      >
        <a href="#top" className="group flex min-w-0 flex-col">
          <span className="truncate font-display text-lg tracking-[0.28em] text-ivory md:text-xl">
            HARSHA
          </span>
          <span className="truncate text-[0.6rem] tracking-[0.5em] text-muted-foreground">
            AUTOMOBILE SHOWROOM
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-xs uppercase tracking-[0.24em] text-ivory/70 transition-colors hover:text-ivory"
            >
              {l.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#test-drive"
            className="border border-gold/40 px-6 py-3 text-xs uppercase tracking-[0.24em] text-gold-soft transition-all duration-500 hover:bg-gold hover:text-primary-foreground"
          >
            Book a Drive
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-ivory transition-transform duration-500",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-ivory transition-transform duration-500",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-onyx/95 backdrop-blur-xl transition-all duration-700 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-5 px-6 py-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-[0.24em] text-ivory/80"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
