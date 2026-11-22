import { useMemo, useRef, useState, type MouseEvent, type Ref } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MENU, MENU_CATEGORIES, SITE, type MenuItem } from "@/data/site";
import { Eyebrow, FadeUp, SplitReveal } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";
import { cn } from "@/utils/cn";

function Card({ item, i, ref }: { item: MenuItem; i: number; ref?: Ref<HTMLElement> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,215,122,0.22), transparent 50%)`);

  const onMove = (e: MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 80, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.85, filter: "blur(10px)", transition: { duration: 0.35 } }}
      transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="[perspective:1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
        style={{ rotateX: rX, rotateY: rY }}
        data-cursor="hover"
        className="group relative h-full overflow-hidden rounded-[28px] border border-white/8 bg-char shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-[border-color] duration-500 hover:border-gold/40"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={item.img} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-115 group-hover:rotate-2" />
          <div className="absolute inset-0 bg-gradient-to-t from-char via-char/10 to-transparent" />
          <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">{item.category}</span>
          {item.tag && <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-gold to-ember px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">{item.tag}</span>}
        </div>
        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-serif text-2xl font-bold leading-tight">{item.name}</h3>
            <span className="shrink-0 rounded-full border border-gold/30 px-3 py-1 text-right text-xs font-bold text-gold">
              {item.price != null ? `₹${item.price}` : "Ask at counter"}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-cream/60">{item.desc}</p>
          <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-cream/40">Eco FriendoO</span>
            <a href={SITE.orderUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-all group-hover:gap-3">
              Order <span aria-hidden>→</span>
            </a>
          </div>
        </div>
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glare }} />
      </motion.div>
    </motion.article>
  );
}

export default function Menu() {
  const [cat, setCat] = useState("All");
  const items = useMemo(() => (cat === "All" ? MENU : MENU.filter((m) => m.category === cat)), [cat]);
  const cats = MENU_CATEGORIES.filter((c) => c === "All" || MENU.some((m) => m.category === c));

  return (
    <section id="menu" className="animated-gradient relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute right-[-10%] top-0 h-[600px] w-[600px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Explore our menu</Eyebrow>
          <SplitReveal text="DISCOVER OUR TASTE" className="font-display text-6xl uppercase leading-[0.9] md:text-8xl lg:text-9xl" wordClass={(w) => (w === "TASTE" ? "text-gold-grad" : undefined)} />
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-xl text-cream/60">Fresh flavours, generous portions and pocket-friendly prices — <span className="text-gold">{SITE.priceRange}</span>. Ask our team for today's full menu &amp; specials.</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mt-12 flex justify-center">
          <div className="glass flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]" role="tablist" aria-label="Menu categories">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={cn("relative shrink-0 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors md:px-6", cat === c ? "text-ink" : "text-cream/60 hover:text-cream")}>
                {cat === c && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-ember" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </FadeUp>

        <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => <Card key={item.name} item={item} i={i} />)}
          </AnimatePresence>
        </motion.div>

        <FadeUp className="mt-16 flex justify-center">
          <Magnetic href={SITE.orderUrl} external size="lg">Order Your Favourites</Magnetic>
        </FadeUp>
      </div>
    </section>
  );
}
