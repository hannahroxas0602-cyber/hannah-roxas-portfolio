// The hero's picture: one rabbit diving head-first into an all-black hole, and a
// dotted trail streaming from its tail. A still illustration, no animation. The rabbit is the
// cursor's own sprite, so it reads as a rabbit even when small. Decorative.
export default function RabbitHole({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`rabbit-hole ${className ?? ""}`}>
      {/* The trail: dots streaming from the rabbit's tail, back up the way it came. */}
      <svg viewBox="0 0 300 300" className="rabbit-trail" fill="none">
        <path
          d="M2 298 C 18 210, 62 112, 138 64 C 184 36, 236 28, 292 38"
          stroke="#b9a7c4"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray="0.1 24"
        />
      </svg>
      <div className="hole">
        <span className="hole-pit" />
      </div>
      <span className="rabbit" />
    </div>
  );
}
