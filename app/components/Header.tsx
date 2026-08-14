"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { navLinks } from "@/app/data/social";
import { CURSOR_COLOR } from "@/app/components/CustomCursor";

export default function Header() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white/70 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150 sm:px-8">
          <Link href="/" className="group relative block h-9 w-14 shrink-0">
            <Image
              src="/images/logo-mark.webp"
              alt="Hannah Roxas"
              width={77}
              height={50}
              className="h-full w-full object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
              priority
            />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                backgroundColor: CURSOR_COLOR,
                WebkitMaskImage: "url(/images/logo-mark.webp)",
                maskImage: "url(/images/logo-mark.webp)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 rounded-full bg-black/[0.03] p-1 sm:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHovered(link.label)}
                className="relative rounded-full px-4 py-1.5 text-sm font-medium text-black transition-colors"
              >
                {hovered === link.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 flex-none flex-col items-center justify-center gap-1.5 sm:hidden"
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

        {/* Mobile dropdown panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden sm:hidden"
            >
              <nav className="mt-2 flex flex-col gap-1 rounded-2xl border border-black/[0.06] bg-white/70 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-black transition-colors hover:bg-black/[0.03]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
