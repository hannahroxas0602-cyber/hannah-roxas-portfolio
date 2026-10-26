"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import HoleLink from "@/app/components/HoleLink";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { navLinks } from "@/app/data/social";
import { openAboutOnPlainClick, useAboutPanel } from "@/app/components/AboutPanelContext";

const glassEdge =
  "border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150";
const glass = `bg-white/85 ${glassEdge}`;
const linkBase = "relative rounded-full px-4 py-1.5 text-sm font-medium text-black transition-colors";
const mobileLink =
  "rounded-xl px-4 py-3 text-left text-base font-medium text-black transition-colors hover:bg-black/[0.03]";

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
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openAbout } = useAboutPanel();

  return (
    // The menu opening and the nav pill are small, tap-triggered UI motion, so
    // they keep animating under Reduce Motion (which otherwise makes them snap).
    <MotionConfig reducedMotion="never">
      {/* The logo and the nav both stay put as you scroll: the logo in the left
          corner, the nav in the right. The logo is big and free-standing at the
          top of the page; once you scroll it shrinks into a frosted chip so it
          stays readable over content. The header ignores the
          pointer; only the logo and the nav take it. */}
      <header
        className="pointer-events-none sticky top-0 z-50 h-20 w-full"
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="relative">
          <HoleLink
            direction="out"
            href="/"
            aria-label="Hannah Roxas, home"
            className={`group pointer-events-auto absolute top-4 left-5 block transition-all duration-300 ease-out sm:left-8 ${
              scrolled
                ? `h-[3.25rem] w-20 rounded-2xl p-2 ${glass}`
                : "h-14 w-24 rounded-2xl border border-transparent p-0 sm:h-[4.5rem] sm:w-[7.75rem]"
            }`}
          >
            <Image
              src="/images/claylogo.webp"
              alt=""
              width={800}
              height={463}
              sizes="124px"
              className="logo-clay h-full w-full object-contain"
              priority
            />
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
                    className={linkBase}
                  >
                    {pill}
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

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
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

        {/* Mobile dropdown panel: floats under the button, over the page */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              // Eases in as well as out, so the panel opens gradually.
              transition={{ duration: 0.5, ease: [0.45, 0, 0.15, 1] }}
              className="pointer-events-auto absolute top-[4.75rem] right-5 w-[min(18rem,calc(100vw-2.5rem))] overflow-hidden md:hidden"
            >
              <nav className={`flex flex-col gap-1 rounded-2xl bg-white p-3 ${glassEdge}`}>
                {navLinks.map((link) =>
                  link.kind === "about" ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        setMenuOpen(false);
                        openAboutOnPlainClick(e, openAbout);
                      }}
                      className={mobileLink}
                    >
                      {link.label}
                    </Link>
                  ) : link.kind === "external" ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className={mobileLink}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={mobileLink}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
