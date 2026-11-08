"use client";

import { useId, useState } from "react";
import { social } from "@/app/data/social";

// The footer's pictures. TeaTable is a tea table in silhouette (a round pedestal table, a teapot in the
// middle, cups on saucers set out round it, a cake stand), solid ink and small. Cookie is the oval
// biscuit, scalloped edge, pricked all over, with "contact me" in pink dots; it's a button: click it and my
// email is copied and it gets a bite taken out (Alice's cake said EAT ME). The steam moves; nothing else does.
const INK = "#1b1519";

function Cup({ x, y, s = 1, tilt = 0 }: { x: number; y: number; s?: number; tilt?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`} fill={INK}>
      <ellipse cx="0" cy="-3" rx="23" ry="3.6" />
      <path d="M-16-30H14C14-14 8-6-1-6C-10-6-16-14-16-30z" />
      <path d="M14-26C25-27 25-14 12-14" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
    </g>
  );
}

export default function TeaTable() {
  return (
    <div className="mx-auto w-full max-w-[17rem] lg:mr-0 lg:ml-auto">
      <svg viewBox="0 0 300 200" className="w-full" aria-hidden>
        {/* the table: a round top on a pedestal with a flared foot */}
        <g fill={INK}>
          <rect x="18" y="119" width="264" height="9" rx="4.5" />
          <path d="M138 128h24c0 14-2 28 4 38h-32c6-10 4-24 4-38z" />
          <path d="M104 190c0-14 22-22 46-22s46 8 46 22z" />
          <path d="M126 150h48v5h-48z" />
        </g>

        {/* the pot, in the middle */}
        <g transform="translate(112 42) scale(0.43)" fill={INK}>
          <path d="M180 10a5.5 5.5 0 1 1-.01 0zM180 15a1.8 1.8 0 1 0 .01 0z" fillRule="evenodd" />
          <path d="M168 24h24c5 0 7 5 7 9v7h-38v-7c0-4 2-9 7-9z" />
          <path d="M162 44h36c2 8 8 12 16 18 14 11 24 32 22 56-2 28-16 48-30 60 6 4 12 10 12 18h-76c0-8 6-14 12-18-14-12-28-32-30-60-2-24 8-45 22-56 8-6 14-10 16-18z" />
          <path d="M140 112C124 102 110 80 92 52c-5-8 3-10 8-5 16 20 28 38 44 50z" />
          <path d="M222 74c28-6 46 4 42 28-4 26-24 40-42 50l-5-12c16-8 30-18 32-34 2-12-8-16-24-12z" />
        </g>

        {/* cups on saucers, set out the way they'd really be, not in a row */}
        <Cup x={52} y={119} />
        <Cup x={206} y={119} s={0.96} />
        <Cup x={252} y={119} s={0.82} tilt={-4} />

        {/* a little cake stand at the left edge, two plates on a stem */}
        <g fill={INK}>
          <ellipse cx="86" cy="96" rx="15" ry="3" />
          <ellipse cx="86" cy="106" rx="19" ry="3.2" />
          <rect x="85" y="96" width="2" height="23" />
          <path d="M72 94c1-6 6-8 14-8s13 2 14 8z" />
        </g>

        {/* steam off the spout */}
        <g stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.35">
          <path className="steam" d="M127 38c-5-7 5-12 0-19" />
          <path className="steam" style={{ animationDelay: "0.8s" }} d="M137 41c-5-7 5-12 0-19" />
        </g>
      </svg>
    </div>
  );
}

// An oval biscuit with a scalloped edge: points round an ellipse, joined by outward half-circles.
function scallopedOval(cx: number, cy: number, rx: number, ry: number, n: number) {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as const;
  });
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  pts.forEach((_, i) => {
    const [x, y] = pts[(i + 1) % n];
    const [px, py] = pts[i];
    const r = Math.hypot(x - px, y - py) / 2 + 0.4;
    d += `A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  return d + "Z";
}
const OVAL = scallopedOval(100, 150, 90, 138, 36);
const HOLES = (() => {
  const out: [number, number][] = [];
  for (let row = 0, y = 34; y < 268; y += 24, row++) {
    for (let x = row % 2 ? 56 : 44; x < 160; x += 24) {
      const dx = (x - 100) / 78;
      const dy = (y - 150) / 118;
      if (dx * dx + dy * dy < 1) out.push([x, y]);
    }
  }
  return out;
})();

// A bite out of the upper right: one big round bite, and a ring of small teeth-marks round its inner edge,
// so the cut edge is scalloped like real tooth marks and not a smooth arc.
const BITE_C = { x: 168, y: 52, r: 46 };
const TEETH = [100, 122, 144, 166, 188, 210, 232, 254].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: BITE_C.x + (BITE_C.r - 1) * Math.cos(a), y: BITE_C.y + (BITE_C.r - 1) * Math.sin(a) };
});
const CRUMBS: [number, number, number][] = [[128, 82, 2.6], [118, 96, 2], [138, 98, 1.8], [108, 74, 1.6]];

