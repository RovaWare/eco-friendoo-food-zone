import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/scroll";
import { Eyebrow, SplitReveal } from "./ui/Reveal";

const FEATURES = [
  {
    title: "Delicious Food",
    desc: "Freshly prepared favourites — from cheesy pizzas to crispy snacks — made to satisfy every craving.",
    icon: <><path d="M6 30 L32 6 L58 30" /><path d="M10 30 C10 48 22 58 32 58 C42 58 54 48 54 30 Z" /><circle cx="24" cy="40" r="3" /><circle cx="38" cy="44" r="3" /><circle cx="34" cy="34" r="2" /></>,
  },
  {
    title: "Great Taste",
    desc: "Bold, balanced flavours our guests love — the kind of taste that brings you back again.",
    icon: <><path d="M32 6 L39 23 L58 24 L43 36 L48 55 L32 44 L16 55 L21 36 L6 24 L25 23 Z" /></>,
  },
  {
    title: "Friendly Food Experience",
    desc: "A relaxed, welcoming space on Link Road — perfect for friends, family and quick bites.",
    icon: <><path d="M32 54 C14 42 6 32 6 21 C6 13 12 7 20 7 C25 7 29 10 32 14 C35 10 39 7 44 7 C52 7 58 13 58 21 C58 32 50 42 32 54 Z" /><path d="M22 26 C24 30 28 32 32 32 C36 32 40 30 42 26" /></>,
  },
  {
    title: "Affordable Pricing",
    desc: "Big flavour without the big bill — enjoy a full meal from just ₹1 to ₹200 per person.",
    icon: <><circle cx="32" cy="32" r="26" /><path d="M22 20 H42 M22 28 H42 M28 20 C40 20 40 36 28 36 H24 L40 48" /></>,
  },
];

export default function WhyUs() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGPathElement>(".wu-icon path, .wu-icon circle").forEach((p) => {
        const len = (p as SVGGeometryElement).getTotalLength?.() ?? 300;
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", scrollTrigger: { trigger: p, start: "top 90%" } });
      });
      gsap.from(".wu-card", { y: 100, opacity: 0, scale: 0.9, duration: 1.2, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ".wu-grid", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={root} className="animated-gradient relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Why choose us</Eyebrow>
            <SplitReveal text="FOUR REASONS TO FALL IN LOVE" className="font-display text-5xl uppercase leading-[0.92] md:text-7xl" wordClass={(w) => (w === "LOVE" ? "text-gold-grad" : undefined)} />
          </div>
          <p className="max-w-md text-cream/60 lg:justify-self-end">Every visit to Eco FriendoO is about more than a meal. It's good food, good company and a good mood — all at prices that make you smile.</p>
        </div>

        <div className="wu-grid mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <article key={f.title} className="wu-card group relative overflow-hidden rounded-[28px] p-[1px]" data-cursor="hover">
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,#f5b82e_60deg,transparent_120deg)] opacity-0 transition-opacity duration-700 group-hover:opacity-100 spin-slow [animation-duration:4s]" />
              <div className="relative h-full rounded-[27px] bg-[#0e0e0e]/95 p-8 transition-transform duration-500 group-hover:-translate-y-1">
                <span className="absolute right-6 top-6 font-display text-5xl text-white/[0.05] transition-colors duration-500 group-hover:text-gold/20">0{i + 1}</span>
                <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-gold/10 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:bg-gold/30" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/15 to-transparent transition-transform duration-700 group-hover:rotate-[360deg]">
                    <svg viewBox="0 0 64 64" className="wu-icon h-10 w-10" fill="none" stroke="#f5b82e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/55">{f.desc}</p>
                <div className="mt-8 h-px w-12 bg-gradient-to-r from-gold to-transparent transition-all duration-700 group-hover:w-full" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
