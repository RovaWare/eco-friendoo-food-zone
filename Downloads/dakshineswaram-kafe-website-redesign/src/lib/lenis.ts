import Lenis from "lenis";

/** Shared holder so anchor links can scroll through Lenis when available. */
export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToSection(hash: string) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(el, { offset: -72, duration: 1.35 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
