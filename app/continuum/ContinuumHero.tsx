"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Hero: the product screen with the pieces of the system beside it. The pieces are live, so the parts inside them
 * move a little: chips change level, the calendar picks a day, the step fills and completes. The cards stay put.
 * Built on a fixed 1460 x 840 stage and scaled to fit; positions below are stage pixels.
 */
const geist = Geist({ subsets: ["latin"] });
const mono = Geist_Mono({ subsets: ["latin"] });

const W = 1460;
const H = 840;
const INK = "#161614";
const MUTED = "#6B6E69";
const CARD = "#F3F4EF";

/* ---------- little pieces ---------- */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ICONS: Record<string, ReactNode> = {
  Nausea: <><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></>,
  Tired: <><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M22 11v2M6 11v2" /></>,
  Headache: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
  "Back pain": <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />,
  Cramps: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" /></>,
  Sleep: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
};
const LEVELS = ["None", "Mild", "Moderate", "Strong"];

function Chip({ label, n }: { label: string; n: number }) {
  const on = n > 0;
  return (
    <div className="flex items-center gap-[10px] rounded-[18px] px-[10px] transition-colors duration-500" style={{ height: 54, background: on ? INK : "#fff", color: on ? "#fff" : INK }}>
      <span className="grid shrink-0 place-items-center rounded-full transition-colors duration-500" style={{ width: 32, height: 32, background: on ? "rgba(255,255,255,.15)" : "rgba(22,22,20,.06)" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" {...stroke}>{ICONS[label]}</svg>
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate font-medium" style={{ fontSize: 14 }}>{label}</span>
        <span className="block transition-colors duration-500" style={{ fontSize: 11, color: on ? "rgba(255,255,255,.7)" : MUTED }}>{LEVELS[n]}</span>
      </span>
      <span className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <span key={i} className="rounded-full transition-colors duration-500" style={{ width: 6, height: 16, background: i <= n ? (on ? "#fff" : INK) : on ? "rgba(255,255,255,.25)" : "rgba(22,22,20,.15)" }} />
        ))}
      </span>
    </div>
  );
}

const EVENTS: Record<number, string[]> = { 5: ["#14D1C0", "#FF5BAE"], 6: ["#8A7BFF", "#FF8A3D"], 9: ["#9A9A90"], 11: ["#FF8A3D"], 12: ["#8A7BFF"], 16: ["#14D1C0"], 18: ["#9A9A90"], 23: ["#14D1C0"], 25: ["#FF5BAE"] };
const PICKS = [5, 11, 16, 25, 12, 23];

/** Crossfades between lines of text without moving the layout. */
function Swap({ lines, i, style }: { lines: string[]; i: number; style?: CSSProperties }) {
  return (
    <span className="relative block" style={{ height: 16, ...style }}>
      {lines.map((l, k) => (
        <span key={l} className="absolute left-0 top-0 whitespace-nowrap transition-all duration-700" style={{ opacity: k === i ? 1 : 0, transform: k === i ? "none" : "translateY(5px)" }}>{l}</span>
      ))}
    </span>
  );
}

