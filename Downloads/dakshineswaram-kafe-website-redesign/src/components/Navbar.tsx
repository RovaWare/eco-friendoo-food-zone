import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X, ShoppingBag, Flame } from "lucide-react";
import Logo from "./Logo";
import MagneticButton from "./MagneticButton";
import { NAV_LINKS } from "../data";
import { scrollToSection, lenisRef } from "../lib/lenis";
import { gsap } from "../lib/gsap";

export default function Navbar({ plateCount, onOpenPlate }: { plateCount: number; onOpenPlate: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* animate the mobile overlay in/out */
  useEffect(() => {
    const overlay = document.querySelector(".mobile-overlay");
    if (!overlay) return;
    if (open) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
      gsap.fromTo(".mobile-overlay", { clipPath: "circle(0% at calc(100% - 44px) 40px)" }, { clipPath: "circle(150% at calc(100% - 44px) 40px)", duration: 0.7, ease: "power4.inOut" });
      gsap.fromTo(".mobile-link", { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.25, ease: "power4.out" });
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [open]);

  const go = (hash: string) => {
    setOpen(false);
    // wait for overlay to start closing, then scroll
    setTimeout(() => scrollToSection(hash), 60);
  };

  return (
    <>
      <header
        ref={barRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-paper/90 shadow-[0_10px_40px_-15px_rgba(28,17,13,0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <button onClick={() => go("#home")} aria-label="Dakshineswaram Kafe — home" className="shrink-0">
            <Logo tone={scrolled ? "dark" : "light"} />
          </button>

          {/* desktop nav */}
          <nav className="hidden items-center gap-6 xl:gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`nav-link text-[0.72rem] font-bold uppercase tracking-[0.18em] ${
                  scrolled ? "text-ink/80 hover:text-brand" : "text-ivory/85 hover:text-gold"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* plate counter */}
            <button
              onClick={onOpenPlate}
              aria-label="Open your plate"
              className={`relative grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                scrolled ? "border-ink/15 text-ink hover:bg-ink/5" : "border-ivory/20 text-ivory hover:bg-ivory/10"
              }`}
            >
              <ShoppingBag size={19} strokeWidth={1.8} />
              {plateCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-brand text-[0.6rem] font-extrabold text-ivory ring-2 ring-paper">
                  {plateCount}
                </span>
              )}
            </button>

            <MagneticButton
              onClick={() => go("#franchise")}
              className="hidden items-center gap-2 rounded-full bg-brand px-5 py-3 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-ivory shadow-[0_12px_30px_-10px_rgba(178,58,43,0.8)] transition-colors hover:bg-brand-deep md:flex"
              ariaLabel="Become a franchise partner"
            >
              <Flame size={14} strokeWidth={2.2} />
              Become a Franchise Partner
            </MagneticButton>

            {/* hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${
                scrolled ? "border-ink/15 text-ink" : "border-ivory/20 text-ivory"
              }`}
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* full-screen mobile menu */}
      <div className="mobile-overlay fixed inset-0 z-[60] flex flex-col bg-brand-dark text-ivory" style={{ display: open ? "flex" : "none", clipPath: "circle(0% at calc(100% - 44px) 40px)" }}>
        <div className="dot-pattern pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative flex h-[72px] items-center justify-between px-4 sm:px-6">
          <Logo tone="light" />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="relative flex flex-1 flex-col items-start justify-center gap-1 overflow-hidden px-8 sm:px-14">
          {NAV_LINKS.map((l, i) => (
            <div key={l.href} className="overflow-hidden">
              <button
                onClick={() => go(l.href)}
                className="mobile-link group flex items-baseline gap-4 py-2 text-left"
              >
                <span className="font-sans text-[0.65rem] font-bold tracking-[0.3em] text-gold">0{i + 1}</span>
                <span className="font-display text-[clamp(1.6rem,7.5vw,2.6rem)] font-semibold leading-tight text-ivory transition-colors duration-300 group-hover:italic group-hover:text-gold-soft">
                  {l.label}
                </span>
              </button>
            </div>
          ))}
          <p className="mobile-link mt-6 max-w-xs text-xs leading-relaxed text-ivory/70">
            405, Shekhar Central, AB Road, Manorama Ganj, Indore — 452001
            <br />
            <a href="tel:+916232163621" className="mt-2 inline-block font-bold text-ivory">+91 62321 63621</a>
          </p>
        </nav>
      </div>
    </>
  );
}
