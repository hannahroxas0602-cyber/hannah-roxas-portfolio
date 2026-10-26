// A skeleton key, lying on its side, that floats above the cursor's hover label:
// a clover bow with heart cut-outs, a collared shaft, and a toothed bit. One flat
// silhouette in the current color. Decorative.
const HEART = "M0 4 C-5 0.5 -5 -3.5 -2.4 -3.8 C-1.2 -3.9 -0.3 -3.2 0 -2.3 C0.3 -3.2 1.2 -3.9 2.4 -3.8 C5 -3.5 5 0.5 0 4Z";

export default function HoverKey({ color, className }: { color: string; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 132 44"
      width={72}
      height={24}
      className={className}
      style={{ color, overflow: "visible" }}
    >
      <defs>
        <mask id="hover-key-bow">
          <rect width="132" height="44" fill="white" />
          {/* Four hearts, tips together at the middle of the clover */}
          <g fill="black" transform="translate(22 22)">
            <path d={HEART} transform="translate(0 -9.5) scale(1.12)" />
            <path d={HEART} transform="translate(9.5 0) rotate(90) scale(1.12)" />
            <path d={HEART} transform="translate(0 9.5) rotate(180) scale(1.12)" />
            <path d={HEART} transform="translate(-9.5 0) rotate(270) scale(1.12)" />
          </g>
        </mask>
      </defs>
      <g fill="currentColor">
        <g mask="url(#hover-key-bow)">
          <circle cx="22" cy="22" r="11" />
          <circle cx="12.5" cy="22" r="10.5" />
          <circle cx="31.5" cy="22" r="10.5" />
          <circle cx="22" cy="12.5" r="10.5" />
          <circle cx="22" cy="31.5" r="10.5" />
        </g>
        <rect x="40" y="17.5" width="7" height="9" rx="3" />
        <rect x="44" y="19.5" width="76" height="5" />
        <rect x="53" y="15" width="4.5" height="14" rx="2" />
        <rect x="61" y="16.8" width="3.6" height="10.4" rx="1.6" />
        <path d="M103 24 V36.5 H110 V30.5 H114 V36.5 H122 V24 Z" />
      </g>
    </svg>
  );
}
