"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type CaseStudySection = {
  id: string;
  title: string;
  children?: CaseStudySection[];
};

export default function CaseStudyNav({ sections }: { sections: CaseStudySection[] }) {
  const [activeId, setActiveId] = useState("");
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const rows = useMemo(
    () =>
      sections.flatMap((s) => [
        { s, depth: 0 },
        ...(s.children ?? []).map((c) => ({ s: c, depth: 1 })),
      ]),
    [sections],
  );
  const activeIndex = rows.findIndex((r) => r.s.id === activeId);
  const desktopRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [fillHeight, setFillHeight] = useState(0);

  // The fill reaches the middle of the active row. Rows are positioned against the
  // rail wrapper (the nearest positioned ancestor), so offsetTop is already relative.
  useEffect(() => {
    const el = desktopRefs.current.get(activeId);
    setFillHeight(el ? el.offsetTop + el.offsetHeight / 2 : 0);
  }, [activeId]);

  const flatSections = useMemo(
    () => sections.flatMap((s) => [s, ...(s.children ?? [])]),
    [sections],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-10px 0px -90% 0px", threshold: 0 },
    );

    flatSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [flatSections]);

  // Keep the active pill in view within the horizontal mobile bar as the page scrolls.
  useEffect(() => {
    const activeEl = itemRefs.current.get(activeId);
    const container = mobileScrollRef.current;
    if (!activeEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
      const scrollOffset =
        activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2;
      container.scrollTo({ left: scrollOffset, behavior: "smooth" });
    }
  }, [activeId]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* Mobile: fixed horizontal scroll bar, pinned to the bottom of the viewport */}
      <nav data-bottom-bar className="fixed right-0 bottom-0 left-0 z-30 border-t border-black/[0.06] bg-background/95 py-3 backdrop-blur-sm md:hidden">
        <div
          ref={mobileScrollRef}
          className="scrollbar-none flex gap-5 overflow-x-auto px-6 sm:px-10"
        >
          {flatSections.map((s) => (
            <button
              key={s.id}
              ref={(el) => {
                if (el) itemRefs.current.set(s.id, el);
                else itemRefs.current.delete(s.id);
              }}
              onClick={() => scrollTo(s.id)}
              className={`shrink-0 cursor-pointer text-left text-sm whitespace-nowrap transition-colors duration-150 ease-in-out ${
                activeId === s.id
                  ? "font-medium text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Room for this bar at the end of the page is added under the footer in
          globals.css ([data-bottom-bar]), so it never covers the footer links. */}

      {/* Desktop: sticky vertical rail. A sphere per section on a glass line; the gradient
          fill climbs to the section you're in, and the ones behind you stay lit. */}
      <nav
        aria-label="Sections"
        className="hidden md:sticky md:top-28 md:block md:h-fit md:w-44 md:shrink-0"
      >
        <div className="relative pl-7">
          <span
            aria-hidden
            className="rail-track absolute top-1 bottom-1 left-[3px] w-[5px] overflow-hidden rounded-full"
          >
            <span
              className="absolute inset-x-0 top-0 rounded-full transition-[height] duration-500 ease-out"
              style={{
                height: fillHeight,
                background: "linear-gradient(to bottom, #cfe6e9, #a4d3d6 55%, #9fc3ee)",
              }}
            />
          </span>
          <div className="flex flex-col items-start gap-3">
            {rows.map(({ s, depth }, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  if (el) desktopRefs.current.set(s.id, el);
                  else desktopRefs.current.delete(s.id);
                }}
                onClick={() => scrollTo(s.id)}
                aria-current={activeId === s.id ? "location" : undefined}
                className={`group/node relative cursor-pointer text-left transition-[color,transform] duration-300 ease-out hover:translate-x-0.5 ${
                  depth ? "ml-3 text-xs" : "text-sm"
                } ${
                  activeId === s.id
                    ? "font-medium text-neutral-900"
                    : i < activeIndex
                      ? "text-neutral-600"
                      : "text-neutral-400 hover:text-neutral-700"
                }`}
              >
                <span
                  aria-hidden
                  className={`rail-dot absolute top-1/2 -translate-y-1/2 ${depth ? "size-[9px]" : "size-[13px]"}`}
                  // Centered on the track: the track sits 5.5px in from the rail's left edge.
                  style={{ left: depth ? "-2.44rem" : "-1.8rem" }}
                  data-state={activeId === s.id ? "active" : i < activeIndex ? "passed" : "idle"}
                />
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
