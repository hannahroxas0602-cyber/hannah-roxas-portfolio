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

  const isChildActive = (s: CaseStudySection) =>
    activeId === s.id || (s.children?.some((c) => c.id === activeId) ?? false);

  return (
    <>
      {/* Mobile: fixed horizontal scroll bar, pinned to the bottom of the viewport */}
      <nav className="fixed right-0 bottom-0 left-0 z-30 border-t border-black/[0.06] bg-background/95 py-3 backdrop-blur-sm md:hidden">
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

      {/* Spacer so fixed bottom bar doesn't cover page content on mobile */}
      <div className="h-14 shrink-0 md:hidden" aria-hidden />

      {/* Desktop: sticky vertical sidebar */}
      <nav className="hidden md:sticky md:top-28 md:block md:h-fit md:w-40 md:shrink-0">
        <div className="flex flex-col items-start gap-2.5">
          {sections.map((s) => (
            <div key={s.id} className="w-full">
              <button
                onClick={() => scrollTo(s.id)}
                className={`cursor-pointer text-left text-sm transition-colors duration-150 ease-in-out ${
                  isChildActive(s)
                    ? "font-medium text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {s.title}
              </button>

              {s.children && (
                <div className="mt-2 flex flex-col items-start gap-2 border-l border-black/[0.08] pl-3">
                  {s.children.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => scrollTo(c.id)}
                      className={`cursor-pointer text-left text-xs transition-colors duration-150 ease-in-out ${
                        activeId === c.id
                          ? "font-medium text-neutral-900"
                          : "text-neutral-400 hover:text-neutral-600"
                      }`}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
