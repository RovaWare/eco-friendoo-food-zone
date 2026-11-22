import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Check, Flame } from "lucide-react";
import { lenisRef } from "./lib/lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { SIGNATURE_DISHES } from "./data";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuSection from "./components/MenuSection";
import Franchise from "./components/Franchise";
import Locations from "./components/Locations";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PlateDrawer, { type PlateItem } from "./components/PlateDrawer";

export default function App() {
  const [ready, setReady] = useState(false);
  const [plate, setPlate] = useState<PlateItem[]>([]);
  const [plateOpen, setPlateOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<number | null>(null);

  /* ---------- buttery smooth scrolling synced with ScrollTrigger ---------- */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* refresh trigger geometry after everything (incl. fonts) settles */
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 500);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ---------- plate (mini order) logic ---------- */
  const addToPlate = useCallback((dishName: string) => {
    const dish = SIGNATURE_DISHES.find((d) => d.name === dishName);
    if (!dish) return;
    setPlate((prev) => {
      const existing = prev.find((p) => p.id === dish.id);
      if (existing) return prev.map((p) => (p.id === dish.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { id: dish.id, qty: 1 }];
    });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message: `${dish.name} added to your plate` });
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const removeFromPlate = useCallback((id: string) => {
    setPlate((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearPlate = useCallback(() => setPlate([]), []);

  const plateCount = plate.reduce((sum, p) => sum + p.qty, 0);

  return (
    <div className="grain relative min-h-screen bg-ink font-sans text-ink antialiased">
      {/* cinematic intro */}
      <Loader onDone={() => setReady(true)} />

      <Navbar plateCount={plateCount} onOpenPlate={() => setPlateOpen(true)} />

      <main>
        <Hero start={ready} />
        <About />
        <MenuSection onAdd={addToPlate} />
        <Franchise />
        <Locations />
        <Gallery />
        <Contact />
      </main>

      <Footer />

      {/* plate drawer */}
      <PlateDrawer
        open={plateOpen}
        plate={plate}
        onClose={() => setPlateOpen(false)}
        onRemove={removeFromPlate}
        onClear={clearPlate}
      />

      {/* toast */}
      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className="fixed bottom-24 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border border-gold/40 bg-ink/92 py-2.5 pl-3 pr-6 shadow-lift backdrop-blur-md"
          style={{ animation: "toast-in 0.4s cubic-bezier(0.22,1,0.36,1)" }}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf/60">
            <Check size={15} strokeWidth={3} className="text-[#8be3a4]" />
          </span>
          <span className="whitespace-nowrap text-[0.72rem] font-bold tracking-wide text-ivory">{toast.message}</span>
          <Flame size={14} className="text-gold" />
          <style>{`@keyframes toast-in { from { opacity: 0; transform: translate(-50%, 18px); } to { opacity: 1; transform: translate(-50%, 0); } }`}</style>
        </div>
      )}
    </div>
  );
}
