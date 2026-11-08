// A small stopwatch: for a case study's estimated reading time, and beside the time zone in the
// hero. With `ticking`, the hand sweeps round (a minute a lap, stepping like a real one).
export default function Stopwatch({ ticking = false, className = "size-4" }: { ticking?: boolean; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.5 2.6h5M12 2.6v3" />
      <path d="M18.6 6.2l1.4-1.4" />
      <circle cx="12" cy="14" r="7.6" />
      <path d="M12 7.8v1.1M12 19.1v1.1M5.8 14h1.1M17.1 14h1.1" strokeWidth={1.3} />
      <g className={ticking ? "stopwatch-hand" : undefined} style={{ transformOrigin: "12px 14px", transformBox: "view-box" }}>
        <path d="M12 14V9.6" />
      </g>
      <circle cx="12" cy="14" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
