import { cn } from "@/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-10 w-10", className)} aria-hidden>
      <defs>
        <linearGradient id="lg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd77a" />
          <stop offset="0.5" stopColor="#f5b82e" />
          <stop offset="1" stopColor="#ff7a1a" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="url(#lg-gold)" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="18.5" fill="none" stroke="url(#lg-gold)" strokeWidth="0.5" strokeDasharray="1.5 2.5" />
      {/* leaf + spoon monogram */}
      <path d="M24 11c6.5 3.2 9 9 7.2 14.6-1.3 4-4.4 6.4-7.2 7.4-2.8-1-5.9-3.4-7.2-7.4C15 20 17.5 14.2 24 11z" fill="url(#lg-gold)" />
      <path d="M24 14.5v22" stroke="#070707" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M24 21l3.5-2.6M24 26l4-3M24 21l-3.5-2.6M24 26l-4-3" stroke="#070707" strokeWidth="1" strokeLinecap="round" />
      <circle cx="24" cy="38.5" r="1.4" fill="url(#lg-gold)" />
    </svg>
  );
}

export default function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="leading-none">
        <span className="block font-serif text-xl font-bold tracking-wide text-cream">
          Eco Friendo<span className="text-gold-grad italic">O</span>
        </span>
        {!compact && <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.45em] text-gold/80">Food Zone</span>}
      </span>
    </span>
  );
}
