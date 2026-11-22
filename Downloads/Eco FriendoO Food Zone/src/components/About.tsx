import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/scroll";
import { IMG, SITE } from "@/data/site";
import { Eyebrow, FadeUp, SplitReveal } from "./ui/Reveal";

const STATS = [
  { value: SITE.rating, decimals: 1, suffix: "/5", label: "Google Rating" },
  { value: SITE.reviews, decimals: 0, suffix: "+", label: "Happy Reviews" },
  { value: 200, decimals: 0, prefix: "₹1–₹", label: "Per Person" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // cinematic clip + zoom reveal
      gsap.fromTo(".ab-main", { clipPath: "inset(30% 20% 30% 20% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "power2.out", scrollTrigger: { trigger: ".ab-main", start: "top 90%", end: "top 30%", scrub: 1 } });
      gsap.fromTo(".ab-main img", { scale: 1.5 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".ab-main", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".ab-float", { y: 120, rotate: -40 }, { y: -120, rotate: 30, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".ab-float2", { y: -60 }, { y: 140, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });

      gsap.utils.toArray<HTMLElement>(".ab-count").forEach((el) => {
        const end = Number(el.dataset.value);
        const dec = Number(el.dataset.dec);
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-ember/10 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="ab-main relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
            <img src={IMG.interior} alt="Warm and welcoming ambience at Eco FriendoO Food Zone" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="glass absolute bottom-6 left-6 right-6 rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Find us at</p>
              <p className="mt-1 font-serif text-lg">{SITE.addressLines[0]}, MP</p>
            </div>
          </div>
          <div className="ab-float absolute -right-6 -top-10 w-40 md:-right-14 md:w-56">
            <img src={IMG.burger} alt="" className="food-mask w-full drop-shadow-2xl" loading="lazy" />
          </div>
          <img src={IMG.basil} alt="" className="ab-float2 blend-screen absolute -left-8 bottom-24 w-20 md:w-28" loading="lazy" />
          {/* rotating badge */}
          <div className="absolute -bottom-10 -right-4 h-32 w-32 md:-right-10 md:h-40 md:w-40">
            <svg viewBox="0 0 200 200" className="spin-slow h-full w-full">
              <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <circle cx="100" cy="100" r="98" fill="#0d0d0d" stroke="rgba(245,184,46,0.4)" />
              <text fill="#f5b82e" fontSize="15" fontWeight="700" letterSpacing="5"><textPath href="#circ">GOOD FOOD · GREAT MOOD · BETUL · </textPath></text>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-gold-grad">EF</span>
          </div>
        </div>

        <div>
          <Eyebrow>About our food zone</Eyebrow>
          <SplitReveal
            text="MORE THAN JUST FOOD. IT'S AN EXPERIENCE."
            className="font-display text-5xl uppercase leading-[0.95] md:text-7xl"
            wordClass={(w) => (["IT'S", "AN", "EXPERIENCE."].includes(w) ? "text-gold-grad" : undefined)}
          />
          <FadeUp delay={0.2}>
            <p className="mt-8 text-lg leading-relaxed text-cream/70 md:text-xl">
              Welcome to <span className="font-semibold text-cream">Eco FriendoO Food Zone</span>, your destination for delicious food, great taste and memorable moments in Betul. Come enjoy good food, refreshing moments and a welcoming atmosphere.
            </p>
          </FadeUp>
          <div className="mt-12 grid grid-cols-3 gap-3 md:gap-5">
            {STATS.map((s, i) => (
              <FadeUp key={s.label} delay={0.15 * i} className="glass group rounded-2xl p-4 transition-colors duration-500 hover:border-gold/40 md:p-6">
                <p className="font-display text-2xl text-gold sm:text-3xl md:text-4xl">
                  {s.prefix}<span className="ab-count" data-value={s.value} data-dec={s.decimals}>0</span>{s.suffix}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-cream/50 md:text-xs">{s.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee({ reverse }: { reverse?: boolean }) {
  const items = ["Good Food", "Great Mood", "Eco FriendoO", "Food Zone", "Betul", "A Little Bite of Happiness"];
  return (
    <div className={`relative z-10 overflow-hidden border-y border-gold/20 bg-gradient-to-r from-gold via-[#ffc94d] to-ember py-4 text-ink ${reverse ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"} scale-105`}>
      <div className="marquee flex w-max" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items.map((t) => (
              <span key={t} className="flex items-center font-display text-2xl uppercase md:text-4xl">
                <span className="px-6">{t}</span><span className="text-xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
