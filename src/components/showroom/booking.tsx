import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Intent = "test-drive" | "private-viewing";

type BookingCtx = {
  open: (intent?: Intent, vehicle?: string) => void;
};

const Ctx = createContext<BookingCtx>({ open: () => {} });

export function useBooking() {
  return useContext(Ctx);
}

const vehicles = [
  "Maybach S-Class",
  "Porsche Panamera",
  "Range Rover Autobiography",
  "BMW XM",
  "Audi A8",
  "BMW 7 Series",
  "Undecided — advise me",
];

const fieldClass =
  "w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none";
const labelClass = "block text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground";

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [intent, setIntent] = useState<Intent>("test-drive");
  const [vehicle, setVehicle] = useState(vehicles[0]!);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  const open = useCallback((next: Intent = "test-drive", car?: string) => {
    setIntent(next);
    if (car) setVehicle(car);
    setSent(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={value}>
      {children}

      <div
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-[90] transition-opacity duration-500",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-onyx/85 backdrop-blur-sm" onClick={close} />

        <div className="relative flex h-full items-start justify-center overflow-y-auto px-4 py-10 md:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={intent === "test-drive" ? "Book a test drive" : "Request a private viewing"}
            className={cn(
              "relative w-full max-w-2xl border border-border bg-charcoal/95 p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-10",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <div className="absolute inset-x-0 top-0 h-px shimmer-line" />
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-ivory"
            >
              Close
            </button>

            {sent ? (
              <div className="py-10 text-center">
                <span className="eyebrow">Request received</span>
                <h3 className="mt-6 font-display text-[clamp(2rem,5vw,3.25rem)] leading-none">
                  Thank you{name ? `, ${name.split(" ")[0]}` : ""}
                </h3>
                <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Your {intent === "test-drive" ? "test drive" : "private viewing"} request for the{" "}
                  <span className="text-gold-soft">{vehicle}</span> is with us. Harsha's office will
                  confirm your slot personally within one working day.
                </p>
                <button
                  onClick={close}
                  className="mt-9 border border-gold/50 bg-gold/5 px-8 py-4 text-xs uppercase tracking-[0.28em] text-gold-soft transition-all duration-500 hover:bg-gold hover:text-primary-foreground"
                >
                  Back to the showroom
                </button>
              </div>
            ) : (
              <>
                <span className="eyebrow">By appointment</span>
                <h3 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-none">
                  {intent === "test-drive" ? "Book a Test Drive" : "Request a Private Viewing"}
                </h3>

                <div className="mt-6 flex gap-2">
                  {(
                    [
                      ["test-drive", "Test Drive"],
                      ["private-viewing", "Private Viewing"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setIntent(key)}
                      className={cn(
                        "border px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] transition-colors duration-400",
                        intent === key
                          ? "border-gold/60 bg-gold/10 text-gold-soft"
                          : "border-border text-muted-foreground hover:text-ivory",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="mt-8 grid gap-5 sm:grid-cols-2"
                >
                  <div className="sm:col-span-1">
                    <label className={labelClass} htmlFor="bk-name">
                      Full Name
                    </label>
                    <input
                      id="bk-name"
                      required
                      maxLength={100}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={cn(fieldClass, "mt-2")}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="bk-phone">
                      Phone
                    </label>
                    <input
                      id="bk-phone"
                      required
                      type="tel"
                      maxLength={20}
                      className={cn(fieldClass, "mt-2")}
                      placeholder="+91"
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="bk-email">
                      Email
                    </label>
                    <input
                      id="bk-email"
                      required
                      type="email"
                      maxLength={255}
                      className={cn(fieldClass, "mt-2")}
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="bk-vehicle">
                      Vehicle
                    </label>
                    <select
                      id="bk-vehicle"
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      className={cn(fieldClass, "mt-2 appearance-none")}
                    >
                      {vehicles.map((v) => (
                        <option key={v} value={v} className="bg-charcoal">
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="bk-date">
                      Preferred Date
                    </label>
                    <input id="bk-date" required type="date" className={cn(fieldClass, "mt-2")} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="bk-time">
                      Preferred Time
                    </label>
                    <input id="bk-time" required type="time" className={cn(fieldClass, "mt-2")} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="bk-message">
                      Message
                    </label>
                    <textarea
                      id="bk-message"
                      rows={3}
                      maxLength={1000}
                      className={cn(fieldClass, "mt-2 resize-none")}
                      placeholder="Anything we should prepare in advance"
                    />
                  </div>

                  <button
                    type="submit"
                    className="sm:col-span-2 border border-gold/60 bg-gold/10 px-8 py-4 text-xs uppercase tracking-[0.28em] text-gold-soft transition-all duration-500 hover:bg-gold hover:text-primary-foreground"
                  >
                    {intent === "test-drive" ? "Request the Drive" : "Request the Viewing"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Ctx.Provider>
  );
}

export function BookingButtons({
  className,
  variant = "default",
}: {
  className?: string | undefined;
  variant?: "default" | "compact" | undefined;
}) {
  const { open } = useBooking();
  const pad = variant === "compact" ? "px-6 py-3" : "px-8 py-4";
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <button
        onClick={() => open("test-drive")}
        className={cn(
          "border border-gold/50 bg-gold/5 text-xs uppercase tracking-[0.28em] text-gold-soft transition-all duration-500 hover:bg-gold hover:text-primary-foreground",
          pad,
        )}
      >
        Book a Test Drive
      </button>
      <button
        onClick={() => open("private-viewing")}
        className={cn(
          "border border-border text-xs uppercase tracking-[0.28em] text-ivory/80 transition-all duration-500 hover:border-ivory/60 hover:text-ivory",
          pad,
        )}
      >
        Request Private Viewing
      </button>
    </div>
  );
}
