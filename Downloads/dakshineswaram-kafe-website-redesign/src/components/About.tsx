import { useEffect, useRef, useState } from "react";
import { X, Wheat, Flame, Leaf, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { gsap } from "../lib/gsap";
import { lenisRef } from "../lib/lenis";

const VALUES = [
  { icon: Wheat, title: "Batter Ground Daily", note: "Idli-dosa batter fermented fresh every dawn — no shortcuts, ever." },
  { icon: Flame, title: "Tawa Over Flame", note: "Cast-iron tawas kissed by real fire for that signature crisp lacey edge." },
  { icon: Leaf, title: "100% Pure Veg", note: "A fully vegetarian kitchen — wholesome, sattvic and honest." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [storyOpen, setStoryOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* clip-path image reveal */
      gsap.fromTo(
        ".story-image-wrap",
        { clipPath: "inset(6% 92% 6% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".story-image-wrap", start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".story-image",
        { scale: 1.35 },
        { scale: 1, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: ".story-image-wrap", start: "top 78%" } }
      );
      /* parallax drift on the photo while scrolling through */
      gsap.to(".story-image", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      /* text stagger */
      gsap.fromTo(
        ".story-reveal",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.11,
          ease: "power4.out",
          scrollTrigger: { trigger: ".story-copy", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".value-card",
        { y: 60, opacity: 0, rotateX: -18 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ".value-grid", start: "top 85%" },
        }
      );
      /* floating badge drift */
      gsap.fromTo(
        ".since-badge",
        { scale: 0, rotate: -20 },
        { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)", scrollTrigger: { trigger: ".story-image-wrap", start: "top 65%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* story modal lifecycle */
  useEffect(() => {
    if (!storyOpen) return;
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();
    gsap.fromTo(".story-modal", { opacity: 0 }, { opacity: 1, duration: 0.35 });
    gsap.fromTo(".story-modal-inner", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out", delay: 0.1 });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setStoryOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [storyOpen]);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      {/* decorative oversized word */}
      <span aria-hidden="true" className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[18vw] font-black leading-none text-brand/[0.06] lg:text-[13rem]">
        Kafe
      </span>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ============ left — imagery ============ */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="story-image-wrap relative overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src="/images/story.jpg"
              alt="Chef's hands spreading dosa batter on a cast-iron tawa over open flame"
              className="story-image img-warm aspect-[3/4] w-full object-cover sm:aspect-[4/5]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            {/* caption chip */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-ivory/15 bg-ink/55 px-5 py-4 backdrop-blur-md">
              <div>
                <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.35em] text-gold">The Tawa Ritual</p>
                <p className="mt-1 font-display text-sm font-medium text-ivory">Batter spread by hand, every single dawn</p>
              </div>
              <Flame className="shrink-0 text-gold" size={26} strokeWidth={1.6} />
            </div>
          </div>

          {/* floating Since badge */}
          <div className="since-badge animate-float-soft absolute -right-3 -top-6 grid h-28 w-28 place-items-center rounded-full bg-brand text-center shadow-card ring-4 ring-cream sm:-right-6 sm:h-32 sm:w-32">
            <span>
              <span className="block font-display text-2xl font-black leading-none text-ivory sm:text-3xl">1984</span>
              <span className="mt-1 block text-[0.5rem] font-extrabold uppercase tracking-[0.3em] text-gold-soft">Since</span>
            </span>
          </div>
        </div>

        {/* ============ right — copy ============ */}
        <div className="story-copy relative">
          <p className="story-reveal flex items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.42em] text-brand">
            <span className="h-px w-10 bg-brand/60" /> Our Story
          </p>
          <h2 className="story-reveal mt-4 font-display text-[clamp(2rem,5.6vw,3.6rem)] font-semibold leading-[1.02] tracking-tight text-ink">
            A Journey of <span className="italic text-brand">Authentic</span> South Indian Taste
          </h2>
          <p className="story-reveal mt-6 text-[0.95rem] leading-relaxed text-coffee/85">
            What began as one humble dosa counter in Indore has grown into a family of twelve
            kafes across India — yet nothing about our recipe has changed. Our rice and urad dal
            are soaked overnight, ground on stone, fermented naturally and ladled onto cast-iron
            tawas that have seasoned for years.
          </p>
          <p className="story-reveal mt-4 text-[0.95rem] leading-relaxed text-coffee/85">
            Every plate that leaves our kitchen carries the same quiet promise —{" "}
            <span className="font-semibold text-ink">fresh batter, real flame, honest ingredients</span> —
            and the unmistakable aroma of South India that has drawn millions back to our tables.
          </p>

          {/* values */}
          <div className="value-grid mt-8 grid gap-4 sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, note }) => (
              <div key={title} className="value-card group rounded-2xl border border-ink/10 bg-paper p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card">
                <Icon size={22} strokeWidth={1.8} className="text-brand transition-transform duration-300 group-hover:scale-110" />
                <p className="mt-2 text-[0.72rem] font-extrabold uppercase tracking-wide text-ink">{title}</p>
                <p className="mt-1 text-[0.68rem] leading-snug text-coffee/75">{note}</p>
              </div>
            ))}
          </div>

          <div className="story-reveal mt-8">
            <MagneticButton
              onClick={() => setStoryOpen(true)}
              className="group flex items-center gap-3 border-b-2 border-brand pb-2 font-display text-lg font-semibold text-ink transition-colors hover:text-brand"
              ariaLabel="Read our full story"
            >
              Read Our Story
              <ArrowRight size={20} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-2" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ============ full-screen story modal ============ */}
      {storyOpen && (
        <div className="story-modal fixed inset-0 z-[70] flex items-stretch bg-ink/85 backdrop-blur-md md:items-center md:justify-center md:p-10" role="dialog" aria-modal="true" aria-label="The Dakshineswaram story">
          <div className="story-modal-inner relative flex h-full w-full max-w-5xl flex-col overflow-hidden bg-paper md:h-auto md:max-h-[86vh] md:rounded-3xl lg:grid lg:grid-cols-5">
            <button onClick={() => setStoryOpen(false)} aria-label="Close story" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-ink/60 text-ivory backdrop-blur transition-colors hover:bg-brand">
              <X size={20} />
            </button>
            <div className="relative h-52 shrink-0 overflow-hidden sm:h-64 lg:h-auto lg:col-span-2">
              <img src="/images/thali.jpg" alt="Traditional banana leaf South Indian thali" className="img-warm absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-paper" />
            </div>
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:col-span-3">
              <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.42em] text-brand">Est. 1984 · Indore</p>
              <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">From One Tawa<br />To A Nation Of <span className="italic text-brand">Dosa Lovers</span></h3>
              <div className="mt-6 space-y-4 text-[0.9rem] leading-relaxed text-coffee/90">
                <p>In 1984, a small dosa counter opened on AB Road, Indore — one cast-iron tawa, two chutneys and a stubborn belief that South India's breakfast did not need reinvention, only respect. Long before "fusion" became fashion, our founder served the classics exactly as they were born: naturally fermented, flame-kissed and unhurried.</p>
                <p>Word travelled the way it always did in India — plate by plate, neighbour by neighbour. Office-goers lined up at dawn. Families arrived on Sundays. Students discovered the Cheese Veg Uttapam and never recovered. Every outlet we open still follows the same dosa manual: soak overnight, grind stone-fine, ferment naturally, ladle generously, fold with pride.</p>
                <p>Today Dakshineswaram Kafe is a proudly pure-vegetarian family brand with outlets across Jammu & Kashmir, Rajasthan, Gujarat, Maharashtra and Madhya Pradesh — headquartered at Shekhar Central, AB Road, Indore — and the same pot of sambar bubbling on every stove, every single morning.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-6 border-t border-ink/10 pt-6">
                {[["12+", "Outlets"], ["8", "Cities"], ["5", "States"], ["100%", "Pure Veg"]].map(([n, l]) => (
                  <div key={l}>
                    <p className="font-display text-2xl font-bold text-brand">{n}</p>
                    <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.25em] text-coffee/70">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
