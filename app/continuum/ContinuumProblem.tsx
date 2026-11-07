"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * "The Problem" bento, live. Each card plays the thing its text describes, on a loop that only runs while it is on screen:
 * support drops once pregnancy is confirmed, a group text with nobody owning the answer, a spreadsheet of question marks,
 * an inbox where the urgent email sinks. Fixed 1600 x 900 stage, scaled to fit.
 */
const geist = Geist({ subsets: ["latin"] });
const mono = Geist_Mono({ subsets: ["latin"] });
const W = 1600;
const H = 900;
const INK = "#161614";
const CARD = "#F3F4EF";
const RULE = "#E1E3DC";
const RED = "#B81D38";
const BEAT = 700; // ms per tick
const CYCLE = 18; // ticks per loop

const BARS: [number, string][] = [[140, "#8A7BFF"], [132, "#8A7BFF"], [48, "#FF8A3D"], [36, "#FF8A3D"], [30, "#FF8A3D"], [26, "#FF8A3D"], [26, "#FF8A3D"], [22, "#FF8A3D"], [22, "#FF8A3D"]];
const NEW_MAIL = ["Quick question, wrong thread", "RE: schedule?", "FWD: FWD: forms", "Anyone seen this?"];
const BASE_MAIL = ["URGENT: signature needed", "RE: RE: FWD: Hospital agreement", "Intro: the new coordinator"];

