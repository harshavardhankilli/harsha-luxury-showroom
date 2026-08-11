import { type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import type { Slot } from "@/lib/media";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number | undefined;
  className?: string | undefined;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", shown && "is-revealed", className)}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      {index ? <span className="eyebrow text-muted-foreground">{index}</span> : null}
      <span className="h-px w-10 bg-gold/50" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/** Reserved frame for photography that has not been supplied yet. */
export function ReservedPhotoSlot({
  label,
  filename,
  className,
}: {
  label: string;
  filename: string;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden border border-gold/25 bg-charcoal/60 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px shimmer-line" />
      <span className="eyebrow">Reserved</span>
      <p className="font-display text-xl text-ivory/80 md:text-2xl">{label}</p>
      <p className="max-w-xs text-[0.7rem] leading-relaxed text-muted-foreground">
        Add <code className="text-gold-soft">src/assets/{filename}</code> to place the original
        photograph here.
      </p>
    </div>
  );
}

/**
 * Renders a registry slot: the real photograph when present, the neutral stand-in for
 * car/showroom frames, otherwise a clearly named reserved slot.
 */
export function Shot({
  slot,
  alt,
  className,
  imgClassName,
  position = "center",
  style,
  loading = "lazy",
}: {
  slot: Slot;
  alt: string;
  className?: string;
  imgClassName?: string | undefined;
  position?: string | undefined;
  style?: React.CSSProperties | undefined;
  loading?: "lazy" | "eager" | undefined;
}) {
  const src = slot.src ?? slot.fallback;
  if (!src) {
    return <ReservedPhotoSlot label={slot.label} filename={slot.path} className={className} />;
  }
  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        style={{ objectPosition: position, ...style }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
