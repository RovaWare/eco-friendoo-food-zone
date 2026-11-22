import { useEffect, useRef, useState, type MouseEvent } from "react";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { LOCATIONS, LOCATION_FILTERS, MAPS_QUERY } from "../data";
import { gsap, ScrollTrigger } from "../lib/gsap";

function LocationCard({ loc, index }: { loc: (typeof LOCATIONS)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-6px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="location-card tilt-card group relative flex h-[340px] flex-col justify-end overflow-hidden rounded-3xl border border-ink/10 bg-cocoa shadow-card"
    >
      <img
        src={loc.image}
        alt={`Dakshineswaram Kafe ambience — ${loc.city}`}
        loading="lazy"
        className="img-warm absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5 transition-opacity duration-500" />

      {/* index + state chip */}
      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-ivory/25 bg-ink/50 font-display text-xs font-bold text-gold-soft backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-ivory/20 bg-ink/50 px-3 py-1.5 text-[0.52rem] font-extrabold uppercase tracking-[0.24em] text-ivory/85 backdrop-blur">
          {loc.tag}
        </span>
      </div>

      <div className="relative p-5">
        <h3 className="font-display text-[1.45rem] font-semibold leading-tight text-ivory">{loc.city}</h3>
        <p className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.28em] text-gold-soft">{loc.area}</p>
        <p className="mt-3 flex items-start gap-2 text-[0.7rem] leading-snug text-ivory/78">
          <MapPin size={13} className="mt-0.5 shrink-0 text-gold" />
          {loc.address}
        </p>
        <a
          href={MAPS_QUERY(loc.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-ivory/12 px-4 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.22em] text-ivory ring-1 ring-ivory/25 backdrop-blur transition-all duration-300 hover:bg-gold hover:text-ink hover:ring-gold"
        >
          <Navigation size={12} strokeWidth={2.4} /> Get Directions
        </a>
      </div>
    </article>
  );
}

export default function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("All");

  const visible = LOCATIONS.filter((l) => filter === "All" || l.state === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".locations-heading > *",
        { y: 52, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: ".locations-heading", start: "top 78%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* re-stagger cards whenever the filter changes */
  useEffect(() => {
    gsap.fromTo(
      ".location-card",
      { y: 46, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.055, ease: "power3.out", clearProps: "opacity" }
    );
    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => clearTimeout(t);
  }, [filter]);

  return (
    <section ref={sectionRef} id="locations" className="relative overflow-hidden bg-paper py-20 sm:py-24">
      <span aria-hidden="true" className="pointer-events-none absolute -left-6 top-10 select-none font-display text-[16vw] font-black leading-none text-brand/[0.05] lg:text-[11rem]">
        INDI
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="locations-heading flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.42em] text-brand">
              <MapPin size={16} strokeWidth={2} /> Our Locations
              <span className="h-px w-14 bg-brand/55" />
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[1.02] tracking-tight text-ink">
              Find Your Favourite<br />
              <span className="italic text-brand">Dakshineswaram Kafe</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 rounded-2xl border border-ink/10 bg-cream px-5 py-4">
            <div>
              <p className="flex items-center gap-2 text-[0.55rem] font-extrabold uppercase tracking-[0.25em] text-coffee/60"><Clock size={12} /> Open Daily</p>
              <p className="mt-1 text-sm font-bold text-ink">7:00 AM – 11:00 PM</p>
            </div>
            <span className="h-9 w-px bg-ink/15" />
            <a href="tel:+916232163621" className="group">
              <p className="flex items-center gap-2 text-[0.55rem] font-extrabold uppercase tracking-[0.25em] text-coffee/60"><Phone size={12} /> Call the Kafe</p>
              <p className="mt-1 text-sm font-bold text-brand transition-colors group-hover:text-brand-deep">+91 62321 63621</p>
            </a>
          </div>
        </div>

        {/* filter chips */}
        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
          {LOCATION_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] transition-all duration-300 ${
                filter === f
                  ? "border-brand bg-brand text-ivory shadow-[0_10px_25px_-10px_rgba(178,58,43,0.7)]"
                  : "border-ink/15 bg-ivory text-coffee/75 hover:border-brand/40 hover:text-brand"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* card grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((loc, i) => (
            <LocationCard key={loc.id} loc={loc} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-coffee/55">
          {visible.length} {visible.length === 1 ? "Outlet" : "Outlets"} {filter === "All" ? "across 5 states" : `in ${filter}`} · More opening soon
        </p>
      </div>
    </section>
  );
}
