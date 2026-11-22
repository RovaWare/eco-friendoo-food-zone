import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/scroll";
import { IMG, SHOWCASE, SITE } from "@/data/site";
import Magnetic from "./ui/Magnetic";

const FLOATERS = [IMG.basil, IMG.tomato, IMG.chili];

export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const n = SHOWCASE.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".sc-panel");
      const horizontal = gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (track.current!.scrollWidth - window.innerWidth) * 1.1,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.3, max: 0.8 }, ease: "power2.inOut", delay: 0.05 },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setIndex(Math.round(self.progress * (n - 1)));
            gsap.set(".sc-progress", { scaleX: self.progress });
          },
        },
      });

      panels.forEach((panel, i) => {
        const img = panel.querySelector(".sc-img");
        const words = panel.querySelectorAll(".sc-char");
        const bgWord = panel.querySelector(".sc-bgword");
        const floaters = panel.querySelectorAll(".sc-float");
        const meta = panel.querySelectorAll(".sc-meta");
        const ca = { containerAnimation: horizontal, trigger: panel };

        // continuous parallax through each panel
        gsap.fromTo(img, { rotate: -70, scale: 0.65, xPercent: 30 }, { rotate: 40, scale: 1.05, xPercent: -20, ease: "none", scrollTrigger: { ...ca, start: "left right", end: "right left", scrub: true } });
        gsap.fromTo(bgWord, { xPercent: 30 }, { xPercent: -30, ease: "none", scrollTrigger: { ...ca, start: "left right", end: "right left", scrub: true } });
        floaters.forEach((f, j) => gsap.fromTo(f, { x: 200 * (j + 1) }, { x: -200 * (j + 1), ease: "none", scrollTrigger: { ...ca, start: "left right", end: "right left", scrub: true } }));

        if (i === 0) return; // first panel already visible
        gsap.from(words, { yPercent: 120, rotateX: -90, opacity: 0, stagger: 0.03, duration: 1, ease: "expo.out", scrollTrigger: { ...ca, start: "left 60%", toggleActions: "play none none reverse" } });
        gsap.from(meta, { y: 40, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power3.out", scrollTrigger: { ...ca, start: "left 55%", toggleActions: "play none none reverse" } });
      });

      // first panel entrance on vertical approach
      gsap.from(".sc-panel:first-child .sc-char", { yPercent: 120, rotateX: -90, opacity: 0, stagger: 0.03, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
      gsap.from(".sc-panel:first-child .sc-meta", { y: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 60%" } });
    }, root);
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(t); ctx.revert(); };
  }, [n]);

  return (
    <section id="showcase" ref={root} className="relative h-[100svh] overflow-hidden bg-ink" aria-label="Signature dishes showcase">
      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-30 mx-auto flex max-w-7xl items-start justify-between px-6 md:top-28 md:px-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-gold">Signature Showcase</p>
          <p className="mt-2 font-serif text-sm italic text-cream/50">Scroll to taste the story</p>
        </div>
        <p className="font-display text-2xl tabular-nums md:text-4xl">
          <span className="text-gold">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-cream/30"> / {String(n).padStart(2, "0")}</span>
        </p>
      </div>
      <div className="absolute inset-x-6 bottom-8 z-30 mx-auto h-px max-w-7xl bg-white/10 md:inset-x-10">
        <div className="sc-progress h-full origin-left scale-x-0 bg-gradient-to-r from-gold to-ember" />
      </div>

      <div ref={track} className="flex h-full w-max">
        {SHOWCASE.map((s, i) => (
          <article key={s.name} className="sc-panel relative flex h-full w-screen items-center overflow-hidden">
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 55%, ${s.accent}33, transparent 55%), radial-gradient(circle at 10% 90%, ${s.accent}14, transparent 40%)` }} />
            <div className="sc-bgword pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[30vw] uppercase leading-none text-outline opacity-50">{s.name}</div>

            {FLOATERS.map((f, j) => (
              <img key={j} src={f} alt="" className="sc-float blend-screen float-y pointer-events-none absolute w-16 md:w-24" style={{ top: `${18 + j * 28}%`, left: `${55 + j * 12}%`, animationDelay: `${-j * 2}s`, filter: j === 1 ? "blur(2px)" : undefined }} />
            ))}

            <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-4 px-6 md:grid-cols-2 md:px-10">
              <div className="order-2 md:order-1">
                <p className="sc-meta mb-4 text-xs font-bold uppercase tracking-[0.4em]" style={{ color: s.accent }}>0{i + 1} — {s.kicker}</p>
                <h3 className="font-display text-[15vw] uppercase leading-[0.85] md:text-[7.5vw] [perspective:600px]">
                  {s.name.split(" ").map((w, wi) => (
                    <span key={wi} className="block overflow-hidden">
                      {w.split("").map((c, ci) => <span key={ci} className="sc-char inline-block origin-bottom">{c}</span>)}
                    </span>
                  ))}
                </h3>
                <p className="sc-meta mt-5 max-w-md text-base text-cream/70 md:text-lg">{s.desc}</p>
                <div className="sc-meta mt-8 flex items-center gap-4">
                  <Magnetic href={SITE.orderUrl} external>Order Now</Magnetic>
                  <span className="text-xs uppercase tracking-[0.3em] text-cream/40">{SITE.priceRange}</span>
                </div>
              </div>
              <div className="relative order-1 flex justify-center md:order-2">
                <div className="pulse-glow absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: `${s.accent}55` }} />
                <img src={s.img} alt={s.name} loading="lazy" className="sc-img food-mask relative aspect-square w-[min(64vw,34vh)] object-cover drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)] md:w-[min(44vw,620px)]" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
