"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import HoleLink from "@/app/components/HoleLink";
import MobileMenu from "@/app/components/MobileMenu";
import DesktopNav from "@/app/components/DesktopNav";
import ThemeToggle from "@/app/components/ThemeToggle";
import { MotionConfig, motion } from "motion/react";

const glassEdge =
  "border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150";
const glass = `bg-white/85 ${glassEdge}`;

// Past this scroll distance the logo shrinks into its chip.
const SCROLLED_PX = 24;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export default function Header() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLLED_PX,
    () => false,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  // The logo floats while the pointer is on it. Leaving doesn't cut the motion off:
  // the current bob finishes first, so it settles back instead of snapping.
  const [floating, setFloating] = useState(false);
  const leaving = useRef(false);

  // While the menu is open: the page behind it doesn't scroll, Escape closes it,
  // and growing the window to desktop width closes it (the desktop nav takes over).
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      html.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    // The menu opening and the nav pill are small, tap-triggered UI motion, so
    // they keep animating under Reduce Motion (which otherwise makes them snap).
    <MotionConfig reducedMotion="never">
      {/* The logo and the nav both stay put as you scroll: the logo in the left
          corner, the nav in the right. The logo is big and free-standing at the
          top of the page; once you scroll it shrinks into a frosted chip so it
          stays readable over content. The header ignores the pointer; only the
          logo, the nav, and the open menu take it. */}
      <header
        className="pointer-events-none sticky top-0 z-50 h-20 w-full"
        style={{ viewTransitionName: "site-header" }}
      >
        {/* Mobile menu: a full-screen sheet under the logo and the button, which
            stay on top so you can always close it or go home. */}
        <MobileMenu open={menuOpen} onClose={closeMenu} />

        <div className="relative z-10">
          <HoleLink
            direction="out"
            href="/"
            aria-label="Hannah Roxas, home"
            onClick={closeMenu}
            onPointerEnter={() => {
              leaving.current = false;
              setFloating(true);
            }}
            onPointerLeave={() => {
              leaving.current = true;
            }}
            className={`group pointer-events-auto absolute top-4 left-5 block transition-all duration-300 ease-out sm:left-8 ${
              scrolled
                ? `h-[3.25rem] w-20 rounded-2xl p-2 ${glass}`
                : "h-14 w-24 rounded-2xl border border-transparent p-0 sm:h-[4.5rem] sm:w-[7.75rem]"
            }`}
          >
            {/* Floats while hovered, then settles at the end of the current bob. */}
            <span
              className={`block h-full w-full ${floating ? "logo-float" : ""}`}
              onAnimationIteration={() => leaving.current && setFloating(false)}
            >
              <Image
                src="/images/logo.webp"
                alt=""
                width={800}
                height={458}
                sizes="124px"
                className="h-full w-full object-contain"
                priority
              />
            </span>
          </HoleLink>
          <div className="flex justify-end px-5 pt-4 md:px-8">
          <DesktopNav />

            <ThemeToggle className="mr-2 md:hidden" />
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`pointer-events-auto flex h-12 w-12 flex-none flex-col items-center justify-center gap-1.5 rounded-full md:hidden ${glass}`}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 3.5 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-5 bg-black"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -3.5 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-5 bg-black"
              />
            </button>
          </div>
        </div>
      </header>
    </MotionConfig>
  );
}
