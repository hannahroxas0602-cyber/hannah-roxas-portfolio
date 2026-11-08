import type { SVGProps } from "react";

// The ironwork for the hall of gates, drawn in code. Three gate designs (after the wrought-iron references:
// a lyre and spears, a big heart, a heart with C-scrolls) and an ornate key.
//
// How it's drawn: the wire is white with a yellow outline, and nothing else is filled. Each leaf is drawn
// twice from the same paths: first as a wide yellow stroke, then a narrower white stroke on top, so every
// bar reads as a white wire with a yellow edge. The spaces between the bars stay empty (see-through), the
// way a real gate is. Only solid pieces (the spear heads, the beads, the balls on the rail) are filled,
// and those are white with a yellow edge too.
export const INK = "#dce0d2"; // the prim-yellow edge
export const WIRE = "#ffffff"; // the white wire

// A spiral that winds inward from radius r0 to r1 around (cx, cy), starting at angle a0.
function spiralPoints(cx: number, cy: number, r0: number, r1: number, a0: number, turns: number, dir: 1 | -1) {
  const n = Math.max(26, Math.round(turns * 30));
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = a0 + dir * t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    d += `${i ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)} `;
  }
  return d;
}

// A curl: a stem curve from `from` that runs into a spiral around `c`.
function curl(from: [number, number], bend: [number, number], c: [number, number], R: number, a0: number, turns: number, dir: 1 | -1) {
  const sx = c[0] + R * Math.cos(a0);
  const sy = c[1] + R * Math.sin(a0);
  const sp = spiralPoints(c[0], c[1], R, R * 0.14, a0, turns, dir).replace(/^M[^L]*/, "");
  return `M${from[0]} ${from[1]} Q${bend[0]} ${bend[1]} ${sx.toFixed(2)} ${sy.toFixed(2)} ${sp}`;
}

const spear = (x: number, y: number, h = 11) => `M${x} ${y}V${y - h}M${x} ${y - h - 5.5}l-2.8 4 2.8 5.5 2.8-5.5z`;

// `f` is the fill for solid pieces in this pass (yellow in the first pass, white in the second).
type P = { f: string };

function Base({ f, circles = false }: P & { circles?: boolean }) {
  const xs = Array.from({ length: 9 }, (_, i) => 6 + i * 6);
  return (
    <g>
      <path d="M2 62H58M2 72H58" />
      {xs.map((x) => (
        <path key={x} d={`M${x} 62V90`} />
      ))}
      {circles && Array.from({ length: 6 }, (_, i) => <circle key={i} cx={9 + i * 8.4} cy={62} r={3} fill={f} />)}
    </g>
  );
}

// One half of an ornament, drawn on the left and mirrored on the right about x = 30.
function Mirrored({ children }: { children: React.ReactNode }) {
  return (
    <>
      <g>{children}</g>
      <g transform="translate(60 0) scale(-1 1)">{children}</g>
    </>
  );
}

const BODY = "M2 2H58V90H2z";

function LeafA({ f }: P) {
  return (
    <g fill="none">
      {[10, 30, 50].map((x) => (
        <path key={x} d={spear(x, 2)} fill={f} />
      ))}
      <path d={BODY} />
      <Mirrored>
        {/* a lyre: two arms that sweep out and curl in */}
        <path d="M29 8C17 8 14 22 21 31C26 37 22 45 15 49" />
        <path d={curl([15, 49], [9, 52], [13, 54], 5, -Math.PI / 2, 1.5, -1)} />
        <path d="M29 15C22 16 21 24 26 28C29 31 27 35 23 38" />
        <path d={curl([23, 38], [18, 40], [20, 43], 3.8, -Math.PI / 2, 1.4, 1)} />
        <path d={curl([20, 10], [17, 6], [13, 9], 3.2, 0, 1.3, -1)} />
      </Mirrored>
      <path d="M30 8V62" />
      <path d="M30 20l2.6 5-2.6 5-2.6-5z" fill={f} />
      <Base f={f} circles />
    </g>
  );
}

