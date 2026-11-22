import { useEffect, useRef } from "react";
import { TrendingUp, BadgeCheck, HeartHandshake, ArrowRight, Store, CheckCircle2 } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { scrollToSection } from "../lib/lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { FRANCHISE_STATS } from "../data";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "High ROI",
    stat: "18–24 mo",
    statLabel: "Typical payback window",
    desc: "A lean pure-veg model with low wastage, high repeat footfall and everyday breakfast demand — engineered for healthy, sustainable margins.",
  },
  {
    icon: BadgeCheck,
    title: "Established Brand",
    stat: "Est. 1984",
    statLabel: "Four decades of trust",
    desc: "Inherit a name India already loves — four decades of recipes, rituals and recognition that turn first-time visitors into loyal regulars.",
  },
  {
    icon: HeartHandshake,
    title: "Comprehensive Support",
    stat: "360°",
    statLabel: "From site to stove",
    desc: "Site selection, kitchen setup, staff training, SOPs, marketing launch and continuous quality audits — we handhold you at every step.",
  },
];

export default function Franchise() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".franchise-reveal",
        { y: 56, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: ".franchise-copy", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".franchise-card",
        { y: 90, opacity: 0, rotateX: -22 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.15, ease: "power4.out",
          scrollTrigger: { trigger: ".franchise-grid", start: "top 82%" },
        }
      );
      /* giant ghost word drift */
      gsap.fromTo(
        ".franchise-ghost",
        { xPercent: 8 },
        { xPercent: -8, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 } }
      );
      /* animated counters */
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.target || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={sectionRef} id="franchise" className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-deep to-brand-dark py-20 text-ivory sm:py-28">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-70" />
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-ink/40 blur-[130px]" />
      {/* ghost typography */}
      <span aria-hidden="true" className="franchise-ghost pointer-events-none absolute bottom-2 left-0 select-none whitespace-nowrap font-display text-[19vw] font-black leading-none text-ivory/[0.05]">
        GROW WITH US
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== heading row ===== */}
        <div className="franchise-copy grid items-end gap-8 lg:grid-cols-2">
          <div>
            <p className="franchise-reveal flex items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.42em] text-gold-soft">
              <Store size={16} strokeWidth={2} /> Franchise Opportunity
              <span className="h-px w-14 bg-gold-soft/60" />
            </p>
            <h2 className="franchise-reveal mt-4 font-display text-[clamp(2.1rem,6vw,4rem)] font-semibold leading-[1.0] tracking-tight">
              Grow With<br />
              <span className="italic text-gold-soft">Dakshineswaram Kafe</span>
            </h2>
          </div>
          <div className="franchise-reveal lg:justify-self-end lg:text-right">
            <p className="font-display text-xl font-light italic text-ivory/90">“Become part of our growing success story.”</p>
            <p className="mt-3 max-w-md text-[0.8rem] leading-relaxed text-ivory/70 lg:ml-auto">
              Join a high-demand, pure-vegetarian breakfast brand with four decades of recipes,
              a proven operating system and a partner team obsessed with your success.
            </p>
          </div>
        </div>

        {/* ===== stats bar ===== */}
        <div className="franchise-reveal mt-12 grid grid-cols-2 divide-x divide-ivory/15 rounded-2xl border border-ivory/15 bg-ink/25 backdrop-blur-md sm:grid-cols-4">
          {FRANCHISE_STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-3 py-6 text-center">
              <p className="font-display text-3xl font-black text-ivory sm:text-4xl">
                <span className="stat-num" data-target={s.value}>0</span>
                <span className="text-gold-soft">{s.suffix}</span>
              </p>
              <p className="mt-1.5 text-[0.52rem] font-extrabold uppercase tracking-[0.22em] text-ivory/65 sm:text-[0.58rem]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ===== feature cards ===== */}
        <div className="franchise-grid mt-10 grid gap-5 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, stat, statLabel, desc }) => (
            <div
              key={title}
              className="franchise-card group relative overflow-hidden rounded-3xl border border-ivory/15 bg-gradient-to-b from-ivory/12 to-ivory/5 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-gold/45 hover:bg-ink/35 hover:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover:bg-gold/20" />
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ivory text-brand transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Icon size={26} strokeWidth={1.9} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-4 font-display text-4xl font-black text-gold-soft">{stat}</p>
              <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.24em] text-ivory/60">{statLabel}</p>
              <p className="mt-4 text-[0.8rem] leading-relaxed text-ivory/78">{desc}</p>
            </div>
          ))}
        </div>

        {/* ===== CTA row ===== */}
        <div className="franchise-reveal mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-gold/30 bg-ink/35 p-6 backdrop-blur-md sm:p-8 lg:flex-row">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 shrink-0 text-gold-soft" size={26} strokeWidth={1.8} />
            <div>
              <p className="font-display text-lg font-semibold text-ivory">Zero prior restaurant experience required</p>
              <p className="text-[0.72rem] text-ivory/65">Complete training · Recipes & SOPs · Launch marketing · Supply chain onboarding</p>
            </div>
          </div>
          <MagneticButton
            onClick={() => scrollToSection("#contact")}
            className="group flex shrink-0 items-center gap-3 rounded-full bg-gold px-7 py-4 text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-ink shadow-[0_16px_40px_-12px_rgba(212,162,78,0.7)] transition-colors hover:bg-gold-soft"
            ariaLabel="Explore franchise opportunities"
          >
            Explore Franchise Opportunities
            <ArrowRight size={16} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
