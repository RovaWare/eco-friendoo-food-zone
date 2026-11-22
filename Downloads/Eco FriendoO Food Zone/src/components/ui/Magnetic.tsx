import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "ghost" | "dark";
  size?: "md" | "lg" | "xl";
  external?: boolean;
  ariaLabel?: string;
};

export default function Magnetic({ children, className, strength = 0.35, href, onClick, variant = "gold", size = "md", external, ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });
  const ix = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const iy = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });

  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
    ix.set(dx * strength * 0.4);
    iy.set(dy * strength * 0.4);
  };
  const onLeave = () => { x.set(0); y.set(0); ix.set(0); iy.set(0); };

  const sizes = { md: "px-7 py-3.5 text-[12px]", lg: "px-9 py-4.5 text-[13px]", xl: "px-12 py-6 text-base md:px-16 md:py-8 md:text-lg" };
  const variants = {
    gold: "bg-gradient-to-r from-gold via-[#ffc94d] to-ember text-ink shadow-[0_10px_40px_-10px_rgba(245,184,46,0.7)]",
    ghost: "glass text-cream hover:border-gold/60",
    dark: "bg-ink text-cream border border-white/10 hover:border-gold/60",
  };

  const inner = (
    <motion.span style={{ x: ix, y: iy }} className="relative z-10 flex items-center gap-3">
      {children}
    </motion.span>
  );

  const cls = cn(
    "group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full font-bold uppercase tracking-[0.22em] transition-colors duration-300",
    sizes[size], variants[variant], className
  );

  const shine = <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />;

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className="inline-block" data-cursor="hover">
      {href ? (
        <a href={href} className={cls} aria-label={ariaLabel} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {shine}{inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
          {shine}{inner}
        </button>
      )}
    </motion.div>
  );
}
