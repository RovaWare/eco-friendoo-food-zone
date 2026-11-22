import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { SIGNATURE_DISHES } from "../data";
import { gsap } from "../lib/gsap";
import { scrollToSection, lenisRef } from "../lib/lenis";

export type PlateItem = { id: string; qty: number };

export default function PlateDrawer({
  open,
  plate,
  onClose,
  onRemove,
  onClear,
}: {
  open: boolean;
  plate: PlateItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
      gsap.fromTo(".plate-panel", { xPercent: 105 }, { xPercent: 0, duration: 0.55, ease: "power4.out" });
      gsap.fromTo(".plate-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.35 });
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  const rows = plate
    .map((p) => {
      const dish = SIGNATURE_DISHES.find((d) => d.id === p.id)!;
      const price = Number(dish.price.replace("₹", ""));
      return { ...p, dish, price, line: price * p.qty };
    });
  const total = rows.reduce((sum, r) => sum + r.line, 0);
  const count = rows.reduce((sum, r) => sum + r.qty, 0);

  return (
    <div className="fixed inset-0 z-[65]" role="dialog" aria-modal="true" aria-label="Your plate">
      <div className="plate-backdrop absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
      <aside className="plate-panel absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-lift">
        <div className="flex items-center justify-between border-b border-ink/10 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-ivory"><ShoppingBag size={19} /></span>
            <div>
              <p className="font-display text-xl font-semibold text-ink">Your Plate</p>
              <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.3em] text-coffee/55">{count} {count === 1 ? "item" : "items"} · Table-side tasting</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close plate" className="grid h-11 w-11 place-items-center rounded-full border border-ink/12 text-ink hover:bg-ink/5"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {rows.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={44} strokeWidth={1.2} className="text-coffee/25" />
              <p className="mt-4 font-display text-xl font-semibold text-ink">Your plate is empty</p>
              <p className="mt-1.5 max-w-[16rem] text-[0.75rem] text-coffee/65">Add a crispy dosa or a molten cheese uttapam — your tawa is waiting.</p>
              <button
                onClick={() => { onClose(); setTimeout(() => scrollToSection("#menu"), 220); }}
                className="mt-6 flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-ivory hover:bg-brand-deep"
              >
                Browse Signatures <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {rows.map(({ dish, qty, line }) => (
                <li key={dish.id} className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-ivory p-3">
                  <img src={dish.image} alt={dish.alt} className="h-20 w-20 rounded-xl object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-semibold leading-tight text-ink">{dish.name}</p>
                    <p className="mt-1 text-[0.7rem] font-bold text-coffee/60">Qty {qty} × {dish.price}</p>
                    <p className="mt-0.5 font-display text-sm font-bold text-brand">₹{line}</p>
                  </div>
                  <button onClick={() => onRemove(dish.id)} aria-label={`Remove ${dish.name}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-coffee/45 transition-colors hover:bg-brand/10 hover:text-brand">
                    <Trash2 size={18} strokeWidth={1.8} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {rows.length > 0 && (
          <div className="border-t border-ink/10 p-6">
            <div className="flex items-baseline justify-between">
              <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.35em] text-coffee/55">Estimated Total</p>
              <p className="font-display text-3xl font-black text-ink">₹{total}</p>
            </div>
            <p className="mt-1 text-[0.62rem] text-coffee/55">Pay at the outlet · No advance needed</p>
            <div className="mt-4 flex gap-3">
              <button onClick={onClear} className="rounded-xl border border-ink/15 px-5 py-3.5 text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-coffee/70 transition-colors hover:border-brand hover:text-brand">
                Clear
              </button>
              <button
                onClick={() => { onClear(); onClose(); setTimeout(() => scrollToSection("#locations"), 250); }}
                className="flex-1 rounded-xl bg-brand py-3.5 text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-brand-deep"
              >
                Visit Nearest Outlet
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
