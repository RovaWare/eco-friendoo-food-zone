import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./Logo";
import { IMG } from "@/data/site";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // preload hero visuals while counting
    [IMG.pizza, IMG.basil, IMG.tomato, IMG.chili].forEach((s) => { const i = new Image(); i.src = s; });
    const start = performance.now();
    const dur = 1900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div key="loader" className="fixed inset-0 z-[200] flex items-center justify-center" exit={{ pointerEvents: "none" }} transition={{ duration: 1.2 }}>
          {/* split curtains */}
          <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-ink" exit={{ y: "-100%" }} transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1] }} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" exit={{ y: "100%" }} transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1] }} />

          <motion.div className="relative z-10 flex flex-col items-center" exit={{ opacity: 0, scale: 1.3, filter: "blur(12px)" }} transition={{ duration: 0.6 }}>
            <div className="absolute -inset-24 rounded-full bg-gold/20 blur-[90px] pulse-glow" />
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
              <LogoMark className="h-20 w-20" />
            </motion.div>
            <div className="mt-6 overflow-hidden">
              <motion.p initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-3xl font-bold tracking-wide md:text-4xl">
                Eco Friendo<span className="text-gold-grad italic">O</span>
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="mt-2 text-[10px] font-bold uppercase tracking-[0.6em] text-gold/80">
                Food Zone · Betul
              </motion.p>
            </div>
            <div className="mt-10 h-px w-56 overflow-hidden bg-white/10">
              <div className="h-full bg-gradient-to-r from-gold to-ember transition-[width] duration-75" style={{ width: `${count}%` }} />
            </div>
            <p className="mt-4 font-display text-5xl tabular-nums text-cream/90">{String(count).padStart(3, "0")}<span className="text-gold">%</span></p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
