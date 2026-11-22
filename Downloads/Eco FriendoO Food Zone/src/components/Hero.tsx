import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/scroll";
import Magnetic from "./ui/Magnetic";
import { IMG, SITE } from "@/data/site";
import { scrollToId } from "@/lib/scroll";

const INGREDIENTS = [
  { src: IMG.basil, cls: "left-[2%] top-[8%] w-20 md:w-28", depth: 40, rot: -25 },
  { src: IMG.tomato, cls: "right-[0%] top-[4%] w-16 md:w-24", depth: 60, rot: 10 },
  { src: IMG.chili, cls: "right-[-6%] bottom-[16%] w-24 md:w-36", depth: 80, rot: 35 },
  { src: IMG.basil, cls: "left-[-6%] bottom-[10%] w-16 md:w-24", depth: 70, rot: 140 },
  { src: IMG.tomato, cls: "left-[18%] bottom-[-6%] w-10 md:w-14", depth: 100, rot: 0 },
  { src: IMG.chili, cls: "left-[10%] top-[-4%] w-14 md:w-20", depth: 90, rot: -60 },
];

function Headline({ outline }: { outline?: boolean }) {
  const base = "font-display uppercase leading-[0.82] tracking-tight text-[17vw] sm:text-[15vw] lg:text-[11.5vw]";
  return (
    <div className={`pointer-events-none flex select-none flex-col items-center ${outline ? "hero-outline" : ""}`} aria-hidden={outline}>
      <span className="reveal-line"><span className={`hl ${base} ${outline ? "text-outline [-webkit-text-stroke:1.5px_rgba(255,215,122,0.9)]" : "text-cream"}`}>Good Food.</span></span>
      <span className="reveal-line -mt-[1vw]"><span className={`hl ${base} ${outline ? "text-outline [-webkit-text-stroke:1.5px_rgba(255,215,122,0.9)]" : "text-gold-grad"}`}>Great Mood.</span></span>
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hl", { yPercent: 115 });
      gsap.set(".hero-food", { scale: 0.2, rotate: -160, opacity: 0, filter: "blur(30px)" });
      gsap.set(".ing", { opacity: 0, scale: 0 });
      gsap.set(".hero-fade", { opacity: 0, y: 40 });
      gsap.set(".hero-glow", { opacity: 0, scale: 0.4 });
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(".hero-glow", { opacity: 1, scale: 1, duration: 2 })
        .to(".hero-food", { scale: 1, rotate: 0, opacity: 1, filter: "blur(0px)", duration: 2.2 }, 0.1)
        .to(".hl", { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.35)
        .to(".ing", { opacity: 1, scale: 1, duration: 1.6, stagger: 0.08, ease: "back.out(1.7)" }, 0.8)
        .to(".hero-fade", { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, 1.1);

      // scroll-driven cinematic zoom-out
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 };
      gsap.to(".hero-zoom", { scale: 1.45, rotate: 50, yPercent: 18, ease: "none", scrollTrigger: st });
      gsap.to(".hero-text", { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(".ing-wrap", { scale: 1.8, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(".hero-bg-word", { xPercent: -25, ease: "none", scrollTrigger: st });

      // mouse 3D parallax
      if (window.matchMedia("(pointer: fine)").matches) {
        const rx = gsap.quickTo(tilt.current, "rotationX", { duration: 1, ease: "power3" });
        const ry = gsap.quickTo(tilt.current, "rotationY", { duration: 1, ease: "power3" });
        const ings = gsap.utils.toArray<HTMLElement>(".ing").map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
          d: Number(el.dataset.depth),
        }));
        const move = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rx(-ny * 18); ry(nx * 18);
          ings.forEach((i) => { i.x(nx * i.d); i.y(ny * i.d); });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
      }
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="home" ref={root} className="animated-gradient relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-10 pt-28">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,184,46,0.12),transparent_60%)]" />
        <div className="hero-bg-word absolute bottom-[6%] left-0 whitespace-nowrap font-display text-[22vw] uppercase leading-none text-outline opacity-40">Eco FriendoO · Food Zone · Eco FriendoO</div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-4">
        <p className="hero-fade mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.5em] text-gold md:text-xs">
          <span className="h-px w-8 bg-gold/60" /> Eco FriendoO Food Zone · Betul <span className="h-px w-8 bg-gold/60" />
        </p>

        {/* Layered headline + food */}
        <div className="relative flex min-h-[min(82vw,560px,56svh)] w-full items-center justify-center">
          <h1 className="hero-text relative z-10 w-full"><span className="sr-only">Good Food. Great Mood. — Eco FriendoO Food Zone, Betul</span><Headline /></h1>

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 [perspective:1200px]">
            <div className="hero-zoom">
              <div ref={tilt} className="relative h-[min(82vw,560px,56svh)] w-[min(82vw,560px,56svh)] [transform-style:preserve-3d]">
                <div className="hero-glow pulse-glow absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(255,170,40,0.55),rgba(255,122,26,0.18)_45%,transparent_70%)] blur-2xl" />
                <div className="hero-glow spin-slow absolute inset-[-6%] rounded-full border border-dashed border-gold/25" />
                <div className="hero-glow spin-slower absolute inset-[-14%] rounded-full border border-gold/10" />
                <div className="hero-food absolute inset-0">
                  <img src={IMG.pizza} alt="Cheesy stone-baked pizza at Eco FriendoO Food Zone" className="food-mask spin-slow h-full w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]" fetchPriority="high" />
                </div>
                <div className="ing-wrap absolute inset-0">
                  {INGREDIENTS.map((g, i) => (
                    <div key={i} className={`ing absolute ${g.cls}`} data-depth={g.depth}>
                      <img src={g.src} alt="" className="blend-screen float-y w-full" style={{ animationDelay: `${i * -1.1}s`, animationDuration: `${5 + i}s`, rotate: `${g.rot}deg`, filter: i > 3 ? "blur(1.5px)" : undefined }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-text absolute inset-0 z-30 flex items-center justify-center opacity-70"><div className="w-full"><Headline outline /></div></div>
        </div>

        <p className="hero-fade mt-10 max-w-xl text-center font-serif text-xl italic text-cream/85 md:mt-12 md:text-2xl">
          A Little Bite of Happiness at Eco FriendoO.
        </p>

        <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-4">
          <Magnetic size="lg" onClick={() => scrollToId("menu")}>Explore Menu <Arrow /></Magnetic>
          <Magnetic size="lg" variant="ghost" href={SITE.orderUrl} external>Order Now</Magnetic>
        </div>
      </div>

      {/* glass badges */}
      <div className="hero-fade glass absolute bottom-8 left-6 z-30 hidden items-center gap-3 rounded-2xl px-5 py-3 lg:flex">
        <span className="font-display text-3xl text-gold">{SITE.rating}</span>
        <span className="text-[11px] leading-tight text-cream/70"><span className="text-gold">★★★★☆</span><br />{SITE.reviews} Google Reviews</span>
      </div>
      <div className="hero-fade glass absolute bottom-8 right-6 z-30 hidden rounded-2xl px-5 py-3 text-right lg:block">
        <span className="block text-[10px] uppercase tracking-[0.3em] text-gold">Price Range</span>
        <span className="font-display text-xl tracking-wide">{SITE.priceRange}</span>
      </div>
      <button onClick={() => scrollToId("showcase")} className="hero-fade absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-cream/50 md:flex" aria-label="Scroll down">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/15"><span className="absolute inset-x-0 top-0 h-1/2 animate-[floatY_1.6s_ease-in-out_infinite] bg-gold" /></span>
      </button>
    </section>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}