export function Cookie() {
  const uid = useId().replace(/:/g, "");
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    } catch {
      window.location.href = `mailto:${social.email}`;
    }
  };

  return (
    <div className="relative flex items-center gap-3.5">
      <button
        type="button"
        onClick={copy}
        data-cursor={copied ? "Copied" : "Copy my email"}
        aria-label={copied ? "Copied my email address" : "Email me: copy my email address"}
        className="cookie relative aspect-[2/3] w-[5.2rem] shrink-0 rotate-[-7deg] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8638f] sm:w-[6.2rem]"
      >
        <svg viewBox="0 0 200 300" className="size-full overflow-visible drop-shadow-[0_8px_8px_rgba(60,40,20,0.28)]">
          <defs>
            <radialGradient id={`${uid}-bake`} cx="50%" cy="46%" r="62%">
              <stop offset="0" stopColor="#f5dca6" />
              <stop offset="0.7" stopColor="#ecc283" />
              <stop offset="1" stopColor="#d49b52" />
            </radialGradient>
            <pattern id={`${uid}-dots`} width="5.4" height="5.4" patternUnits="userSpaceOnUse">
              <circle cx="2.7" cy="2.7" r="2" fill="#1f8fb0" />
            </pattern>
            <mask id={`${uid}-text`}>
              <rect width="200" height="300" fill="#000" />
              <g fill="#fff" fontFamily="var(--font-inter), Arial, sans-serif" fontWeight="700" textAnchor="middle">
                <text x="100" y="146" fontSize="58" letterSpacing="-1.5">email</text>
                <text x="100" y="204" fontSize="58" letterSpacing="-1.5">me</text>
              </g>
            </mask>
            <mask id={`${uid}-bite`}>
              <rect x="-20" y="-20" width="240" height="340" fill="#fff" />
              {copied && (
                <g fill="#000" className="bite">
                  <circle cx={BITE_C.x} cy={BITE_C.y} r={BITE_C.r} />
                  {TEETH.map((t, i) => (
                    <circle key={i} cx={t.x} cy={t.y} r="13" />
                  ))}
                </g>
              )}
            </mask>
          </defs>
          <g mask={`url(#${uid}-bite)`}>
            <path d={OVAL} fill={`url(#${uid}-bake)`} />
            <path d={OVAL} fill="none" stroke="#b9803c" strokeOpacity="0.35" strokeWidth="1.4" />
            {HOLES.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.8" fill="#8a5a2a" fillOpacity="0.55" />
            ))}
            <rect width="200" height="300" fill={`url(#${uid}-dots)`} mask={`url(#${uid}-text)`} />
          </g>
          {/* a few crumbs where the bite came from */}
          {copied && (
            <g fill="#d9a35f" className="crumbs">
              {CRUMBS.map(([x, y, r], i) => (
                <circle key={i} cx={x} cy={y} r={r * 1.6} />
              ))}
            </g>
          )}
        </svg>
      </button>
      <p aria-live="polite" className="sr-only">{copied ? "Copied my email address." : ""}</p>
    </div>
  );
}
