import { NAV, SITE, callHref } from "@/data/site";
import { scrollToId } from "@/lib/scroll";
import Logo from "./Logo";

const icons = {
  instagram: <path d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5h.01" />,
  facebook: <path d="M14 8h3V4h-3a4 4 0 00-4 4v2H8v4h2v7h4v-7h3l1-4h-4V8z" />,
  whatsapp: <path d="M4 20l1.3-3.9A8 8 0 1112 20a8 8 0 01-4-1.1L4 20zm5-11c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 9z" />,
  maps: <path d="M12 21s-7-6.2-7-12a7 7 0 1114 0c0 5.8-7 12-7 12zm0-9a3 3 0 100-6 3 3 0 000 6z" />,
};

export default function Footer() {
  const socials = [
    { key: "instagram", href: SITE.socials.instagram, label: "Instagram" },
    { key: "facebook", href: SITE.socials.facebook, label: "Facebook" },
    { key: "whatsapp", href: SITE.socials.whatsapp, label: "WhatsApp" },
    { key: "maps", href: SITE.mapsUrl, label: "Google Maps" },
  ].filter((s) => s.href) as { key: keyof typeof icons; href: string; label: string }[];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050505] pt-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs font-serif text-lg italic text-cream/60">Good Food. Great Mood. A little bite of happiness on Link Road, Betul.</p>
          <div className="mt-8 flex gap-3">
            {socials.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[s.key]}</svg>
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Explore</h4>
          <ul className="mt-6 space-y-3">
            {NAV.map((n) => (
              <li key={n.id}><button onClick={() => scrollToId(n.id)} className="group flex items-center gap-2 text-cream/60 transition-colors hover:text-cream"><span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />{n.label}</button></li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Visit</h4>
          <address className="mt-6 not-italic leading-relaxed text-cream/60">
            {SITE.name}<br />{SITE.addressLines[0]}<br />{SITE.addressLines[1]}
          </address>
          <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline">Get Directions →</a>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Contact</h4>
          <ul className="mt-6 space-y-3 text-cream/60">
            <li><a href={callHref()} {...(!SITE.phone ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="hover:text-cream">{SITE.phone || "Call us (see Google listing)"}</a></li>
            {SITE.email && <li><a href={`mailto:${SITE.email}`} className="hover:text-cream">{SITE.email}</a></li>}
            <li><a href={SITE.orderUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">Order Online</a></li>
            <li>{SITE.priceRange}</li>
            <li className="text-gold">★ {SITE.rating} · {SITE.reviews} reviews</li>
          </ul>
        </div>
      </div>

      <div className="mt-20 select-none overflow-hidden">
        <p className="whitespace-nowrap text-center font-display text-[17vw] uppercase leading-[0.8] text-outline">Eco FriendoO</p>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-cream/40 md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Link Road, Betul, Madhya Pradesh 460001</p>
          <button onClick={() => scrollToId("home")} className="flex items-center gap-2 uppercase tracking-[0.3em] text-gold hover:text-cream">Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}
