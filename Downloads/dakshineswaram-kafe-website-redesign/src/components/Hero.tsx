import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Flame, Leaf, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { scrollToSection } from "../lib/lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { MARQUEE_ITEMS } from "../data";

const HEADLINE = ["Authentic", "South", "Indian", "Flavours"];

export default function Hero({ start }: { start: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ------- entrance choreography, fires once loader hands over ------- */
  useEffect(() => {
    if (!start) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(bgRef.current, { scale: 0.86, opacity: 0.4, filter: "brightness(0.55)" }, { scale: 1, opacity: 1, filter: "brightness(1)", duration: 1.7, ease: "power3.out" })
        .fromTo(".hero-eyebrow", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, "-=1.15")
        .fromTo(".hero-word", { yPercent: 118, rotate: 5 }, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.085 }, "-=1.0")
        .fromTo(".hero-sub", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
        .fromTo(".hero-cta", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, "-=0.5")
        .fromTo(".hero-badge", { scale: 0, opacity: 0, rotate: -30 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.1, ease: "elastic.out(1, 0.5)" }, "-=0.9")
        .fromTo(".hero-meta > *", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, "-=0.7");

      /* scroll-driven parallax + fade */
      gsap.to(bgRef.current, {
        yPercent: 16,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(contentRef.current, {
        yPercent: -14,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "85% top", scrub: 1 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [start]);

  useEffect(() => {
    /* recalc trigger positions after fonts/images settle */
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    window.addEventListener("load", () => ScrollTrigger.refresh());
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      {/* ======= background photography ======= */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src="/images/hero-dosa.jpg"
          alt="Crispy masala dosa with sambar and chutneys at Dakshineswaram Kafe"
          className="img-warm h-full w-full object-cover object-[62%_38%] sm:object-[70%_center]"
          draggable={false}
        />
        {/* cinematic grade: left scrim, bottom vignette, warm bloom */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-ink/5 sm:via-ink/55 lg:via-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,transparent_35%,rgba(28,17,13,0.55)_100%)]" />
      </div>

      {/* floating ornaments */}
      <Leaf className="animate-float-soft pointer-events-none absolute left-[6%] top-[22%] hidden text-gold/35 lg:block" size={30} strokeWidth={1.4} />
      <Leaf className="animate-float-soft-2 pointer-events-none absolute bottom-[30%] right-[30%] hidden text-gold/45 lg:block" size={22} strokeWidth={1.4} style={{ animationDelay: "-2.4s" }} />
      {/* steam wisps above the plate zone */}
      <div className="pointer-events-none absolute right-[16%] top-[30%] hidden h-24 w-16 lg:block">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="steam-wisp absolute bottom-0 h-16 w-[3px] rounded-full bg-gradient-to-t from-transparent via-ivory/50 to-transparent blur-[2px]"
            style={{ left: `${18 + i * 22}px`, animationDelay: `${i * 0.75}s` }}
          />
        ))}
      </div>

      {/* ======= content ======= */}
      <div ref={contentRef} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-28 pt-20 sm:px-6 sm:pb-24 lg:px-8">
        <p className="hero-eyebrow flex items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.42em] text-gold sm:text-[0.7rem]">
          <Flame size={14} className="shrink-0" strokeWidth={2.2} />
          Pure Veg · Established 1984
          <span className="hidden h-px w-14 bg-gold/60 sm:block" />
        </p>

        <h1 className="mt-5 font-display font-semibold leading-[0.98] tracking-tight text-ivory">
          {HEADLINE.map((word, i) => (
            <span key={i} className="block overflow-hidden pb-2 pt-1 sm:inline-block sm:pb-3 sm:pr-5">
              <span className={`hero-word inline-block will-change-transform ${i === 3 ? "italic text-gold-soft" : ""} text-[clamp(2.6rem,11.5vw,6.2rem)]`}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-5 font-display text-[clamp(1.15rem,3vw,1.65rem)] font-light italic text-ivory/90">
          Tradition served with <span className="text-gold">love.</span>
        </p>
        <p className="hero-sub mt-3 max-w-md text-[0.8rem] leading-relaxed text-ivory/65 sm:text-sm">
          Batter ground at dawn, tawa kissed by flame, chutneys pounded fresh — South India,
          plated with ceremony.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <MagneticButton
            onClick={() => scrollToSection("#menu")}
            className="hero-cta group flex items-center gap-2 rounded-full bg-brand px-6 py-4 text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-ivory shadow-[0_16px_40px_-10px_rgba(178,58,43,0.9)] transition-colors hover:bg-brand-deep sm:px-8"
            ariaLabel="Explore our menu"
          >
            Explore Our Menu
            <ArrowDown size={16} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollToSection("#franchise")}
            className="hero-cta group flex items-center gap-2 rounded-full border border-ivory/35 bg-ivory/5 px-6 py-4 text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-ivory backdrop-blur-sm transition-all hover:border-gold hover:text-gold-soft sm:px-8"
            ariaLabel="Explore franchise opportunities"
          >
            Explore Franchise
            <ArrowRight size={16} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
        </div>

        {/* trust meta row */}
        <div className="hero-meta mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ivory/60 sm:text-[0.68rem]">
          <span className="flex items-center gap-2"><Sparkles size={13} className="text-gold" /> 12+ Outlets</span>
          <span className="flex items-center gap-2"><Sparkles size={13} className="text-gold" /> Fresh Batter Daily</span>
          <span className="hidden items-center gap-2 sm:flex"><Sparkles size={13} className="text-gold" /> 100% Pure Veg</span>
        </div>
      </div>

      {/* rotating circular badge */}
      <button
        onClick={() => scrollToSection("#menu")}
        aria-label="See our signatures"
        className="hero-badge absolute bottom-24 right-4 z-10 hidden h-36 w-36 md:block lg:bottom-28 lg:right-12 lg:h-40 lg:w-40"
      >
        <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
          <defs>
            <path id="circlePath" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" fill="none" />
          </defs>
          <circle cx="50" cy="50" r="49" fill="rgba(28,17,13,0.55)" stroke="rgba(212,162,78,0.4)" strokeWidth="0.75" />
          <text className="fill-ivory text-[8.1px] font-bold uppercase" style={{ letterSpacing: "2.6px" }}>
            <textPath href="#circlePath">Authentic South Indian · Est. 1984 · Dakshineswaram Kafe ·&#160;</textPath>
          </text>
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-ivory shadow-lg lg:h-16 lg:w-16">
            <Flame size={26} strokeWidth={1.8} />
          </span>
        </span>
      </button>

      {/* scroll cue */}
      <div className="absolute bottom-[4.6rem] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-ivory/40 p-1">
          <span className="animate-scroll-dot h-2 w-1 rounded-full bg-gold" />
        </div>
        <span className="text-[0.55rem] font-bold uppercase tracking-[0.4em] text-ivory/55">Scroll</span>
      </div>

      {/* ======= marquee ribbon ======= */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-y border-gold/25 bg-ink/92 py-2.5 backdrop-blur-md">
        <div className="animate-marquee flex w-max items-center whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-6 flex items-center gap-6 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-ivory/70">
              {item}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
