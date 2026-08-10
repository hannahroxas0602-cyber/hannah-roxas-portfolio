"use client";

import { useCallback, useEffect, useState } from "react";

export type CaseStudySection = {
  id: string;
  title: string;
};

export default function CaseStudyNav({ sections }: { sections: CaseStudySection[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-10px 0px -90% 0px", threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav className="hidden md:sticky md:top-28 md:block md:h-fit md:w-40 md:shrink-0">
      <div className="flex flex-col items-start gap-2.5">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`cursor-pointer text-left text-sm transition-colors duration-150 ease-in-out ${
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
  );
}
