"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Em } from "@/app/components/Em";

// The lab: pieces from my case studies, rebuilt to be used. Learvo's checklist, quiz builder and study timer;
// Continuum's timeline states and mood picker.

function Tile({ label, note, caption, i = 0, className = "", children }: { label: string; note: string; caption?: string; i?: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div className={`flex flex-col ${className}`} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}>
      <div className="flex min-h-[18.5rem] flex-1 flex-col rounded-[1.4rem] bg-panel p-3.5 ring-1 ring-black/[0.05]">
        {caption && <p className="font-label text-[10px] tracking-[0.14em] text-neutral-600 uppercase">{caption}</p>}
        <div className="grid flex-1 place-items-center pt-1 [zoom:0.82]">{children}</div>
      </div>
      <p className="mt-3 text-sm font-semibold text-neutral-950">{label}</p>
      <p className="text-[13px] text-neutral-600">{note}</p>
    </motion.div>
  );
}

const STEPS = [
  { t: "Upload your study notes", cta: "Beat procrastination", img: "upload" },
  { t: "Build your first quiz", cta: "Outsmart the exam", img: "quiz" },
  { t: "Study with flashcard repetition", cta: "Make it stick", img: "cards" },
  { t: "Read smarter with AI summaries", cta: "Skim less, learn more", img: "read" },
];

