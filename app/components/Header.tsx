"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HoleLink from "@/app/components/HoleLink";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { navLinks } from "@/app/data/social";
import { openAboutOnPlainClick, useAboutPanel } from "@/app/components/AboutPanelContext";

const glassEdge =
  "border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150";
const glass = `bg-white/85 ${glassEdge}`;
const linkBase = "relative rounded-full px-4 py-1.5 text-sm font-medium text-black transition-colors";

// Past this scroll distance the logo shrinks into its chip.
const SCROLLED_PX = 24;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

// The full-screen mobile menu: links rise in one after another.
const menuList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
// The mobile menu is a crooked signpost, like the one Alice meets at the fork: boards nailed to a pole at
// odd angles, each swinging in from one side and settling.
// Arrows alternate black and blue; the text takes the other colour.
const SIGN = [
  { fill: "#0b0b0d", ink: "#8fc4c9" },
  { fill: "#8fc4c9", ink: "#0b0b0d" },
];
const menuItem = {
  hidden: (i: number) => ({ opacity: 0, x: i % 2 ? 40 : -40 }),
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
};

export default function Header() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLLED_PX,
    () => false,
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openAbout } = useAboutPanel();
  const pathname = usePathname();
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
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="pointer-events-auto fixed inset-0 bg-white/50 backdrop-blur-[3px] md:hidden"
            >
              {/* Arrow signs, like the ones at the fork in the road: wavy boards pointing left and right,
                  stacked under the menu button. They don't cover the page, just hang over it. */}
              <motion.nav variants={menuList} initial="hidden" animate="show" onClick={(e) => e.stopPropagation()} className="absolute top-[4.6rem] right-4 flex w-[15.5rem] flex-col gap-1.5">
                {navLinks.map((link, i) => {
                  const active = link.kind === "internal" && link.href === pathname;
                  const left = i % 2 === 0;
                  const row = "group relative block h-[3.6rem] text-neutral-950 transition-transform active:scale-[0.97]";
                  const inner = (
                    <>
                      <svg aria-hidden viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" style={{ transform: left ? "scaleX(-1)" : undefined }}>
                        <path
                          d="M6 15C42 8 84 21 142 12L140 2L196 30L140 58L142 47C90 55 48 42 6 51C14 39 14 27 6 15z"
                          fill={SIGN[i % 2].fill}
                        />
                      </svg>
                      <span style={{ color: SIGN[i % 2].ink }} className={`relative flex h-full items-center gap-1.5 font-display text-[1.15rem] font-semibold tracking-tight leading-none ${left ? "justify-end pr-11 pl-5" : "justify-start pr-5 pl-11"}`}>
                        {link.label}
                        {active && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
                      </span>
                    </>
                  );
                  return (
                    <motion.div key={link.label} custom={i} variants={menuItem} style={{ transformOrigin: left ? "100% 50%" : "0% 50%" }}>
                      {link.kind === "about" ? (
                        <Link href={link.href} onClick={(e) => { closeMenu(); openAboutOnPlainClick(e, openAbout); }} className={row}>
                          {inner}
                        </Link>
                      ) : link.kind === "external" ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className={row}>
                          {inner}
                        </a>
                      ) : (
                        <Link href={link.href} onClick={closeMenu} className={row} aria-current={active ? "page" : undefined}>
                          {inner}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

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
          {/* Desktop nav */}
          <nav
            className={`pointer-events-auto hidden items-center gap-1 rounded-full p-1.5 md:flex ${glass}`}
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const pill = hovered === link.label && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-black/[0.06]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              );

              if (link.kind === "about") {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => openAboutOnPlainClick(e, openAbout)}
                    onMouseEnter={() => setHovered(link.label)}
                    className={linkBase}
                  >
                    {pill}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              }

              if (link.kind === "external") {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHovered(link.label)}
                    // The resume is the one thing recruiters come for, so it is the one
                    // solid button in the nav.
                    className={
                      link.label === "Resume"
                        ? "resume-gradient relative ml-1 rounded-full px-4 py-1.5 text-sm font-medium text-neutral-950"
                        : linkBase
                    }
                  >
                    {link.label === "Resume" ? null : pill}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.label)}
                  className={linkBase}
                >
                  {pill}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

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
