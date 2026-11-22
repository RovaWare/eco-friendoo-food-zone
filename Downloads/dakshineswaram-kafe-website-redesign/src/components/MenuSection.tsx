import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Plus, Star, ChefHat } from "lucide-react";
import { SIGNATURE_DISHES } from "../data";
import { scrollToSection } from "../lib/lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

type Dish = (typeof SIGNATURE_DISHES)[number];

function DishCard({ dish, i, onAdd }: { dish: Dish; i: number; onAdd: (name: string) => void }) {
  return (
    <article
      className="group relative flex w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-[1.75rem] border border-ivory/10 bg-gradient-to-b from-coffee to-cocoa shadow-card sm:w-[62vw] md:w-[430px] lg:h-[66vh] lg:w-[400px] xl:w-[440px]"
    >
      {/* tag + price row */}
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full bg-ink/65 px-4 py-2 backdrop-blur-md">
        <span className="grid h-2.5 w-2.5 place-items-center rounded-full border border-leaf bg-leaf/30">
          <span className="h-1.5 w-1.5 rounded-full bg-[#57b06b]" />
        </span>
        <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.28em] text-ivory/85">{dish.tag}</span>
      </div>
      <div className="absolute right-5 top-5 z-10 rounded-full bg-gold px-4 py-2 font-display text-base font-bold text-ink shadow-md">
        {dish.price}
      </div>

      {/* photography */}
      <div className="relative h-64 overflow-hidden sm:h-72 lg:h-auto lg:flex-1">
        <img
          src={dish.image}
          alt={dish.alt}
          loading="lazy"
          className="img-warm absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/20 to-transparent" />
        <span className="pointer-events-none absolute bottom-3 right-5 select-none font-display text-[5.5rem] font-black leading-none text-ivory/10 transition-colors duration-700 group-hover:text-gold/25">
          0{i + 1}
        </span>
      </div>

      {/* copy */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ivory">{dish.name}</h3>
        <p className="mt-2 line-clamp-3 text-[0.8rem] leading-relaxed text-ivory/65">{dish.desc}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex items-center gap-1 text-gold">
            {[...Array(5)].map((_, s) => (
              <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
            ))}
            <span className="ml-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-ivory/50">House Favourite</span>
          </div>
          <button
            onClick={() => onAdd(dish.name)}
            aria-label={`Add ${dish.name} to your plate`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-ivory transition-all duration-300 hover:rotate-90 hover:bg-gold hover:text-ink"
          >
            <Plus size={20} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MenuSection({ onAdd }: { onAdd: (name: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* heading reveal */
      gsap.fromTo(
        ".menu-heading",
        { y: 64, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } }
      );

      /* pinned horizontal scrub — desktop only */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const amount = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -amount(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + amount(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    window.addEventListener("load", () => ScrollTrigger.refresh());
    return () => clearTimeout(t);
  }, []);

  const nudge = (dir: 1 | -1) => {
    mobileTrackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="menu" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-cocoa py-16 lg:py-0">
      {/* ambient backdrop type */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-6 top-6 select-none font-display text-[17vw] font-black leading-none text-ivory/[0.04] lg:top-auto lg:bottom-10 lg:text-[13rem]">
        MENU
      </span>

      {/* heading block */}
      <div className="menu-heading mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:pt-8">
        <p className="flex items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.42em] text-gold">
          <ChefHat size={16} strokeWidth={2} /> Signature Dishes
          <span className="h-px w-14 bg-gold/50" />
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-2xl font-display text-[clamp(1.9rem,5.2vw,3.4rem)] font-semibold leading-[1.02] tracking-tight text-ivory">
            Discover Our <span className="italic text-gold-soft">Signature</span> Dishes
          </h2>
          <p className="hidden max-w-[16rem] pb-2 text-xs leading-relaxed text-ivory/55 md:block">
            Four plates that define the house — each priced with love, portioned with generosity.
          </p>
        </div>
      </div>

      {/* ============ track ============ */}
      {/* desktop: pinned scrub track */}
      <div ref={trackRef} className="mt-10 hidden w-max items-stretch gap-8 px-8 will-change-transform lg:flex lg:h-[68vh] lg:items-center lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {/* intro panel */}
        <div className="flex h-full w-[340px] shrink-0 flex-col justify-center rounded-[1.75rem] border border-gold/25 bg-gradient-to-br from-brand-deep via-brand-dark to-brand-deep p-8 dot-pattern">
          <p className="font-display text-6xl font-black leading-none text-ivory/15">01–04</p>
          <h3 className="mt-4 font-display text-3xl font-semibold leading-snug text-ivory">The<br />Signature<br /><span className="italic text-gold-soft">Edit</span></h3>
          <p className="mt-4 text-xs leading-relaxed text-ivory/75">
            Every plate here is a ritual — soaked overnight, fermented naturally, kissed by flame. Scroll sideways and take your pick.
          </p>
          <div className="mt-6 flex items-center gap-2 text-[0.6rem] font-extrabold uppercase tracking-[0.35em] text-gold">
            Scroll to explore <ArrowRight size={14} />
          </div>
        </div>
        {SIGNATURE_DISHES.map((dish, i) => (
          <DishCard key={dish.id} dish={dish} i={i} onAdd={onAdd} />
        ))}
        {/* end panel */}
        <div className="flex h-full w-[300px] shrink-0 flex-col items-start justify-center rounded-[1.75rem] border border-ivory/10 bg-coffee/60 p-8">
          <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.4em] text-gold">Hungry Yet?</p>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-ivory">Visit your nearest outlet for the full menu — 60+ dishes daily.</h3>
          <button onClick={() => scrollToSection("#locations")} className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-gold-soft transition-colors hover:bg-gold hover:text-ink">
            Find Your Kafe <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* mobile/tablet: native swipe carousel */}
      <div ref={mobileTrackRef} className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:hidden">
        {SIGNATURE_DISHES.map((dish, i) => (
          <DishCard key={dish.id} dish={dish} i={i} onAdd={onAdd} />
        ))}
      </div>

      {/* controls row */}
      <div className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:absolute lg:bottom-6 lg:left-1/2 lg:mt-0 lg:max-w-7xl lg:-translate-x-1/2 lg:px-8">
        <div className="h-[3px] w-40 overflow-hidden rounded-full bg-ivory/15 lg:w-64">
          <div ref={progressRef} className="h-full w-full origin-left scale-x-0 rounded-full bg-gold" />
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={() => nudge(-1)} aria-label="Previous dish" className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 text-ivory"><ArrowLeft size={16} /></button>
          <button onClick={() => nudge(1)} aria-label="Next dish" className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 text-ivory"><ArrowRight size={16} /></button>
        </div>
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ivory/45">Prices incl. taxes</p>
      </div>
    </section>
  );
}
