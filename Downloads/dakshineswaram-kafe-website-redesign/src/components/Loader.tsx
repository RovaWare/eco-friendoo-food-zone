import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

/** Cinematic brand intro — monogram pulse, wordmark reveal, curtain lift. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const root = rootRef.current!;
    const letters = root.querySelectorAll(".loader-letter");
    const monogram = root.querySelector(".loader-monogram");
    const tagline = root.querySelector(".loader-tagline");
    const line = root.querySelector(".loader-line");

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => {
        setHidden(true);
        document.body.style.overflow = "";
      },
    });

    tl.fromTo(monogram, { scale: 0.4, opacity: 0, rotate: -14 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.85, ease: "elastic.out(1, 0.55)" })
      .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.inOut" }, "-=0.45")
      .fromTo(letters, { yPercent: 115, rotate: 6 }, { yPercent: 0, rotate: 0, duration: 0.65, stagger: 0.024 }, "-=0.3")
      .fromTo(tagline, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
      .to(root, { yPercent: -100, duration: 0.85, ease: "power4.inOut", delay: 0.35, onStart: () => onDone() });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  const word = "DAKSHINESWARAM".split("");

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink"
      aria-hidden="true"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute h-[34rem] w-[34rem] rounded-full bg-brand/25 blur-[140px]" />
      <div className="pointer-events-none absolute top-10 h-40 w-96 rounded-full bg-gold/10 blur-[120px]" />

      <svg viewBox="0 0 64 64" className="loader-monogram relative h-20 w-20 sm:h-24 sm:w-24">
        <circle cx="32" cy="32" r="30" fill="#b23a2b" />
        <circle cx="32" cy="32" r="29" fill="none" stroke="#d4a24e" strokeWidth="1.6" strokeDasharray="4 5" opacity="0.9" />
        <path d="M14 40c5.5 6.2 12.2 9.3 18 9.3S44.5 46.2 50 40c-4.2 1.6-8.6 2.4-13 2.4h-10C22.6 42.4 18.2 41.6 14 40Z" fill="#e7c878" />
        <path d="M32 12c3.6 5.4 8.4 7.3 8.4 13.4A8.4 8.4 0 1 1 23.6 25.4C23.6 19.3 28.4 17.4 32 12Z" fill="#fff6e0" />
        <path d="M32 18.5c2.2 3.4 4.9 4.8 4.9 8.7a4.9 4.9 0 1 1-9.8 0c0-3.9 2.7-5.3 4.9-8.7Z" fill="#d4a24e" />
      </svg>

      <div className="loader-line mt-6 h-px w-24 origin-center bg-gold/70" />

      <h1 className="mt-4 flex overflow-hidden font-display text-[clamp(1.05rem,4.6vw,1.9rem)] font-semibold tracking-[0.34em] text-ivory">
        {word.map((ch, i) => (
          <span key={i} className="loader-letter inline-block">
            {ch}
          </span>
        ))}
      </h1>
      <p className="loader-tagline mt-3 text-[0.65rem] font-bold uppercase tracking-[0.5em] text-gold">
        Kafe · Since 1984
      </p>
    </div>
  );
}
