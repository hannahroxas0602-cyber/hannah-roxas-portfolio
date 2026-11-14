// A drawn arrow for "opens somewhere else". The ↗ character shows up as a colored emoji on iPhones, so use this.
export default function ArrowUpRight({ className = "size-[1em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}
