"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import CaseStudySection, { darkTile, lightTile } from "@/app/components/CaseStudySection";

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
    <CaseStudySection id="highlights" kicker="At a glance" heading={heading} intro={callout}>
      {/* The numbers first: one dark tile per stat. */}
      <div className={`grid grid-cols-1 gap-2.5 ${stats.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {stats.map((stat) => (
          <div key={stat.label} className={`${darkTile} p-7 sm:p-8`}>
            <p className="font-display text-6xl font-semibold text-white sm:text-7xl">{stat.value}</p>
            <p className="mt-3 max-w-[16rem] text-sm leading-snug text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Browser-chrome mockup, framed like a real product shot */}
      {mockup && (
        <div className="mt-2.5 overflow-hidden rounded-3xl border border-black/[0.06] bg-neutral-50">
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

      {/* What changed: a check and a line each */}
      <ul className={`mt-2.5 grid grid-cols-1 gap-2.5 ${outcomes.length % 2 === 0 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {outcomes.map((outcome, i) => (
          <li key={i} className={`${lightTile} flex gap-3 p-5`}>
            <span
              aria-hidden
              className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
            >
              <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            </span>
            <p className="text-sm leading-relaxed text-neutral-700">{outcome}</p>
          </li>
        ))}
      </ul>
    </CaseStudySection>
  );
}
