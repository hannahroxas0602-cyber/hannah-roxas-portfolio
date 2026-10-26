// The hero's picture: one rabbit diving head-first into a hole with a lavender rim, and a
// dotted arc showing the jump. A still illustration, no animation. The rabbit is the
// cursor's own sprite, so it reads as a rabbit even when small. Decorative.
export default function RabbitHole({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`rabbit-hole ${className ?? ""}`}>
      {/* The jump: a dotted arc from upper right down into the hole. */}
      <svg viewBox="0 0 200 160" className="absolute inset-0 h-full w-full -scale-x-100" fill="none">
        <path
          d="M14 22 C 52 -6, 112 8, 128 112"
          stroke="#9a8aa6"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="0.5 7"
        />
      </svg>
      <div className="hole">
        <span className="hole-rim" />
        <span className="hole-pit" />
      </div>
      <span className="rabbit" />
    </div>
  );
}
