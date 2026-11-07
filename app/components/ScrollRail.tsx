"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

// The home page's scroll indicator: a slim glass line down the left edge with a sphere
// for each section (Intro, Projects, Contact) and a bigger sphere that rides the line as
// you scroll, leaving a gradient fill behind it. Nodes are buttons that scroll to their
// section. Sections opt in with a data-rail="Label" attribute. Wide screens only.
type Stop = { label: string; at: number; el: HTMLElement };

export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const thumbTop = useTransform(progress, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);
  const [stops, setStops] = useState<Stop[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const next = Array.from(document.querySelectorAll<HTMLElement>("[data-rail]")).map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        return {
          label: el.dataset.rail ?? "",
          at: Math.min(1, Math.max(0, (top - 96) / max)),
          el,
        };
      });
      setStops(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let idx = 0;
    stops.forEach((s, i) => {
      if (v >= s.at - 0.04) idx = i;
    });
    setActive(idx);
  });

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed top-[16vh] right-3 bottom-[16vh] z-30 hidden w-6 lg:block"
    >
      <div className="rail-track absolute top-0 bottom-0 left-1/2 w-2.5 -translate-x-1/2 overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-0 origin-top rounded-full"
          style={{
            scaleY: progress,
            background: "linear-gradient(to bottom, #f3cfdc, #b9b6dc 55%, #9fb3da)",
          }}
        />
      </div>

      {stops.map((s, i) => (
        <button
          key={s.label}
          type="button"
          onClick={() => s.el.scrollIntoView({ behavior: "smooth", block: "start" })}
          aria-label={`Go to ${s.label}`}
          aria-current={i === active ? "true" : undefined}
          data-cursor={s.label}
          className="rail-node pointer-events-auto absolute left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ top: `${s.at * 100}%` }}
        >
          <span className="rail-node-orb" data-passed={i <= active} />
        </button>
      ))}

      <motion.span
        className="rail-thumb absolute left-1/2 h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ top: thumbTop }}
      />
    </nav>
  );
}
