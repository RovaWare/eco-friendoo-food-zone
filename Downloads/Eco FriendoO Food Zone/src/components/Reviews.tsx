import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/scroll";
import { REVIEWS, SITE } from "@/data/site";
import { Eyebrow, SplitReveal } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";

function Stars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <div className="relative inline-flex" aria-label={`${value} out of 5 stars`}>
      <div className="flex gap-1 text-white/15">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={size} />)}</div>
      <div className="absolute inset-0 flex gap-1 overflow-hidden text-gold" style={{ width: `${(value / 5) * 100}%` }}>
        {[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`${size} shrink-0`} />)}
      </div>
    </div>
  );
}
function Star({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>;
}

export default function Reviews() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rv-card", { y: 120, rotateX: -35, opacity: 0, duration: 1.3, stagger: 0.15, ease: "expo.out", scrollTrigger: { trigger: ".rv-grid", start: "top 85%" } });
      gsap.from(".rv-panel", { scale: 0.85, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: ".rv-panel", start: "top 85%" } });
      const o = { v: 0 };
      gsap.to(o, { v: SITE.rating, duration: 2.2, ease: "power3.out", scrollTrigger: { trigger: ".rv-panel", start: "top 85%" }, onUpdate: () => { const el = document.querySelector(".rv-num"); if (el) el.textContent = o.v.toFixed(1); } });
      gsap.to(".rv-quote", { yPercent: -30, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="reviews" ref={root} className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="rv-quote pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-serif text-[40vw] leading-none text-gold/[0.04]">“</div>
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Customer reviews</Eyebrow>
          <SplitReveal text="WHAT OUR CUSTOMERS SAY" className="font-display text-5xl uppercase leading-[0.92] md:text-8xl" wordClass={(w) => (w === "SAY" ? "text-gold-grad" : undefined)} />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_2fr]">
          <div className="rv-panel glass relative flex flex-col items-center justify-center overflow-hidden rounded-[32px] p-10 text-center">
            <div className="pulse-glow absolute -top-20 h-60 w-60 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-cream/60">
              <GoogleG /> Google Rating
            </div>
            <p className="relative mt-4 font-display text-[110px] leading-none text-gold-grad"><span className="rv-num">0.0</span></p>
            <p className="relative -mt-1 text-cream/40">out of 5</p>
            <div className="relative mt-5"><Stars value={SITE.rating} size="h-6 w-6" /></div>
            <p className="relative mt-4 text-sm text-cream/70">Based on <span className="font-bold text-cream">{SITE.reviews} Google reviews</span></p>
            <div className="relative mt-8"><Magnetic href={SITE.mapsUrl} external variant="ghost">Read on Google</Magnetic></div>
          </div>

          <div className="rv-grid grid gap-6 [perspective:1200px] md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={i}
                whileHover={{ y: -12, rotateZ: i % 2 ? 1.5 : -1.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="rv-card glass group relative flex flex-col justify-between overflow-hidden rounded-[28px] p-7 hover:border-gold/40"
                data-cursor="hover"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-ember/0 blur-2xl transition-colors duration-700 group-hover:bg-ember/30" />
                <div>
                  <div className="flex items-center justify-between">
                    <Stars value={r.stars} />
                    <span className="font-serif text-5xl leading-none text-gold/40">”</span>
                  </div>
                  <blockquote className="mt-6 font-serif text-xl italic leading-snug text-cream/90 md:text-2xl">“{r.text}”</blockquote>
                </div>
                <figcaption className="mt-10 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-ember font-bold text-ink">{String.fromCharCode(65 + i * 7)}</span>
                  <span>
                    <span className="block text-sm font-semibold">{r.author}</span>
                    <span className="flex items-center gap-1 text-[11px] text-cream/40"><GoogleG small /> via Google Reviews</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleG({ small }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={small ? "h-3 w-3" : "h-4 w-4"} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