// Learvo's real onboarding checklist: illustrated rows, a struck-through finished state, a blue-to-green bar.
function Checklist() {
  const start = [false, false, true, true];
  const [done, setDone] = useState(start);
  const n = done.filter(Boolean).length;
  return (
    <div className="keep-light w-full max-w-[22rem] overflow-hidden rounded-3xl bg-white text-left shadow-[0_24px_50px_-28px_rgba(20,21,59,0.45)] ring-1 ring-black/5">
      <div className="flex items-center justify-between px-5 py-3.5">
        <p className="text-[15px] font-bold text-neutral-950">You&apos;re {Math.round((n / 4) * 100)}% set up!</p>
        <span aria-hidden className="text-neutral-400">×</span>
      </div>
      <ul>
        {STEPS.map((st, k) => (
          <li key={st.t} className="border-t border-neutral-200/80">
            <button onClick={() => setDone((a) => a.map((x, j) => (j === k ? !x : x)))} className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-neutral-50">
              <span className={`relative size-11 shrink-0 overflow-hidden rounded-xl bg-[#eef3ff] transition-opacity ${done[k] ? "opacity-50" : ""}`}>
                <Image src={`/images/learvo/lab-${st.img}.webp`} alt="" fill sizes="44px" className="object-contain p-1" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className={`grid size-4 shrink-0 place-items-center rounded-full ring-1 transition-colors ${done[k] ? "bg-[#bfe5cf] ring-[#bfe5cf]" : "ring-neutral-300"}`}>
                    <svg viewBox="0 0 12 12" className="size-2.5" fill="none" aria-hidden>
                      <motion.path d="M2.5 6.2l2.3 2.3L9.5 3.6" stroke={done[k] ? "#fff" : "#a3a3a3"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" initial={false} animate={{ pathLength: done[k] ? 1 : 0.0001 }} transition={{ duration: 0.25 }} />
                    </svg>
                  </span>
                  <span className={`truncate text-[13px] font-semibold transition-colors ${done[k] ? "text-neutral-400 line-through" : "text-neutral-950"}`}>{st.t}</span>
                </span>
                {!done[k] && <span className="mt-0.5 block text-xs font-medium text-[#3f62d4]">{st.cta} →</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-neutral-200/80 px-4 pt-3 pb-3.5">
        <div className="h-2 overflow-hidden rounded-full bg-neutral-200/70">
          <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#4a7be8,#4fb38a)" }} animate={{ width: `${(n / 4) * 100}%` }} transition={{ type: "spring", stiffness: 140, damping: 20 }} />
        </div>
        <p className="mt-2 flex justify-between text-xs text-neutral-500">
          <span>{n} of 4 complete</span>
          <button onClick={() => setDone(start)} className="hover:text-neutral-800">Reset</button>
        </p>
      </div>
    </div>
  );
}

const NAVY = "#14153b";
const BLUE = "#4a5fc1";

// Continuum: appointment states. Tap one to finish it; the next in line becomes "Up next".
type St = "done" | "overdue" | "next" | "later";
const TL = ["Anatomy scan", "Glucose results", "Glucose screening", "Hospital tour"];
function Timeline() {
  const [st, setSt] = useState<St[]>(["done", "overdue", "next", "later"]);
  const tap = (k: number) =>
    setSt((a) => {
      const b = a.map((x, j): St => (j === k ? (x === "done" ? "later" : "done") : x));
      if (!b.includes("next")) {
        const f = b.findIndex((x) => x === "later");
        if (f >= 0) b[f] = "next";
      }
      return b;
    });
  const pill: Record<St, string> = {
    done: "bg-neutral-200/80 text-neutral-600",
    overdue: "bg-white text-neutral-950 ring-1 ring-neutral-950",
    next: "bg-neutral-950 text-white",
    later: "bg-neutral-200/80 text-neutral-600",
  };
  const word: Record<St, string> = { done: "Done", overdue: "Overdue", next: "Up next", later: "Later" };
  return (
    <ol className="keep-light w-full max-w-[19rem] rounded-3xl bg-white p-4 shadow-[0_24px_50px_-28px_rgba(20,21,59,0.35)] ring-1 ring-black/5">
      {TL.map((t, k) => (
        <li key={t} className="relative">
          {k < TL.length - 1 && <span aria-hidden className={`absolute top-9 left-[15px] h-[calc(100%-2.2rem)] w-px ${st[k] === "done" ? "bg-neutral-950" : "border-l border-dashed border-neutral-400"}`} />}
          <button onClick={() => tap(k)} className="flex w-full items-center gap-3 py-2 text-left">
            <span className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full ring-[1.5px] transition-colors ${st[k] === "done" ? "bg-neutral-950 ring-neutral-950" : "bg-white"} ${st[k] === "done" ? "" : st[k] === "later" ? "ring-neutral-300" : st[k] === "next" ? "ring-neutral-400 ring-offset-2 ring-offset-white" : "ring-neutral-950"}`}>
              {st[k] === "done" && (
                <svg viewBox="0 0 12 12" className="size-3.5" fill="none" aria-hidden>
                  <motion.path d="M2.5 6.2l2.3 2.3L9.5 3.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                </svg>
              )}
              {st[k] === "overdue" && <span className="text-sm leading-none font-semibold text-neutral-950">!</span>}
              {st[k] === "next" && <span className="size-2 rounded-full bg-neutral-950" />}
            </span>
            <span className={`flex-1 text-[15px] ${st[k] === "later" ? "text-neutral-500" : "text-neutral-950"}`}>{t}</span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${pill[st[k]]}`}>{word[st[k]]}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

// Continuum: one tap, no homework.
const MOODS = [
  { k: "Calm", d: "M3 8c2-2 4-2 6 0s4 2 6 0M3 12c2-2 4-2 6 0s4 2 6 0M3 4c2-2 4-2 6 0s4 2 6 0" },
  { k: "Tired", d: "M3 6h10v6H3zM14 8v2" },
  { k: "Anxious", d: "M5 11a3 3 0 0 1 .5-6 4 4 0 0 1 7.5 1 2.5 2.5 0 0 1-.5 5zM6 13v2M9 13v2M12 13v2" },
  { k: "Excited", d: "M9 2l1.6 4.4L15 8l-4.4 1.6L9 14l-1.6-4.4L3 8l4.4-1.6zM14 2v3M12.5 3.5h3" },
  { k: "Sore", d: "M10 2L4 10h5l-1 6 6-8H9z" },
];
function Mood() {
  const [m, setM] = useState(0);
  return (
    <ul className="keep-light w-full max-w-[19rem] rounded-3xl bg-[#fafaf8] p-2 ring-1 ring-black/[0.04]">
      {MOODS.map((o, n) => (
        <li key={o.k} className="relative">
          {n === m && <motion.span layoutId="mood-hi" transition={{ type: "spring", stiffness: 420, damping: 34 }} className="absolute inset-0 rounded-2xl bg-white shadow-[0_6px_18px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.05]" />}
          <button onClick={() => setM(n)} className="relative flex w-full items-center gap-3 px-3.5 py-3 text-left text-[16px] text-neutral-950">
            <svg viewBox="0 0 18 18" className="size-[18px] text-neutral-700" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={o.d} />
            </svg>
            <span className="flex-1">{o.k}</span>
            {n === m && (
              <svg viewBox="0 0 12 12" className="size-3.5" fill="none" aria-hidden>
                <motion.path d="M2.5 6.2l2.3 2.3L9.5 3.6" stroke="#0b0b0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25 }} />
              </svg>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Learvo: the quiz builder. Steppers, two segmented choices, a total, and a button that wakes up once there's a question.
function Stepper({ label, v, set }: { label: string; v: number; set: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-neutral-800">{label}</span>
      <span className="flex items-center overflow-hidden rounded-lg border border-neutral-300 bg-white text-[13px]">
        <button onClick={() => set(Math.max(0, v - 1))} aria-label={`Fewer ${label}`} className="px-2.5 py-1 text-neutral-500 hover:bg-neutral-50 active:bg-neutral-100">−</button>
        <span className="w-8 border-x border-neutral-200 py-1 text-center tabular-nums">{v}</span>
        <button onClick={() => set(Math.min(20, v + 1))} aria-label={`More ${label}`} className="px-2.5 py-1 text-neutral-500 hover:bg-neutral-50 active:bg-neutral-100">+</button>
      </span>
    </div>
  );
}
function Seg({ opts, v, set }: { opts: string[]; v: number; set: (n: number) => void }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl bg-neutral-200/70 p-1">
      {opts.map((o, n) => (
        <button key={o} onClick={() => set(n)} className={`rounded-lg py-2 text-[12.5px] font-semibold transition-colors ${n === v ? "bg-[#dfe3fb] text-[#3b4aa8] ring-1 ring-[#5b6fd6]" : "text-neutral-500"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}
function QuizBuilder() {
  const [q, setQ] = useState([2, 1, 0]);
  const [obj, setObj] = useState(0);
  const [disp, setDisp] = useState(0);
  const [made, setMade] = useState(false);
  const total = q.reduce((a, b) => a + b, 0);
  const lab = "font-label text-[10px] tracking-[0.12em] text-neutral-500 uppercase";
  return (
    <div className="keep-light w-full max-w-[19rem] space-y-3 rounded-3xl bg-white p-4 shadow-[0_24px_50px_-28px_rgba(20,21,59,0.4)] ring-1 ring-black/5">
      {["Multiple choice", "True or false", "Free-response"].map((l, n) => (
        <Stepper key={l} label={l} v={q[n]} set={(v) => { setMade(false); setQ((a) => a.map((x, j) => (j === n ? v : x))); }} />
      ))}
      <div>
        <p className={`${lab} mb-1.5`}>Learning objective</p>
        <Seg opts={["Application", "Memorization"]} v={obj} set={setObj} />
      </div>
      <div>
        <p className={`${lab} mb-1.5`}>Question display</p>
        <Seg opts={["All Questions", "Single"]} v={disp} set={setDisp} />
      </div>
      <p className="flex justify-between border-t border-neutral-200 pt-2.5 text-[13px] text-neutral-700">
        <span>Total number of questions:</span>
        <span className="font-semibold tabular-nums">{total}</span>
      </p>
      <button disabled={total === 0} onClick={() => setMade(true)} className="w-full rounded-full py-2.5 text-[14px] font-semibold text-white transition-[background-color,transform] enabled:active:scale-[0.97]" style={{ background: total === 0 ? "#b9c0ee" : BLUE }}>
        {made ? "Quiz ready ✓" : "Generate Quiz"}
      </button>
    </div>
  );
}

// Learvo: the real study timer. Presets, a custom length, start, and a countdown.
function Timer() {
  const [mins, setMins] = useState(25);
  const [custom, setCustom] = useState(false);
  const [left, setLeft] = useState(25 * 60);
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, [run]);
  const pick = (m: number, isCustom = false) => {
    const v = Math.min(180, Math.max(1, m || 1));
    setMins(v);
    setCustom(isCustom);
    setLeft(v * 60);
    setRun(false);
  };
  const done = left === 0;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const chip = (on: boolean) => `rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold ring-1 transition-colors ${on ? "text-[#3b4aa8] ring-[#5b6fd6]" : "bg-white text-neutral-700 ring-neutral-300"}`;
  return (
    <div className="keep-light w-full max-w-[19rem] rounded-3xl bg-white p-5 text-center shadow-[0_24px_50px_-28px_rgba(20,21,59,0.4)] ring-1 ring-black/5">
      <div className="flex items-center justify-between text-left">
        <p className="text-[15px] font-semibold text-neutral-900">Study Timer</p>
        <span aria-hidden className="text-neutral-400">×</span>
      </div>
      <p className="mt-4 text-[3.4rem] leading-none font-light tracking-[-0.03em] tabular-nums" style={{ color: NAVY }}>{done ? "00:00" : `${mm}:${ss}`}</p>
      <p className="mt-2 text-[11px] font-semibold tracking-[0.16em] uppercase" style={{ color: BLUE }}>{done ? "Time's up" : run ? "Focusing" : "Ready"}</p>
      <div className="mt-4 flex justify-center gap-2">
        <button onClick={() => pick(25)} className={chip(!custom && mins === 25)}>25 min</button>
        <button onClick={() => pick(50)} className={chip(!custom && mins === 50)}>50 min</button>
        <button onClick={() => pick(mins, true)} className={chip(custom)}>Custom</button>
      </div>
      {custom && (
        <label className="mt-3 flex items-center justify-center gap-2 text-[12.5px] text-neutral-600">
          Minutes
          <input type="number" min={1} max={180} value={mins} onChange={(e) => pick(Number(e.target.value), true)} className="w-16 rounded-lg border border-neutral-300 px-2 py-1 text-center tabular-nums outline-none focus:border-[#5b6fd6]" />
        </label>
      )}
      <button onClick={() => (done ? pick(mins, custom) : setRun((r) => !r))} className="mt-4 w-full rounded-full py-2.5 text-[14px] font-semibold text-white transition-transform active:scale-[0.97]" style={{ background: BLUE }}>
        {done ? "Reset" : run ? "Pause Timer" : "Start Timer"}
      </button>
    </div>
  );
}

export default function Lab() {
  return (
    <section id="lab" data-rail="Lab" className="relative bg-background pb-14 sm:pb-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="font-label text-xs font-semibold tracking-widest text-neutral-500 uppercase">(03) Through the looking glass</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
          Curious about the <Em>details</Em>? Click anything.
        </h2>
        <div className="mt-7 grid gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-6">
          <Tile className="lg:col-span-2" i={0} label="Onboarding checklist" note="Learvo. Tick things off, watch the bar.">
            <Checklist />
          </Tile>
          <Tile className="lg:col-span-2" i={1} caption="Timeline states" label="Appointment timeline" note="Continuum. Tap one to finish it.">
            <Timeline />
          </Tile>
          <Tile className="lg:col-span-2" i={2} caption="One tap, no homework" label="Mood check-in" note="Continuum. A sliding highlight, a drawn check.">
            <Mood />
          </Tile>
          <Tile className="lg:col-span-2 lg:col-start-2" i={3} label="Quiz builder" note="Learvo. Set it up, the button wakes at one question.">
            <QuizBuilder />
          </Tile>
          <Tile className="lg:col-span-2" i={4} label="Study timer" note="Learvo. 25, 50 or your own, then focus.">
            <Timer />
          </Tile>
        </div>
      </div>
    </section>
  );
}
