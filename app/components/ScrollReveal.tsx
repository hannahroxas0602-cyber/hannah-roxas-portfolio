"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// On the case studies, text and pictures arrive as you read.
// - Tablet and desktop: each block of a section lifts into place (the heading, the paragraphs, the figures, one
//   after another within a section).
// - Phone: reading happens in one narrow column, so it goes finer. Every paragraph, list item, heading, figure and
//   quote rises in on its own, in a little cascade when several arrive together. Bold phrases also get a soft
//   highlighter sweep as they come into view.
// - Reduce Motion: the same, but as a calm fade only (nothing moves).
// Anything already on screen when the page arrives is left alone (the page transition handles the first screen),
// so nothing is ever hidden unless it's below the fold. The home page does its own thing.
const LEAF = "h1,h2,h3,h4,p,li,figure,blockquote,dl,table";
const SKIP = "nav,header,footer,aside,[role='dialog'],[data-no-reveal]";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.matchMedia("(max-width: 639px)").matches;

    let io: IntersectionObserver | null = null;
    const cleanups: (() => void)[] = [];
    const timer = setTimeout(() => {
      const main = document.querySelector("main");
      if (!main) return;
      const fold = window.innerHeight * 1.02;
      io = new IntersectionObserver(
        (entries) => {
          let n = 0;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            if (el.classList.contains("leaf")) el.style.setProperty("--reveal-delay", `${Math.min(n++, 4) * 70}ms`);
            el.classList.add("reveal-in");
            io?.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      const mark = (el: HTMLElement, i: number, leaf: boolean) => {
        el.classList.add("reveal-pre");
        if (leaf) el.classList.add("leaf");
        if (reduce) el.classList.add("fade-only");
        el.style.setProperty("--reveal-delay", `${Math.min(i, 4) * 70}ms`);
        io?.observe(el);
      };
      if (phone) {
        // finer: each outermost paragraph, list item, heading, figure or quote on its own
        main.querySelectorAll<HTMLElement>(LEAF).forEach((el, i) => {
          if (el.closest(SKIP)) return;
          if (el.parentElement?.closest(LEAF) && main.contains(el.parentElement.closest(LEAF))) return;
          if (el.getBoundingClientRect().top + window.scrollY < fold) return;
          if (el.classList.contains("reveal-pre")) return;
          mark(el, i % 5, true);
        });
      } else {
        main.querySelectorAll<HTMLElement>("section").forEach((section) => {
          if (section.parentElement?.closest("section")) return;
          Array.from(section.children).forEach((child, i) => {
            const el = child as HTMLElement;
            if (el.classList.contains("reveal-pre") || el.tagName === "SCRIPT") return;
            if (el.getBoundingClientRect().top + window.scrollY < fold) return;
            mark(el, i, false);
          });
        });
      }
      // Bold phrases (the run-in labels and strong words inside a paragraph or list item) get a highlighter sweep as they
      // come into view.
      const hlIo = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).classList.add("hl-in");
            hlIo.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.6 },
      );
      main.querySelectorAll<HTMLElement>("p strong, p b, p > span[class*='font-semibold'], li > span[class*='font-semibold']").forEach((el) => {
        if (el.closest(SKIP) || getComputedStyle(el).display !== "inline") return;
        el.classList.add("hl-pre");
        hlIo.observe(el);
      });
      cleanups.push(() => hlIo.disconnect());
      // Pictures wipe in as they arrive: a soft upward clip that opens, with a slight settle.
      const imgIo = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).classList.add("img-in");
            imgIo.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
      );
      main.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        if (reduce) return;
        const r = img.getBoundingClientRect();
        if (r.width < 240 || r.top + window.scrollY < fold) return;
        img.classList.add("img-pre");
        imgIo.observe(img);
      });
      cleanups.push(() => imgIo.disconnect());
    }, 700);

    return () => {
      cleanups.forEach((f) => f());
      document.querySelectorAll(".img-pre").forEach((el) => el.classList.remove("img-pre", "img-in"));
      document.querySelectorAll(".hl-pre").forEach((el) => el.classList.remove("hl-pre", "hl-in"));
      clearTimeout(timer);
      io?.disconnect();
      document.querySelectorAll(".reveal-pre").forEach((el) => el.classList.remove("reveal-pre", "reveal-in", "leaf", "fade-only"));
    };
  }, [pathname]);

  return null;
}
