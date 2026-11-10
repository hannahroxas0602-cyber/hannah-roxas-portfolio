"use client";

import { useEffect, useState } from "react";

// A round button for light / dark. The class lives on <html> (set before paint by a script in layout.tsx);
// the choice is remembered. It swaps a sun and a moon.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const flip = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("hannah-theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={flip}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      data-cursor={dark ? "Light" : "Dark"}
      className={`pointer-events-auto grid size-11 place-items-center rounded-full bg-white/85 text-neutral-950 ring-1 ring-black/[0.06] backdrop-blur-xl transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-[1.15rem]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />
        )}
      </svg>
    </button>
  );
}