const stroke = { fill: "none", stroke: INK, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const Icon = ({ children }: { children: ReactNode }) => (
  <span className="grid place-items-center rounded-full bg-white" style={{ width: 44, height: 44 }}>
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>{children}</svg>
  </span>
);

function Card({ style, children, dark }: { style: CSSProperties; children: ReactNode; dark?: boolean }) {
  return <div className="absolute flex flex-col" style={{ borderRadius: 28, background: dark ? INK : CARD, color: dark ? "#fff" : INK, ...style }}>{children}</div>;
}

export default function ContinuumProblem() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [still, setStill] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => { ro.disconnect(); io.disconnect(); mq.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    if (still || !visible) return;
    const id = window.setInterval(() => setTick((v) => v + 1), BEAT);
    return () => window.clearInterval(id);
  }, [still, visible]);

  const k = still ? CYCLE - 1 : tick % CYCLE; // position in the loop
  const bars = still ? 9 : Math.min(9, k);
  const confirmed = k >= 3;
  const arrived = still ? 0 : k < 4 ? 0 : k < 7 ? 1 : k < 10 ? 2 : k < 13 ? 3 : 4;
  const mail = [...NEW_MAIL.slice(0, arrived).reverse(), ...BASE_MAIL];
  const row = k % 3; // spreadsheet row being looked at
  const typing = !still && k >= 4 && k < 6;
  const msgs = still ? 3 : k < 1 ? 0 : k < 4 ? 1 : k < 6 ? 1 : k < 9 ? 2 : 3;
  const underline = still || k >= 2;

  return (
    <div
      ref={box}
      className={`${geist.className} relative mx-auto w-full select-none`}
      style={{ aspectRatio: `${W} / ${H}`, opacity: scale ? 1 : 0 }}
      role="img"
      aria-label="The problem in four small scenes: support drops after pregnancy is confirmed, a group text where nobody owns the answer, a task spreadsheet full of question marks, and an inbox where the urgent email gets buried. Research finding: hospital staff are often not trained for surrogacy."
    >
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {/* support curve */}
        <Card style={{ left: 56, top: 56, width: 900, height: 380, padding: "34px 38px" }}>
          <div style={{ fontFamily: mono.style.fontFamily, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "#8A8D88" }}>The problem</div>
          <div className="font-medium" style={{ fontSize: 46, lineHeight: 1.05, letterSpacing: "-.04em", marginTop: 10, maxWidth: 760 }}>Support fades the moment pregnancy is confirmed.</div>
          <div className="relative mt-auto flex items-end" style={{ gap: 12 }}>
            {BARS.map(([h, c], i) => (
              <i key={i} style={{ display: "block", width: 46, height: i < bars ? h : 0, borderRadius: 14, background: c, transition: "height .6s cubic-bezier(.2,.8,.2,1)" }} />
            ))}
            <div className="absolute" style={{ left: 2 * 58 - 6, bottom: -4, top: -22, width: 0, borderLeft: "2px dashed rgba(22,22,20,.35)", opacity: confirmed ? 1 : 0, transition: "opacity .5s" }}>
              <span className="absolute whitespace-nowrap rounded-full bg-white" style={{ left: 8, top: 0, padding: "5px 12px", fontSize: 14, fontWeight: 600, boxShadow: "0 0 0 1px rgba(0,0,0,.08)" }}>Pregnancy confirmed</span>
            </div>
            <div style={{ marginLeft: 12, fontSize: 17, lineHeight: 1.3, color: "#6B6E69", alignSelf: "flex-end", marginBottom: 6 }}>
              <b style={{ color: INK, fontWeight: 600 }}>High support</b> before.<br /><b style={{ color: INK, fontWeight: 600 }}>On their own</b> after.
            </div>
          </div>
        </Card>

        {/* research finding */}
        <Card dark style={{ left: 976, top: 56, width: 568, height: 380, padding: "34px 38px", justifyContent: "space-between" }}>
          <div style={{ fontFamily: mono.style.fontFamily, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>What the research found</div>
          <div className="font-medium" style={{ fontSize: 38, lineHeight: 1.1, letterSpacing: "-.03em" }}>
            Hospital staff are often{" "}
            <span className="relative inline-block">
              not trained
              <span className="absolute left-0 rounded-full" style={{ bottom: -2, height: 4, background: "#FF8A3D", width: underline ? "100%" : 0, transition: "width .9s cubic-bezier(.2,.8,.2,1)" }} />
            </span>{" "}
            for surrogacy.
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.35, color: "rgba(255,255,255,.72)" }}>
            So surrogates get <span style={{ color: k % 6 < 3 || still ? "#fff" : undefined, transition: "color .5s" }}>misrecognised</span> and intended parents <span style={{ color: k % 6 >= 3 && !still ? "#fff" : undefined, transition: "color .5s" }}>miss critical updates</span>.
          </div>
        </Card>

        {/* group text */}
        <Card style={{ left: 56, top: 456, width: 482, height: 388, padding: 30 }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: 12 }}><Icon><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12z" /></Icon><span className="font-medium" style={{ fontSize: 30, letterSpacing: "-.03em" }}>Group text</span></div>
            <span className="grid place-items-center rounded-full font-semibold text-white" style={{ minWidth: 30, height: 30, background: RED, fontSize: 15, opacity: msgs ? 1 : 0, transform: msgs ? "none" : "scale(.5)", transition: "all .3s" }}>{msgs + 9}</span>
          </div>
          <div className="flex flex-1 flex-col justify-center" style={{ gap: 10 }}>
            {["Did the hospital call back??", "Wait, which form?", "Anyone??"].map((m, i) => {
              const on = i < msgs || (i === 1 && false);
              return (
                <div key={m} style={{ alignSelf: i === 1 ? "flex-end" : "flex-start", maxWidth: "92%", padding: "13px 18px", borderRadius: 22, fontSize: 22, lineHeight: 1.25, background: i === 1 ? INK : "#fff", color: i === 1 ? "#fff" : INK, opacity: on ? 1 : 0, transform: on ? "none" : "translateY(10px) scale(.96)", transformOrigin: i === 1 ? "right bottom" : "left bottom", transition: "all .45s cubic-bezier(.2,.8,.2,1)", display: on ? "block" : "none" }}>{m}</div>
              );
            })}
            <div className="flex items-center" style={{ alignSelf: "flex-end", gap: 5, padding: "12px 16px", borderRadius: 20, background: INK, height: typing ? 40 : 0, opacity: typing ? 1 : 0, overflow: "hidden", transition: "all .3s" }}>
              {[0, 1, 2].map((d) => <i key={d} className="pb-dot" style={{ width: 8, height: 8, borderRadius: 8, background: "#fff", animationDelay: `${d * 0.15}s` }} />)}
            </div>
          </div>
          <div className="border-t font-semibold" style={{ borderColor: RULE, paddingTop: 16, fontSize: 22, letterSpacing: "-.02em" }}>No one knows who owns it.</div>
        </Card>

        {/* spreadsheet */}
        <Card style={{ left: 559, top: 456, width: 482, height: 388, padding: 30 }}>
          <div className="flex items-center" style={{ gap: 12 }}><Icon><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 4v16" /></Icon><span className="font-medium" style={{ fontSize: 30, letterSpacing: "-.03em" }}>Spreadsheet</span></div>
          <div className="flex flex-1 flex-col justify-center">
            {[["Sign petition", "???"], ["Hospital form", "Jordan?"], ["Call lawyer", "who"]].map(([a, b], i) => {
              const on = !still && i === row;
              return (
                <div key={a} className="grid items-center" style={{ gridTemplateColumns: "1.5fr 1fr", padding: "13px 10px", margin: "0 -10px", borderTop: `1px solid ${RULE}`, fontSize: 21, borderRadius: 10, background: on ? "rgba(184,29,56,.07)" : "transparent", transition: "background .4s" }}>
                  <span>{a}</span>
                  <span key={on ? `on${k}` : "off"} className={on ? "pb-shake" : ""} style={{ color: RED, fontWeight: 600 }}>{b}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t font-semibold" style={{ borderColor: RULE, paddingTop: 16, fontSize: 22, letterSpacing: "-.02em" }}>Nothing says what is done.</div>
        </Card>

        {/* email */}
        <Card style={{ left: 1062, top: 456, width: 482, height: 388, padding: 30 }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: 12 }}><Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon><span className="font-medium" style={{ fontSize: 30, letterSpacing: "-.03em" }}>Email</span></div>
            <span className="rounded-full font-semibold" style={{ padding: "4px 12px", fontSize: 15, background: "#fff" }}>{12 + arrived} unread</span>
          </div>
          <div className="relative flex-1" style={{ marginTop: 10 }}>
            {mail.map((m, i) => (
              <div key={m} className="absolute left-0 right-0 flex items-center" style={{ top: 0, height: 54, transform: `translateY(${i * 54 + 14}px)`, opacity: i > 3 ? 0 : 1, transition: "transform .6s cubic-bezier(.2,.8,.2,1), opacity .4s", borderTop: `1px solid ${RULE}`, fontSize: 21, fontWeight: m.startsWith("URGENT") ? 700 : 500, color: m.startsWith("URGENT") ? RED : INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m}</div>
            ))}
          </div>
          <div className="border-t font-semibold" style={{ borderColor: RULE, paddingTop: 16, fontSize: 22, letterSpacing: "-.02em" }}>Updates get buried.</div>
        </Card>
      </div>
    </div>
  );
}
