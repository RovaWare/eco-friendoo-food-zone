import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import About, { Marquee } from "./components/About";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import WhyUs from "./components/WhyUs";
import Location from "./components/Location";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import { initSmoothScroll, destroySmoothScroll, startScroll, stopScroll, ScrollTrigger } from "./lib/scroll";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    initSmoothScroll();
    stopScroll();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { window.removeEventListener("load", onLoad); destroySmoothScroll(); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    startScroll();
    ScrollTrigger.refresh();
  }, [ready]);

  return (
    <div className="grain relative">
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Showcase />
        <About />
        <Menu />
        <Marquee reverse />
        <Reviews />
        <WhyUs />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
