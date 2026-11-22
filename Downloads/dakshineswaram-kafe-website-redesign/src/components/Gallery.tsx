import { useEffect, useRef } from "react";
import { Camera, MoveHorizontal } from "lucide-react";
import { GALLERY_ITEMS } from "../data";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-heading > *",
        { y: 52, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: ".gallery-heading", start: "top 78%" } }
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const amount = () => track.scrollWidth - window.innerWidth;
        const horizontalTween = gsap.to(track, {
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
          },
        });
        /* inner parallax drift per frame, driven by the horizontal tween */
        gsap.utils.toArray<HTMLElement>(".gallery-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -5 },
            {
              xPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: (img as HTMLElement).closest(".gallery-frame") as HTMLElement,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 750);
    window.addEventListener("load", () => ScrollTrigger.refresh());
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-hidden bg-ink py-16 text-ivory lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-0">
      {/* heading */}
      <div className="gallery-heading mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6 lg:px-8 lg:pt-6">
        <div>
          <p className="flex items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.42em] text-gold">
            <Camera size={16} strokeWidth={2} /> Food Gallery
            <span className="h-px w-14 bg-gold/55" />
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,5vw,3.3rem)] font-semibold leading-[1.02] tracking-tight">
            Every Plate,<br />A <span className="italic text-gold-soft">Frame Worth</span> Savouring
          </h2>
        </div>
        <p className="hidden items-center gap-3 pb-2 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-ivory/45 sm:flex">
          <MoveHorizontal size={16} /> Drag · Scroll · Wander
        </p>
      </div>

      {/* desktop: pinned scrub strip */}
      <div ref={trackRef} className="mt-10 hidden w-max gap-6 px-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-40 will-change-transform lg:flex">
        {GALLERY_ITEMS.map((item, i) => (
          <figure
            key={i}
            className="gallery-frame group relative h-[64vh] w-[30vw] max-w-[460px] shrink-0 overflow-hidden rounded-[1.5rem] border border-ivory/10"
          >
            <img
              src={item.src}
              alt={item.caption}
              loading="lazy"
              className="gallery-img img-warm absolute inset-[-6%] h-[112%] w-[112%] object-cover transition-[filter] duration-700 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/15 to-transparent" />
            <span className="absolute right-5 top-4 font-display text-5xl font-black text-ivory/12 transition-colors duration-700 group-hover:text-gold/35">
              {String(i + 1).padStart(2, "0")}
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-2xl font-semibold leading-tight text-ivory">{item.caption}</p>
              <p className="mt-1.5 translate-y-2 text-[0.62rem] font-extrabold uppercase tracking-[0.3em] text-gold-soft opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.sub}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* mobile/tablet: native swipe */}
      <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:hidden">
        {GALLERY_ITEMS.map((item, i) => (
          <figure key={i} className="relative h-[420px] w-[78vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-ivory/10 sm:w-[55vw]">
            <img src={item.src} alt={item.caption} loading="lazy" className="img-warm absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/15 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-xl font-semibold text-ivory">{item.caption}</p>
              <p className="mt-1 text-[0.58rem] font-extrabold uppercase tracking-[0.3em] text-gold-soft">{item.sub}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-2 hidden text-center text-[0.58rem] font-bold uppercase tracking-[0.4em] text-ivory/35 lg:block">Photographed in our kitchens · No filters, only fire</p>
    </section>
  );
}
