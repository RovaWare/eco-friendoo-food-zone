import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/scroll";
import { SITE, callHref } from "@/data/site";
import { Eyebrow, FadeUp, SplitReveal } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";

export default function Location() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".loc-map", { clipPath: "inset(15% 15% 15% 15% round 40px)", scale: 0.9 }, { clipPath: "inset(0% 0% 0% 0% round 32px)", scale: 1, ease: "power2.out", scrollTrigger: { trigger: ".loc-map", start: "top 90%", end: "top 40%", scrub: 1 } });
    }, root);
    return () => ctx.revert();
  }, []);

  const info = [
    { label: "Address", value: SITE.address, icon: <path d="M12 21s-7-6.2-7-12a7 7 0 1114 0c0 5.8-7 12-7 12zm0-9a3 3 0 100-6 3 3 0 000 6z" /> },
    { label: "Category", value: SITE.category, icon: <path d="M4 8h13v5a6 6 0 01-6 6H10a6 6 0 01-6-6V8zm13 1h1.5a2.5 2.5 0 010 5H17M7 3v2m4-2v2m4-2v2" /> },
    { label: "Price Range", value: SITE.priceRange, icon: <path d="M7 5h10M7 9h10M10 5c5 0 5 8 0 8H8l8 7" /> },
    { label: "Rating", value: `${SITE.rating} ★ · ${SITE.reviews} Google reviews`, icon: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" /> },
  ];

  return (
    <section id="visit" ref={root} className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Eyebrow>Location</Eyebrow>
        <SplitReveal text="COME VISIT US" className="font-display text-6xl uppercase leading-[0.9] md:text-9xl" wordClass={(w) => (w === "US" ? "text-gold-grad" : undefined)} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <FadeUp className="glass relative flex flex-col justify-between overflow-hidden rounded-[32px] p-8 md:p-10">
            <div>
              <h3 className="font-serif text-3xl font-bold md:text-4xl">Eco Friendo<span className="italic text-gold-grad">O</span> Food Zone</h3>
              <ul className="mt-8 space-y-6">
                {info.map((it) => (
                  <li key={it.label} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#f5b82e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{it.icon}</svg>
                    </span>
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gold/80">{it.label}</span>
                      <span className="mt-1 block text-cream/80">{it.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic href={SITE.directionsUrl} external>Get Directions</Magnetic>
              <Magnetic href={callHref()} external={!SITE.phone} variant="ghost">Call Now</Magnetic>
              <Magnetic href={SITE.orderUrl} external variant="ghost">Order Online</Magnetic>
            </div>
          </FadeUp>

          <div className="loc-map relative min-h-[420px] overflow-hidden rounded-[32px] border border-gold/20 shadow-[0_0_80px_-20px_rgba(245,184,46,0.35)] lg:min-h-[560px]">
            <iframe
              title="Eco FriendoO Food Zone location on Google Maps"
              src={SITE.mapEmbed}
              className="absolute inset-0 h-full w-full [filter:grayscale(0.6)_invert(0.92)_hue-rotate(180deg)_contrast(0.9)_brightness(0.95)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-inset ring-gold/20" />
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="glass absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm">
              <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full bg-gold" /></span>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
