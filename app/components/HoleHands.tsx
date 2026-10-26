// The rabbit hole as the hands of a clock: two ornate silhouette hands (a
// fleur-de-lis hour hand and a heart-cut minute hand) in the logo's clay lavender,
// pointing at the pictures at ten and two o'clock. The pictures around the hero ring
// are the numbers. A flat silhouette; decorative.
const FILL = "#eacdf3";
const MINUTE = "M7 -16 C12 -26 14 -44 11.5 -58 C9 -66 4.6 -68 4.6 -78 C4.6 -82 8.5 -83 8.5 -88 C8.5 -92 4.2 -92 4.2 -97 C4.2 -104 23 -114 21 -140 C20 -156 8 -166 3.2 -180 C2.4 -188 1.6 -194 1.4 -204 C-1.6 -194 -2.4 -188 -3.2 -180 C-8 -166 -20 -156 -21 -140 C-23 -114 -4.2 -104 -4.2 -97 C-4.2 -92 -8.5 -92 -8.5 -88 C-8.5 -83 -4.6 -82 -4.6 -78 C-4.6 -68 -9 -66 -11.5 -58 C-14 -44 -12 -26 -7 -16Z";
const HOUR = "M7 -16 C11 -26 11 -38 7 -48 C4.6 -54 3.6 -58 3.8 -66 C4 -74 12 -76 11 -92 C10 -104 22 -108 20 -128 C19 -142 8 -150 3 -164 C2.4 -171 1.6 -176 1.4 -186 C-1.6 -176 -2.4 -171 -3 -164 C-8 -150 -19 -142 -20 -128 C-22 -108 -10 -104 -11 -92 C-12 -76 -4 -74 -3.8 -66 C-3.6 -58 -4.6 -54 -7 -48 C-11 -38 -11 -26 -7 -16Z";
const BULB_HOLE = "M0 -111 C9 -120 12 -134 8.5 -148 C6.5 -155 2.2 -161 0 -171 C-2.2 -161 -6.5 -155 -8.5 -148 C-12 -134 -9 -120 0 -111Z";
const LEAF_HOLE = "M0 -96 C8 -104 11 -118 8 -130 C6 -137 2 -143 0 -153 C-2 -143 -6 -137 -8 -130 C-11 -118 -8 -104 0 -96Z";
const CURL = "M3 -60 C14 -64 30 -64 34 -52 C37 -43 28 -36 22 -41 C17 -45 21 -50 25 -48 C23 -52 16 -54 9 -50Z";

export default function HoleHands({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 400" className={className}>
      <defs>
        <mask id="hand-minute" maskUnits="userSpaceOnUse" x="-100" y="-210" width="200" height="270">
          <rect x="-100" y="-210" width="200" height="270" fill="white" />
          <g fill="black">
            <circle cx="0" cy="0" r="7" />
            <path d={BULB_HOLE} />
            <path d="M0 4 C-5 0.5 -5 -3.5 -2.4 -3.8 C-1.2 -3.9 -0.3 -3.2 0 -2.3 C0.3 -3.2 1.2 -3.9 2.4 -3.8 C5 -3.5 5 0.5 0 4Z" transform="translate(0 -37) scale(2.3)" />
            <path d="M0 -76 C-3.6 -72 -3.6 -66 0 -61 C3.6 -66 3.6 -72 0 -76Z" transform="translate(0 -1)" />
          </g>
        </mask>
        <mask id="hand-hour" maskUnits="userSpaceOnUse" x="-100" y="-210" width="200" height="270">
          <rect x="-100" y="-210" width="200" height="270" fill="white" />
          <g fill="black">
            <circle cx="0" cy="0" r="7" />
            <path d={LEAF_HOLE} />
          </g>
        </mask>
      </defs>
      <g transform="translate(200 200)" fill={FILL} stroke={FILL} strokeWidth={6} strokeLinejoin="round">
        <g transform="rotate(-51.4) scale(0.82)">
          <g mask="url(#hand-hour)">
            <circle cx="0" cy="0" r="22" />
            <path d={HOUR} />
            <path d={CURL} />
            <path d={CURL} transform="scale(-1 1)" />
          </g>
        </g>
        <g transform="rotate(51.4)">
          <g mask="url(#hand-minute)">
            <circle cx="0" cy="0" r="23" />
            <path d={MINUTE} />
          </g>
        </g>
        <circle cx="0" cy="0" r="11" />
      </g>
    </svg>
  );
}
