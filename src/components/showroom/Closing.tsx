import { media } from "@/lib/media";
import { Reveal } from "./primitives";

export function TestDrive() {
  return (
    <section id="test-drive" className="vignette relative overflow-hidden">
      <img
        src={media.suv}
        alt=""
        aria-hidden
        loading="lazy"
        width={1280}
        height={960}
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-linear-to-b from-onyx via-onyx/70 to-onyx" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-32 text-center md:px-10 md:py-44">
        <Reveal>
          <p className="eyebrow">Private Appointment</p>
          <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">
            Drive it before
            <br />
            <em className="text-gradient-gold not-italic">you decide anything</em>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            One car, one hour, one route of your choosing. No sales floor, no queue — the showroom
            is yours for the appointment.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              aria-label="Your email"
              className="min-w-0 flex-1 border border-input bg-transparent px-5 py-4 text-sm text-ivory placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 border border-gold/60 bg-gold/10 px-8 py-4 text-xs uppercase tracking-[0.28em] text-gold-soft transition-all duration-500 hover:bg-gold hover:text-primary-foreground"
            >
              Request a Drive
            </button>
          </form>
          <p className="mt-5 text-xs tracking-widest text-muted-foreground">
            Or call +91 98000 00000 · Mon–Sat, 10:00–19:00
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 pt-20 pb-10 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight">
              HARSHA
            </p>
            <p className="mt-3 text-[0.65rem] tracking-[0.5em] text-muted-foreground">
              AUTOMOBILE SHOWROOM
            </p>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A private showroom for people who care how a car was prepared, not only how it looks
              under the lights.
            </p>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                ["Featured Collection", "#collection"],
                ["Categories", "#categories"],
                ["Technology", "#technology"],
                ["About Harsha", "#about"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="transition-colors hover:text-ivory">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Visit</p>
            <address className="mt-6 space-y-3 text-sm not-italic text-muted-foreground">
              <p>
                Showroom No. 4, Lakeside Avenue
                <br />
                Hyderabad 500034
              </p>
              <p>+91 98000 00000</p>
              <p>appointments@harshaautomobile.com</p>
            </address>
          </div>
        </div>

        <div className="mt-16 rule-gold" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Harsha Automobile Showroom</p>
          <p className="tracking-[0.3em] uppercase">Curated in India</p>
        </div>
      </div>
    </footer>
  );
}
