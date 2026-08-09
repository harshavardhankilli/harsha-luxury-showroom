import { type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
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
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden border border-gold/25 bg-charcoal/60 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px shimmer-line" />
      <span className="eyebrow">Reserved</span>
      <p className="font-display text-2xl text-ivory/80">{label}</p>
      <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
        Awaiting the original photograph — add{" "}
        <code className="text-gold-soft">{filename}</code> to replace this frame.
      </p>
    </div>
  );
}
