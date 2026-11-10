"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// On the case studies, each block of a section lifts into place as it scrolls into view: the
// heading, the paragraphs, the figures, one after another within a section. It's done once, here,
// for every page, instead of wrapping the content of each one. Anything already on screen when
// the page arrives is left alone (the page transition handles the first screen), so nothing is
// ever hidden unless it's below the fold. The home page does its own thing, and Reduce Motion
// skips all of this.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let io: IntersectionObserver | null = null;
    const cleanups: (() => void)[] = [];
    const timer = setTimeout(() => {
      const main = document.querySelector("main");
      if (!main) return;
      const fold = window.innerHeight * 1.02;
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).classList.add("reveal-in");
            io?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      main.querySelectorAll<HTMLElement>("section").forEach((section) => {
        if (section.parentElement?.closest("section")) return;
        Array.from(section.children).forEach((child, i) => {
          const el = child as HTMLElement;
          if (el.classList.contains("reveal-pre") || el.tagName === "SCRIPT") return;
          if (el.getBoundingClientRect().top + window.scrollY < fold) return;
          el.classList.add("reveal-pre");
          el.style.setProperty("--reveal-delay", `${Math.min(i, 4) * 70}ms`);
          io?.observe(el);
        });
      });
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
      clearTimeout(timer);
      io?.disconnect();
      document.querySelectorAll(".reveal-pre").forEach((el) => el.classList.remove("reveal-pre", "reveal-in"));
    };
  }, [pathname]);

  return null;
}
