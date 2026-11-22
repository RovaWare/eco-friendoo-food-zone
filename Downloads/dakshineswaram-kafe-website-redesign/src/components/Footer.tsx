import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ArrowUp, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, CONTACT } from "../data";
import { scrollToSection } from "../lib/lenis";
import MagneticButton from "./MagneticButton";

/* Inline brand glyphs (lucide no longer ships brand icons) */
type GlyphProps = { size?: number; strokeWidth?: number };
import type { ReactElement } from "react";
const glyph = (path: ReactElement) => ({ size = 20, strokeWidth = 1.8 }: GlyphProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path}
  </svg>
);
const InstagramIcon = glyph(
  <>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
  </>
);
const FacebookIcon = glyph(<path d="M15.2 8.2h-1.6c-1 0-1.6.7-1.6 1.7v2.1h3l-.45 3h-2.55v5.5" />);
const YoutubeIcon = glyph(
  <>
    <rect x="2" y="6" width="20" height="12" rx="4" />
    <path d="M10.5 9.8v4.4l4-2.2-4-2.2Z" fill="currentColor" stroke="none" />
  </>
);
const LinkedinIcon = glyph(
  <>
    <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" />
    <path d="M7.8 10.5V17M7.8 7v.1M12.3 17v-4.2c0-1.2.9-2.1 2-2.1s2.1.9 2.1 2.1V17" />
  </>
);

const SOCIALS = [
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/dakshineswaramkafe" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/dakshineswaramkafe" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@dakshineswaramkafe" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/dakshineswaramkafe" },
];

const LEGAL_COPY = {
  terms: {
    title: "Terms of Enquiry",
    body: [
      "Dakshineswaram Kafe Pvt. Ltd., headquartered at 108-A, Shekhar Central, AB Road, Manorama Ganj, Indore, Madhya Pradesh – 452018, operates the Dakshineswaram Kafe website and its franchise enquiry programme.",
      "Franchise applications submitted through this site are expressions of interest, not binding agreements. Investment figures, payback estimates and outlet projections are indicative and vary by city, site quality and operating discipline.",
      "All recipes, brand assets, the 'Dakshineswaram' wordmark, the diya monogram and associated trade dress remain the exclusive property of Dakshineswaram Kafe Pvt. Ltd. No content may be reproduced without written consent.",
      "For the full legal terms, write to info@dakshineswaramkafe.com or call +91 89620 38794.",
    ],
  },
  privacy: {
    title: "Privacy Promise",
    body: [
      "We collect only what you voluntarily share — your name, phone number, city and investment range — and use it solely to evaluate and respond to your enquiry.",
      "We never sell your personal data. Enquiry details are stored securely and retained only as long as required for our expansion process.",
      "You may request access, correction or deletion of your data at any time by writing to info@dakshineswaramkafe.com.",
      "This website uses no invasive trackers. Analytics, where present, is aggregated and anonymised.",
    ],
  },
};

export default function Footer() {
  const [legal, setLegal] = useState<"terms" | "privacy" | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = legal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [legal]);

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      {/* top CTA strip */}
      <div className="relative border-b border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <p className="font-display text-lg text-ivory/85">Craving it already? <span className="italic text-gold-soft">Your table is waiting.</span></p>
          <MagneticButton
            onClick={() => scrollToSection("#locations")}
            className="flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-[0.62rem] font-extrabold uppercase tracking-[0.25em] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
            ariaLabel="Find nearest outlet"
          >
            Find Nearest Outlet <ArrowUpRight size={15} strokeWidth={2.2} />
          </MagneticButton>
        </div>
      </div>

      {/* main footer grid */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* brand */}
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-[0.82rem] leading-relaxed text-ivory/60">
            Authentic South Indian flavours, served with love since 1984 — twelve outlets,
            one tawa, zero compromise.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Dakshineswaram Kafe on ${label}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-ivory/15 text-ivory/75 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
              >
                <Icon size={18} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

        {/* quick links */}
        <div className="lg:col-span-2">
          <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.35em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button onClick={() => scrollToSection(l.href)} className="text-[0.8rem] font-semibold text-ivory/68 transition-colors hover:text-gold-soft">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* visit */}
        <div className="lg:col-span-3">
          <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.35em] text-gold">Head Office</p>
          <p className="mt-4 flex items-start gap-2 text-[0.78rem] leading-relaxed text-ivory/68">
            <MapPin size={15} className="mt-0.5 shrink-0 text-brand" />
            {CONTACT.registeredOffice}
          </p>
          <p className="mt-4 flex items-start gap-2 text-[0.78rem] leading-relaxed text-ivory/68">
            <Clock size={15} className="mt-0.5 shrink-0 text-brand" />
            {CONTACT.hours}
          </p>
        </div>

        {/* contact */}
        <div className="lg:col-span-3">
          <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.35em] text-gold">Talk To Us</p>
          <a href="tel:+916232163621" className="mt-4 flex items-center gap-2 text-[0.85rem] font-bold text-ivory/85 transition-colors hover:text-gold-soft">
            <Phone size={15} className="text-brand" /> +91 62321 63621
          </a>
          <a href="tel:+918962038794" className="mt-2 flex items-center gap-2 text-[0.85rem] font-bold text-ivory/85 transition-colors hover:text-gold-soft">
            <Phone size={15} className="text-brand" /> +91 89620 38794
          </a>
          <a href="mailto:info@dakshineswaramkafe.com" className="mt-2 flex items-center gap-2 break-all text-[0.85rem] font-bold text-ivory/85 transition-colors hover:text-gold-soft">
            <Mail size={15} className="shrink-0 text-brand" /> info@dakshineswaramkafe.com
          </a>
        </div>
      </div>

      {/* giant wordmark */}
      <div aria-hidden="true" className="pointer-events-none relative select-none">
        <p className="text-outline whitespace-nowrap text-center font-display text-[12.5vw] font-black leading-[0.8] tracking-tight">
          DAKSHINESWARAM
        </p>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ivory/45 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Dakshineswaram Kafe Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setLegal("terms")} className="transition-colors hover:text-gold-soft">Terms</button>
            <button onClick={() => setLegal("privacy")} className="transition-colors hover:text-gold-soft">Privacy</button>
            <p className="hidden sm:block">Indore · Mumbai · Pan-India</p>
          </div>
        </div>
      </div>

      {/* back to top */}
      <button
        onClick={() => scrollToSection("#home")}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-ivory shadow-[0_14px_35px_-8px_rgba(178,58,43,0.8)] transition-all duration-500 hover:bg-brand-deep ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <ArrowUp size={22} strokeWidth={2.2} />
      </button>

      {/* legal modal */}
      {legal && (
        <div className="fixed inset-0 z-[75] flex items-end justify-center bg-ink/80 backdrop-blur-md sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={LEGAL_COPY[legal].title}>
          <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-paper p-6 shadow-lift sm:rounded-3xl sm:p-8">
            <button onClick={() => setLegal(null)} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-ink/12 text-ink hover:bg-ink/5">
              <X size={18} />
            </button>
            <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.4em] text-brand">Dakshineswaram Kafe</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{LEGAL_COPY[legal].title}</h3>
            <div className="mt-4 space-y-3">
              {LEGAL_COPY[legal].body.map((p, i) => (
                <p key={i} className="text-[0.8rem] leading-relaxed text-coffee/85">{p}</p>
              ))}
            </div>
            <button onClick={() => setLegal(null)} className="mt-6 w-full rounded-xl bg-ink py-3.5 text-[0.65rem] font-extrabold uppercase tracking-[0.28em] text-ivory hover:bg-cocoa">
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
