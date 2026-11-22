import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/scroll";
import { IMG, SITE } from "@/data/site";
import { SplitReveal, FadeUp } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(".cta-food", { scale: 0.6, rotate: -90 }, { scale: 1.25, rotate: 60, ease: "none", scrollTrigger: st });
      gsap.fromTo(".cta-burger", { y: 200, rotate: 20 }, { y: -200, rotate: -15, ease: "none", scrollTrigger: st });
      gsap.fromTo(".cta-coffee", { y: 260, rotate: -15 }, { y: -160, rotate: 10, ease: "none", scrollTrigger: st });
      gsap.fromTo(".cta-ing", { y: 300 }, { y: -300, ease: "none", stagger: 0.05, scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="order" ref={root} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,30,0.28),transparent_55%)]" />
      <div className="cta-food pointer-events-none absolute left-1/2 top-1/2 -ml-[45vmin] -mt-[45vmin] h-[90vmin] w-[90vmin] opacity-40">
        <img src={IMG.pizza} alt="" className="food-mask h-full w-full object-contain" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(7,7,7,0.85)_60%)]" />
      <img src={IMG.burger} alt="" loading="lazy" className="cta-burger food-mask pointer-events-none absolute -left-16 top-[12%] hidden w-[26vw] max-w-[380px] md:block" />
      <img src={IMG.coffee} alt="" loading="lazy" className="cta-coffee food-mask pointer-events-none absolute -right-10 bottom-[8%] hidden w-[22vw] max-w-[320px] md:block" />
      {[IMG.basil, IMG.tomato, IMG.chili, IMG.basil, IMG.tomato].map((s, i) => (
        <img key={i} src={s} alt="" loading="lazy" className="cta-ing blend-screen pointer-events-none absolute w-14 md:w-20" style={{ left: `${10 + i * 19}%`, top: `${20 + ((i * 37) % 60)}%`, filter: i % 2 ? "blur(2px)" : undefined }} />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <FadeUp y={20}><p className="mb-8 text-[11px] font-bold uppercase tracking-[0.5em] text-gold">Your table is waiting</p></FadeUp>
        <SplitReveal
          text="GOOD FOOD IS ALWAYS A GOOD IDEA."
          className="font-display text-[13vw] uppercase leading-[0.88] md:text-[8.5vw]"
          stagger={0.08}
          wordClass={(w) => (w === "GOOD" || w === "IDEA." ? "text-gold-grad" : undefined)}
        />
        <FadeUp delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl font-serif text-xl italic text-cream/80 md:text-2xl">Your next delicious experience is waiting at Eco FriendoO Food Zone.</p>
        </FadeUp>
        <FadeUp delay={0.5} className="mt-14 flex justify-center">
          <div className="relative">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/30 [animation-duration:2.5s]" />
            <span className="absolute -inset-4 rounded-full border border-gold/30 pulse-glow" />
            <Magnetic href={SITE.orderUrl} external size="xl" strength={0.5}>
              Order Now
              <svg viewBox="0 0 24 24" className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Magnetic>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
