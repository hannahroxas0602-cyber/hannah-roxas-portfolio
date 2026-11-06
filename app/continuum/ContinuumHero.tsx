import Image from "next/image";

/**
 * Hero picture: the product screen with the pieces of the system around it.
 * Each piece is its own image so it can move on its own (CSS only, see .ch-* in globals.css).
 * Positions are in a 1460 x 840 stage, so everything scales together.
 */
const W = 1460;
const H = 840;
const X0 = 80;
const Y0 = 30;

type Piece = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  alt: string;
  delay: number; // entrance delay, seconds
  bob: number; // float distance, px at full size
  phase: number; // float offset, seconds
  sheen?: boolean;
  radius: number;
  shadow?: boolean;
};

const PIECES: Piece[] = [
  { id: "logo", x: 110, y: 138, w: 212, h: 196, alt: "Continuum logo", delay: 0.15, bob: 5, phase: 0, radius: 24 },
  { id: "week", x: 338, y: 138, w: 212, h: 196, alt: "Gradient tile: week 28 of 40", delay: 0.25, bob: 7, phase: 1.2, sheen: true, radius: 24 },
  { id: "symptoms", x: 110, y: 350, w: 440, h: 268, alt: "Symptom chips: one tap each", delay: 0.35, bob: 5, phase: 2.1, radius: 24 },
  { id: "coord", x: 110, y: 634, w: 440, h: 128, alt: "Certified care coordinator tag", delay: 0.45, bob: 4, phase: 0.6, radius: 24 },
  { id: "first", x: 1050, y: 130, w: 440, h: 176, alt: "Coordinator card: Do this first", delay: 0.2, bob: 6, phase: 1.7, sheen: true, radius: 24 },
  { id: "next", x: 1050, y: 322, w: 212, h: 176, alt: "Gradient tile: next up, Thursday 9:30", delay: 0.3, bob: 7, phase: 0.4, sheen: true, radius: 24 },
  { id: "step", x: 1278, y: 322, w: 212, h: 176, alt: "Gradient tile: your step, due Friday", delay: 0.4, bob: 6, phase: 2.6, sheen: true, radius: 24 },
  { id: "cal", x: 1050, y: 514, w: 440, h: 248, alt: "Shared calendar", delay: 0.5, bob: 5, phase: 1.4, radius: 24 },
];

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

export default function ContinuumHero() {
  return (
    <div
      className="ch-stage relative mx-auto w-full select-none"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Continuum on a phone, surrounded by the pieces of the system: symptom chips, a certified-coordinator tag, gradient tiles for the next step, the coordinator's 'Do this first' card and the shared calendar"
    >
      <div
        className="ch-in absolute"
        style={{ left: pct(620 - X0, W), top: pct(60 - Y0, H), width: pct(360, W), height: pct(779, H), ["--d" as string]: "0s" }}
      >
        <div className="ch-float h-full w-full" style={{ ["--bob" as string]: "4px", ["--ph" as string]: "0s" }}>
          <Image src="/images/continuum/v3/hero/phone.webp" alt="" width={1080} height={2337} priority unoptimized className="ch-shadow h-full w-full" draggable={false} />
        </div>
      </div>
      {PIECES.map((p) => (
        <div
          key={p.id}
          className="ch-in ch-piece absolute"
          style={{ left: pct(p.x - X0, W), top: pct(p.y - Y0, H), width: pct(p.w, W), height: pct(p.h, H), ["--d" as string]: `${p.delay}s` }}
        >
          <div className="ch-float h-full w-full" style={{ ["--bob" as string]: `${p.bob}px`, ["--ph" as string]: `-${p.phase}s` }}>
            <div className={`h-full w-full overflow-hidden ${p.sheen ? "ch-sheen" : ""}`} style={{ borderRadius: `${(p.radius / p.w) * 100}% / ${(p.radius / p.h) * 100}%` }}>
              <Image src={`/images/continuum/v3/hero/${p.id}.webp`} alt="" width={p.w * 3} height={p.h * 3} priority unoptimized className="h-full w-full" draggable={false} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
