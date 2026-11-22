import { useLayoutEffect, useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "@/lib/scroll";
import { cn } from "@/utils/cn";

/** Splits text into words and reveals them line-by-line when scrolled into view (GSAP ScrollTrigger). */
export function SplitReveal({ text, as: Tag = "h2", className, delay = 0, stagger = 0.06, wordClass }: { text: string; as?: ElementType; className?: string; delay?: number; stagger?: number; wordClass?: (w: string, i: number) => string | undefined }) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.querySelectorAll(".w > span"), {
        yPercent: 120, rotate: 6, opacity: 0, duration: 1.1, ease: "expo.out", stagger, delay,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, [delay, stagger]);
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="w inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className={cn("inline-block", wordClass?.(w, i))}>{w}{i < words.length - 1 ? "\u00A0" : ""}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Fades & lifts children in when entering viewport. */
export function FadeUp({ children, className, delay = 0, y = 60 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { y, opacity: 0, filter: "blur(8px)", duration: 1.2, ease: "power3.out", delay, scrollTrigger: { trigger: ref.current, start: "top 88%" } });
    }, ref);
    return () => ctx.revert();
  }, [delay, y]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <FadeUp y={20} className={cn("mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.4em] text-gold", className)}>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
      {children}
    </FadeUp>
  );
}