function LeafB({ f }: P) {
  return (
    <g fill="none">
      <path d="M30 2V-9M30 -14l-2.8 4 2.8 5.5 2.8-5.5z" fill={f} />
      <path d={BODY} />
      {/* the big heart, pointing down: an outline only, the space inside stays open */}
      <path d="M30 14C30 4 8 2 8 22C8 38 30 52 30 58C30 52 52 38 52 22C52 2 30 4 30 14z" />
      <path d="M30 14V58" />
      <Mirrored>
        <path d={curl([30, 24], [24, 19], [20, 23], 5, -0.4, 1.6, -1)} />
        <path d={curl([30, 42], [23, 40], [21, 42], 4.5, 0, 1.5, 1)} />
        <path d={curl([3, 10], [2, 2], [8, 3], 3.2, Math.PI, 1.3, 1)} />
      </Mirrored>
      <Base f={f} />
    </g>
  );
}

function LeafC({ f }: P) {
  return (
    <g fill="none">
      <path d="M30 2V-8M30 -13l-2.8 4 2.8 5.5 2.8-5.5z" fill={f} />
      <path d={BODY} />
      <path d="M30 12C30 4 14 3 14 15C14 27 30 33 30 38C30 33 46 27 46 15C46 3 30 4 30 12z" />
      <path d="M30 4V62" />
      <Mirrored>
        <path d={curl([30, 14], [26, 11], [22, 14], 3.4, -0.3, 1.4, -1)} />
        {/* big C-scrolls curling outward below the heart */}
        <path d={curl([29, 38], [10, 34], [12, 47], 8, -Math.PI / 2, 1.7, -1)} />
        <path d={curl([29, 42], [42, 46], [37, 52], 4, -Math.PI / 2, 1.4, 1)} />
      </Mirrored>
      <Base f={f} />
    </g>
  );
}

const LEAVES = [LeafA, LeafB, LeafC];

// A leaf, 60 x 104 units (finials included). Sized by its parent.
export function GateLeaf({ variant = 0, ...props }: { variant?: number } & SVGProps<SVGSVGElement>) {
  const Leaf = LEAVES[variant % LEAVES.length];
  return (
    <svg viewBox="0 -14 60 104" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      {/* the yellow edge: a wide stroke ... */}
      <g stroke={INK} strokeWidth={3.5}>
        <Leaf f={INK} />
      </g>
      {/* ... and the white wire on top of it */}
      <g stroke={WIRE} strokeWidth={1.5}>
        <Leaf f={WIRE} />
      </g>
    </svg>
  );
}

// An ornate key, after the key silhouettes: a quatrefoil bow (four interlocking rings round a small
// jewel, under a diamond finial), a turned baluster shaft, and a notched bit. The bow is wire (stroke only,
// so its gaps are empty); the shaft and bit are solid, white with a yellow edge (the same two-stroke trick).
// 60 x 174 units.
const SOLID =
  // the collar, the baluster shaft, and the notched bit (shifted down to sit under the bow)
  "M21 62H39V69H21z" +
  "M26 69V76C19 78 19 87 26 89V97C22 98 22 103 26 104V118C19 120 19 130 26 132V154H34V132C41 130 41 120 34 118V104C38 103 38 98 34 97V89C41 87 41 78 34 76V69z" +
  "M34 142H54V148H46V154H54V160H46V166H54V172H34z";
const RINGS: [number, number, number][] = [[30, 30, 9], [18.5, 42, 9], [41.5, 42, 9], [30, 53, 9]];
const DIAMOND = "M30 1L36 10.5L30 20L24 10.5z";

function Bow({ w }: { w: number }) {
  return (
    <g fill="none" strokeWidth={w}>
      <path d={DIAMOND} />
      {RINGS.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} />
      ))}
      <circle cx="30" cy="42" r="3.4" />
    </g>
  );
}

export function OrnateKey(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 174" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <g stroke={INK}>
        <Bow w={4.2} />
        <path d={SOLID} fill={INK} strokeWidth={3.2} />
      </g>
      <g stroke={WIRE}>
        <Bow w={1.6} />
        <path d={SOLID} fill={WIRE} strokeWidth={1.2} />
      </g>
    </svg>
  );
}
