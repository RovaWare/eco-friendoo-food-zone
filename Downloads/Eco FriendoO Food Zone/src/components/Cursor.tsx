import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Golden cursor follower (desktop / fine pointers only). */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const rx = useSpring(x, { stiffness: 150, damping: 20 });
  const ry = useSpring(y, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[300] -ml-1 -mt-1 h-2 w-2 rounded-full bg-gold" />
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 0.9 : 0.5 }}
        className="pointer-events-none fixed left-0 top-0 z-[299] -ml-5 -mt-5 h-10 w-10 rounded-full border border-gold/70 mix-blend-difference"
      />
    </>
  );
}