export default function ContinuumHero() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [still, setStill] = useState(false);
  const [t, setT] = useState(0); // one slow clock, in beats of 1.6s, drives everything inside the pieces
  const [week, setWeek] = useState(28);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => { ro.disconnect(); mq.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setT((v) => v + 1), 1600);
    return () => window.clearInterval(id);
  }, [still]);

  // Week number counts up from 0 once per loop of 8 beats (state is only set from timers).
  useEffect(() => {
    if (still || t % 8 !== 0) return;
    let n = 0;
    const id = window.setInterval(() => { n += 1; setWeek(n); if (n >= 28) window.clearInterval(id); }, 28);
    const reset = window.setTimeout(() => setWeek(0), 0);
    return () => { window.clearInterval(id); window.clearTimeout(reset); };
  }, [t, still]);

  // The step fills over a loop of 6 beats, then reads "Done".
  const k6 = t % 6;
  const fill = still ? 0.78 : k6 === 0 ? 0.18 : k6 >= 4 ? 1 : 0.18 + k6 * 0.2;

  const script: [number, number][] = [[2, 1], [4, 2], [0, 0], [5, 1], [2, 0], [4, 0], [0, 1], [3, 0], [5, 0], [1, 1]];
  const base = [1, 2, 0, 1, 0, 0];
  const lv = base.slice();
  if (!still) for (let k = 0; k <= t % (script.length + 2) - 1 && k < script.length; k++) lv[script[k][0]] = script[k][1];
  const pick = still ? 11 : PICKS[t % PICKS.length];
  const done = !still && fill >= 1;
  const labels = ["Nausea", "Tired", "Headache", "Back pain", "Cramps", "Sleep"];

  const abs = (x: number, y: number, w: number, h: number, delay: number): CSSProperties => ({ position: "absolute", left: x - 80, top: y - 30, width: w, height: h, ["--d" as string]: `${delay}s` });
  const tile = "ch-in flex flex-col justify-between overflow-hidden p-4 text-white";
  const sub = { color: "rgba(255,255,255,.92)", textShadow: "0 1px 8px rgba(0,0,0,.32)" };
  const shadow = { textShadow: "0 1px 8px rgba(0,0,0,.32)" };

  return (
    <div
      ref={box}
      className={`${geist.className} relative mx-auto w-full select-none`}
      style={{ aspectRatio: `${W} / ${H}`, opacity: scale ? 1 : 0, ["--mono" as string]: mono.style.fontFamily }}
      role="img"
      aria-label="Continuum on a phone, with the pieces of the system beside it: a logo, a gradient tile for the week, symptom chips, a certified-coordinator tag, the coordinator's Do this first card, tiles for the next appointment and the parents' step, and the shared calendar"
    >
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute", left: 0, top: 0, color: INK }}>
        {/* phone */}
        <div className="ch-in" style={abs(620, 60, 360, 779, 0)}>
          <Image src="/images/continuum/v3/hero/phone.webp" alt="" width={1080} height={2337} priority unoptimized className="ch-shadow h-full w-full" draggable={false} />
        </div>

        {/* left column */}
        <div className="ch-in grid place-items-center rounded-[24px]" style={{ ...abs(110, 138, 212, 196, 0.15), background: CARD }}>
          <div className="flex flex-col items-center gap-3">
            <svg width="76" height="76" viewBox="0 0 100 100" aria-hidden><path d="M78 24A38 38 0 1 0 78 76" fill="none" stroke={INK} strokeWidth="13" strokeLinecap="round" /><circle cx="52" cy="50" r="10.5" fill={INK} className="ch-dot" /></svg>
            <p className="font-medium" style={{ fontSize: 20, letterSpacing: "-0.03em" }}>Continuum</p>
          </div>
        </div>

        <div className={tile} style={{ ...abs(338, 138, 212, 196, 0.25), borderRadius: 24, backgroundImage: "url(/images/continuum/v3/hero/bg-week.webp)", backgroundSize: "100% 100%" }}>
          <span style={{ fontSize: 13, ...sub }}>This week</span>
          <div>
            <p className="font-medium leading-none tabular-nums" style={{ fontSize: 32, letterSpacing: "-0.03em", ...shadow }}>{week} of 40</p>
            <p style={{ fontSize: 12, marginTop: 4, ...sub }}>with Maya</p>
          </div>
        </div>

        <div className="ch-in rounded-[24px] p-5" style={{ ...abs(110, 350, 440, 268, 0.35), background: CARD }}>
          <p className="uppercase" style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".04em", color: "#8A8D88" }}>symptoms · one tap</p>
          <div className="mt-3 grid grid-cols-2 gap-[10px]">{labels.map((l, i) => <Chip key={l} label={l} n={lv[i]} />)}</div>
        </div>

        <div className="ch-in flex flex-col justify-center gap-3 rounded-[24px] p-5" style={{ ...abs(110, 634, 440, 128, 0.45), background: CARD }}>
          <div className="flex items-center gap-3">
            <span className="relative grid place-items-center rounded-full font-medium text-white" style={{ width: 44, height: 44, background: INK, fontSize: 17 }}>
              P
              <span className="ch-online absolute rounded-full" style={{ right: -1, bottom: -1, width: 12, height: 12, background: "#1FA971", boxShadow: `0 0 0 2px ${CARD}` }} />
            </span>
            <div className="leading-tight"><p className="font-medium" style={{ fontSize: 17, letterSpacing: "-0.02em" }}>Priya Raman</p><p style={{ fontSize: 12, color: MUTED }}>Your coordinator · replies within a day</p></div>
          </div>
          <span key={still ? "s" : Math.floor(t / 3)} className="inline-flex w-fit items-center gap-[6px] rounded-full text-white" style={{ background: "#0B6E45", padding: "6px 12px", fontSize: 12, fontWeight: 500 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" className="ch-check" /></svg>
            Certified care coordinator · Northlight Surrogacy
          </span>
        </div>

        {/* right column */}
        <div className={tile} style={{ ...abs(1050, 130, 440, 176, 0.2), borderRadius: 24, padding: 20, backgroundImage: "url(/images/continuum/v3/hero/bg-first.webp)", backgroundSize: "100% 100%" }}>
          <p className="flex items-center gap-2 uppercase" style={{ fontFamily: "var(--mono)", fontSize: 11, ...sub }}><span className="ch-online rounded-full bg-white" style={{ width: 6, height: 6 }} />Do this first</p>
          <p className="font-medium" style={{ fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.02em", ...shadow }}>Dani has not checked in for 6 days. A short, no-agenda call helps.</p>
          <span className="ch-call inline-block w-fit rounded-full bg-white font-medium" style={{ padding: "8px 16px", fontSize: 13, color: INK, textShadow: "none" }}>Call Dani</span>
        </div>

        <div className={tile} style={{ ...abs(1050, 322, 212, 176, 0.3), borderRadius: 24, backgroundImage: "url(/images/continuum/v3/hero/bg-next.webp)", backgroundSize: "100% 100%" }}>
          <span style={{ fontSize: 13, ...sub }}>Next up</span>
          <div>
            <p className="font-medium leading-none" style={{ fontSize: 30, letterSpacing: "-0.03em", ...shadow }}>Thu 9:30</p>
            <Swap lines={["Glucose test", "Jordan joins by video"]} i={still ? 0 : t % 4 < 2 ? 0 : 1} style={{ fontSize: 12, marginTop: 4, height: 16, ...sub }} />
          </div>
        </div>

        <div className={tile} style={{ ...abs(1278, 322, 212, 176, 0.4), borderRadius: 24, backgroundImage: "url(/images/continuum/v3/hero/bg-step.webp)", backgroundSize: "100% 100%" }}>
          <span style={{ fontSize: 13, ...sub }}>Your step</span>
          <div>
            <p className="font-medium leading-none" style={{ fontSize: 30, letterSpacing: "-0.03em", ...shadow }}>{done ? "Done" : "Due Fri"}</p>
            <Swap lines={["Sign the petition", "Thank you, Jordan"]} i={done ? 1 : 0} style={{ fontSize: 12, marginTop: 4, ...sub }} />
            <span className="mt-2 block overflow-hidden rounded-full" style={{ height: 4, background: "rgba(255,255,255,.28)" }}><span className="block h-full rounded-full bg-white transition-[width] duration-[1400ms] ease-out" style={{ width: `${fill * 100}%` }} /></span>
          </div>
        </div>

        <div className="ch-in rounded-[24px] p-5" style={{ ...abs(1050, 514, 440, 248, 0.5), background: CARD }}>
          <div className="flex items-center justify-between"><p className="font-medium" style={{ fontSize: 16, letterSpacing: "-0.02em" }}>November 2026</p><span className="flex gap-1" style={{ color: MUTED }}>{["‹", "›"].map((c) => <span key={c} className="grid place-items-center rounded-full bg-white" style={{ width: 28, height: 28, fontSize: 13 }}>{c}</span>)}</span></div>
          <div className="mt-2 grid grid-cols-7 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className="uppercase" style={{ fontFamily: "var(--mono)", fontSize: 11, padding: "2px 0", color: "#8A8D88" }}>{d}</span>)}
            {Array.from({ length: 35 }, (_, i) => { const d = i + 1; return d <= 30 ? d : 0; }).map((day, i) => {
              const today = day === 4; const sel = day === pick;
              return (
                <span key={i} className="flex flex-col items-center justify-center" style={{ height: 30, gap: 2, fontSize: 12 }}>
                  <span className="grid place-items-center rounded-full transition-all duration-500" style={{ width: 24, height: 24, background: today ? INK : sel ? "#fff" : "transparent", color: today ? "#fff" : INK, boxShadow: sel && !today ? "0 0 0 1.5px #161614" : "none", transform: sel ? "scale(1.12)" : "none" }}>{day || ""}</span>
                  <span className="flex" style={{ height: 4, gap: 2 }}>{(EVENTS[day] ?? []).map((c, k) => <i key={k} className="rounded-full transition-transform duration-500" style={{ width: 4, height: 4, background: c, transform: sel ? "scale(1.9)" : "none" }} />)}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
