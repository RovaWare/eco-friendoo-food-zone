import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Logo from "./Logo";
import Magnetic from "./ui/Magnetic";
import { NAV, SITE } from "@/data/site";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/utils/cn";

export default function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 600 && !open);
      last = y;
      let current = "home";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = n.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToId(id), open ? 350 : 0); };

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={ready ? { y: hidden ? -120 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 md:px-6 md:pt-5"
      >
        <nav className={cn("mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-6", scrolled ? "glass shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]" : "border border-transparent")} aria-label="Main navigation">
          <button onClick={() => go("home")} aria-label="Go to top" data-cursor="hover"><Logo /></button>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <button onClick={() => go(n.id)} data-cursor="hover" className={cn("relative rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors", active === n.id ? "text-ink" : "text-cream/70 hover:text-cream")}>
                  {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-ember" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{n.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Magnetic href={SITE.orderUrl} external size="md" className="!px-6 !py-3">Order Now</Magnetic>
            </div>
            <button onClick={() => setOpen((o) => !o)} className="relative flex h-11 w-11 items-center justify-center rounded-full glass lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
              <span className={cn("absolute h-[2px] w-5 bg-gold transition-all duration-300", open ? "rotate-45" : "-translate-y-1.5")} />
              <span className={cn("absolute h-[2px] w-5 bg-gold transition-all duration-300", open ? "-rotate-45" : "translate-y-1.5")} />
            </button>
          </div>
        </nav>
        <motion.div style={{ scaleX: progress }} className="mx-auto mt-2 h-[2px] max-w-7xl origin-left rounded-full bg-gradient-to-r from-gold to-ember opacity-70" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 95% 4%)" }}
            animate={{ clipPath: "circle(150% at 95% 4%)" }}
            exit={{ clipPath: "circle(0% at 95% 4%)" }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[95] flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl lg:hidden"
          >
            <div className="absolute right-[-20%] top-[20%] h-80 w-80 rounded-full bg-ember/20 blur-[100px]" />
            <ul className="space-y-2">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  <button onClick={() => go(n.id)} className={cn("font-display text-5xl uppercase sm:text-6xl", active === n.id ? "text-gold-grad" : "text-cream")}>
                    <span className="mr-4 align-top font-sans text-xs text-gold">0{i + 1}</span>{n.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-12">
              <Magnetic href={SITE.orderUrl} external size="lg">Order Now</Magnetic>
              <p className="mt-6 text-sm text-cream/50">{SITE.address}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
