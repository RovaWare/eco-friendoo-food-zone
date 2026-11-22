type Props = {
  compact?: boolean;
  tone?: "dark" | "light";
};

/** Dakshineswaram Kafe brand lockup — diya flame monogram + wordmark. */
export default function Logo({ compact = false, tone = "light" }: Props) {
  const text = tone === "light" ? "text-ivory" : "text-ink";
  const sub = tone === "light" ? "text-gold" : "text-brand";

  return (
    <span className="flex items-center gap-3 select-none">
      {/* Monogram */}
      <span className="relative grid h-11 w-11 shrink-0 place-items-center">
        <svg viewBox="0 0 64 64" className="h-11 w-11" role="img" aria-label="Dakshineswaram Kafe diya monogram">
          <circle cx="32" cy="32" r="30" fill="#b23a2b" />
          <circle cx="32" cy="32" r="29" fill="none" stroke="#d4a24e" strokeWidth="2" strokeDasharray="4 5" opacity="0.9" />
          {/* diya bowl */}
          <path d="M14 40c5.5 6.2 12.2 9.3 18 9.3S44.5 46.2 50 40c-4.2 1.6-8.6 2.4-13 2.4h-10C22.6 42.4 18.2 41.6 14 40Z" fill="#e7c878" />
          {/* flame */}
          <path d="M32 12c3.6 5.4 8.4 7.3 8.4 13.4A8.4 8.4 0 1 1 23.6 25.4C23.6 19.3 28.4 17.4 32 12Z" fill="#fff6e0" />
          <path d="M32 18.5c2.2 3.4 4.9 4.8 4.9 8.7a4.9 4.9 0 1 1-9.8 0c0-3.9 2.7-5.3 4.9-8.7Z" fill="#d4a24e" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className={`block font-display text-[1.18rem] font-semibold tracking-tight ${text}`}>
            Dakshineswaram
          </span>
          <span className={`mt-1 block text-[0.6rem] font-extrabold tracking-[0.42em] uppercase ${sub}`}>
            Kafe
          </span>
        </span>
      )}
    </span>
  );
}
