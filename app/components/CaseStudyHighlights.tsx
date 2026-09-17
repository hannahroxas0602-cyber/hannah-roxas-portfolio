"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Mockup = {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  tabTitle: string;
  url: string;
};

type Stat = {
  value: string;
  label: string;
};

const BASE_SCALE = 2.4;
const HOVER_SCALE = 3.2;

function ZoomableMockup({ mockup }: { mockup: Mockup }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const clampPan = (x: number, y: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return { x, y };
    // How much the zoomed image can move before its edge would show inside the frame.
    const maxX = (rect.width * (HOVER_SCALE - 1)) / 2;
    const maxY = (rect.height * (HOVER_SCALE - 1)) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  };

  const startDrag = (clientX: number, clientY: number) => {
    setDragging(true);
    dragStart.current = { x: clientX, y: clientY, panX: pan.x, panY: pan.y };
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragging) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    setPan(clampPan(dragStart.current.panX + dx, dragStart.current.panY + dy));
  };

  const endDrag = () => setDragging(false);

  return (
    <div
      ref={frameRef}
      className={`relative aspect-[586/354] w-full touch-none overflow-hidden bg-white select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        setDragging(false);
      }}
      onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
      onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
      onMouseUp={endDrag}
      onTouchStart={(e) => {
        setActive(true);
        const t = e.touches[0];
        if (t) startDrag(t.clientX, t.clientY);
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) moveDrag(t.clientX, t.clientY);
      }}
      onTouchEnd={() => {
        setActive(false);
        endDrag();
      }}
    >
      <Image
        src={mockup.image}
        alt={mockup.imageAlt}
        fill
        className={`object-contain p-8 sm:p-10 ${dragging ? "" : "transition-transform duration-200 ease-out"}`}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${active ? HOVER_SCALE : BASE_SCALE})`,
        }}
        sizes="(min-width: 640px) 800px, 100vw"
        draggable={false}
      />
    </div>
  );
}

export default function CaseStudyHighlights({
  heading,
  mockup,
  outcomes,
  stats,
  callout,
}: {
  heading: string;
  mockup?: Mockup;
  outcomes: string[];
  stats: Stat[];
  callout: string;
}) {
  return (
    <section id="highlights" className="mx-auto max-w-4xl px-6 py-24 sm:px-10 sm:py-32">
      <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-neutral-900 sm:text-4xl">
        {heading}
      </h2>

      <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-500">{callout}</p>

      {/* Browser-chrome mockup — elevated, framed like a real product shot */}
      {mockup && (
        <div className="mt-16 overflow-hidden rounded-3xl border border-black/[0.06] bg-neutral-50 shadow-soft sm:mt-20">
          <div className="flex items-center gap-3 border-b border-black/[0.05] px-5 py-4">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-neutral-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
              <span className="truncate">{mockup.url}</span>
            </div>
          </div>
          <ZoomableMockup mockup={mockup} />
        </div>
      )}

      {/* Outcome cards — numbered, bordered, equal visual weight to the mockup above */}
      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-3 ${mockup ? "mt-6" : "mt-16 sm:mt-20"}`}>
        {outcomes.map((outcome, i) => (
          <div
            key={i}
            className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft"
          >
            <span className="font-[family-name:var(--font-manrope)] text-xs font-semibold tracking-wide text-neutral-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{outcome}</p>
          </div>
        ))}
      </div>

      {/* Stats — connected strip, same card system as outcomes above */}
      <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-black/[0.06] bg-neutral-900 p-8 sm:flex-row sm:gap-16 sm:p-10">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-[family-name:var(--font-manrope)] text-5xl font-semibold text-white">
              {stat.value}
            </p>
            <p className="mt-2 max-w-[12rem] text-sm leading-snug text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
