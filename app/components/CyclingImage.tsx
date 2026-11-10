"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import FitMedia from "@/app/components/FitMedia";
import type { Project } from "@/app/data/projects";

// A project's pictures, one at a time, changing every couple of seconds while `playing`. Shown whole
// (contained), never cropped. Videos in a gallery play in place of a still.
export default function CyclingImage({ project, playing = true, className = "", interval = 1500 }: { project: Project; playing?: boolean; className?: string; interval?: number }) {
  const list = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!playing || list.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % list.length), interval);
    return () => clearInterval(id);
  }, [playing, list.length, interval]);
  const src = list[Math.min(i, list.length - 1)];
  return (
    <div className={`relative overflow-hidden bg-panel-2 ${className}`}>
      <AnimatePresence mode="sync">
        <motion.div key={project.slug + src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0">
          <FitMedia src={src} backdrop={src.endsWith(".mp4") ? project.image : src} width={project.imageWidth} height={project.imageHeight} alt={project.imageAlt} sizes="(min-width: 768px) 28rem, 90vw" />
        </motion.div>
      </AnimatePresence>
      {list.length > 1 && (
        <span aria-hidden className="absolute right-2.5 bottom-2.5 z-10 flex gap-1">
          {list.map((_, k) => (
            <span key={k} className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-4 bg-neutral-950" : "w-1 bg-neutral-950/25"}`} />
          ))}
        </span>
      )}
    </div>
  );
}
