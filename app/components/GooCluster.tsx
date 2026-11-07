"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

// Lays its children out normally, then draws one soft shape behind each child that has
// data-goo="<tone>" (see TONES; add data-goo-shape="circle" for a circle), and runs the shapes through a goo filter so tiles
// that sit close together fuse into one organic mass with curved necks between them, like
// the clustered bubbles in the reference. Shapes are measured from the real layout (so
// they follow any wrap, stagger or breakpoint) and are drawn in two layers: a pink-lilac
// rim, and the gradient fill just inside it. Text is never filtered.
type Shape = { x: number; y: number; w: number; h: number; tone: string; circle: boolean };

const RIM = 3;

// Fills, by tone. Big bubbles glow from the center and fade to near-white at the edge (like
// the large bubble in the reference); the "s" tones are the small saturated ones.
type Tone = { linear?: boolean; cx?: number; cy?: number; stops: [number, string][] };
const TONES: Record<string, Tone> = {
  blue: { stops: [[0, "#a6d3ff"], [0.55, "#dcecfd"], [1, "#f6f9fe"]] },
  mint: { stops: [[0, "#a8e3d0"], [0.55, "#e3efee"], [1, "#f8f9fd"]] },
  rose: { stops: [[0, "#ffb9d3"], [0.55, "#fbdfea"], [1, "#fbf8fd"]] },
  lilac: { stops: [[0, "#c3aeff"], [0.55, "#e6defb"], [1, "#f9f7fe"]] },
  softblue: { stops: [[0, "#d3e8fe"], [1, "#f6f9fe"]] },
  softmint: { stops: [[0, "#d3efe6"], [1, "#f8f9fd"]] },
  softrose: { stops: [[0, "#fbd5e4"], [1, "#fbf8fd"]] },
  // The cursor's colors: rose core, lilac, blue-gray falloff.
  cursorA: { stops: [[0, "#eaa99d"], [0.5, "#d6c3e2"], [1, "#e3edf3"]] },
  cursorB: { stops: [[0, "#cdbfe6"], [0.55, "#d3e2ee"], [1, "#f4f8fb"]] },
  sgray: { cx: 0.4, cy: 0.35, stops: [[0, "#ffffff"], [0.5, "#cfe0ea"], [1, "#8fb5cc"]] },
  // Flat concentric disc in the cursor's palette, minus its dark core: related, not identical.
  cursorDisc: { stops: [[0, "#eaa99d"], [0.55, "#cdbbe0"], [1, "#a9c6d9"]] },
  pale: { linear: true, stops: [[0, "#fcfbff"], [1, "#f3f1fb"]] },
  sblue: { cx: 0.4, cy: 0.35, stops: [[0, "#ffffff"], [0.5, "#c4e1ff"], [1, "#6db6ff"]] },
  smint: { cx: 0.4, cy: 0.35, stops: [[0, "#ffffff"], [0.5, "#c4ecdf"], [1, "#7ccab2"]] },
  srose: { cx: 0.4, cy: 0.35, stops: [[0, "#ffffff"], [0.5, "#ffd0e0"], [1, "#ef9bbb"]] },
  slilac: { cx: 0.4, cy: 0.35, stops: [[0, "#ffffff"], [0.5, "#dccfff"], [1, "#b09aff"]] },
};
const MAX_RADIUS = 52;

export default function GooCluster({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const wrap = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const root = el.getBoundingClientRect();
      setBox({ w: root.width, h: root.height });
      setShapes(
        Array.from(el.querySelectorAll<HTMLElement>("[data-goo]")).map((item) => {
          const r = item.getBoundingClientRect();
          return {
            x: r.left - root.left,
            y: r.top - root.top,
            w: r.width,
            h: r.height,
            tone: item.dataset.goo ?? "pale",
            circle: item.dataset.gooShape === "circle",
          };
        })
          // Items hidden at this breakpoint measure 0x0 and would draw a dot.
          .filter((sh) => sh.w > 2 && sh.h > 2),
      );
    };
    // Fires once on observe, and again whenever the cluster or any tile changes size.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.querySelectorAll("[data-goo]").forEach((item) => ro.observe(item));
    return () => ro.disconnect();
  }, []);

  const rect = (s: Shape, grow: number, key: string, fill: string, i: number) => (
    <rect
      key={key}
      className="goo-breathe"
      style={{ animationDelay: `${-i * 1.4}s` }}
      x={s.x - grow}
      y={s.y - grow}
      width={s.w + grow * 2}
      height={s.h + grow * 2}
      rx={(s.circle ? Math.min(s.w, s.h) / 2 : Math.min(MAX_RADIUS, s.h / 2)) + grow}
      fill={fill}
    />
  );

  return (
    <div ref={wrap} className={`relative ${className}`}>
      {box.w > 0 && (
        <svg
          aria-hidden
          focusable="false"
          width={box.w}
          height={box.h}
          className="goo-svg pointer-events-none absolute top-0 left-0 overflow-visible"
        >
          <defs>
            <filter
              id={`${id}-goo`}
              filterUnits="userSpaceOnUse"
              x={-60}
              y={-60}
              width={box.w + 120}
              height={box.h + 120}
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="13" result="b" />
              <feColorMatrix
                in="b"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
              />
            </filter>
            {Object.entries(TONES).map(([name, t]) =>
              t.linear ? (
                <linearGradient key={name} id={`${id}-${name}`} x1="0" y1="0" x2="1" y2="1">
                  {t.stops.map(([o, c]) => (
                    <stop key={o} offset={o} stopColor={c} />
                  ))}
                </linearGradient>
              ) : (
                <radialGradient key={name} id={`${id}-${name}`} cx={t.cx ?? 0.5} cy={t.cy ?? 0.5} r={t.cx ? 0.65 : 0.5}>
                  {t.stops.map(([o, c]) => (
                    <stop key={o} offset={o} stopColor={c} />
                  ))}
                </radialGradient>
              ),
            )}
          </defs>
          <g filter={`url(#${id}-goo)`}>
            {shapes.map((s, i) => rect(s, RIM, `r${i}`, "#e4d0ee", i))}
          </g>
          <g filter={`url(#${id}-goo)`}>
            {shapes.map((s, i) => rect(s, 0, `f${i}`, `url(#${id}-${s.tone})`, i))}
          </g>
        </svg>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
