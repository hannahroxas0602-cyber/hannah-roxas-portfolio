"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { social } from "@/app/data/social";
import { openAboutOnPlainClick, useAboutPanel } from "@/app/components/AboutPanelContext";
import { CURSOR_COLOR } from "@/app/components/CustomCursor";
import { Em } from "@/app/components/Em";

// The bottom of the rabbit hole. When the footer scrolls in, its content lands
// with a small "thump" (a short drop and settle) and the floor shadow spreads.
// Content is fully visible the whole time; only its position settles. Reduced
// motion skips the movement via the site-wide MotionConfig.
const LANDING_VIEWPORT = { once: true, amount: 0.35 } as const;
const THUMP = {
  type: "spring",
  stiffness: 520,
  damping: 17,
  mass: 0.9,
} as const;

export default function Footer() {
  const { open: openAbout } = useAboutPanel();
  const pathname = usePathname();

  return (
    <footer className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-8 sm:px-10 sm:pt-16 sm:pb-10">
        <motion.div
          initial={{ y: -16 }}
          whileInView={{ y: 0 }}
          viewport={LANDING_VIEWPORT}
          transition={THUMP}
        >
          <p className="mb-6 font-display text-lg font-medium tracking-tight text-neutral-900 sm:mb-8 sm:text-xl">
            Thump! The fall is over.
          </p>

          {/* Headline — the focal moment, no card container */}
          <a
            href={`mailto:${social.email}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Email me"
            className="group block"
          >
            <p className="font-label text-xs font-medium tracking-widest text-neutral-500 uppercase">
              Open to full-time Product Designer / Design Engineer roles
            </p>
            <h2
              className="mt-3 font-display leading-[0.95] tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-[var(--footer-hover)]"
              style={
                {
                  fontSize: "clamp(1.75rem, 5vw, 3rem)",
                  "--footer-hover": CURSOR_COLOR,
                } as React.CSSProperties
              }
            >
              <Em>Curiouser</Em> and <Em>curiouser.</Em>{" "}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                className="inline-block h-[0.7em] w-[0.7em] align-[0.05em] transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h2>
            <p className="mt-4 text-sm text-neutral-600 sm:text-base">
              Looking for a full-time Product Designer / Design Engineer role.
              Let&apos;s talk.
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-600 sm:text-base">
              {social.email}
            </p>
          </a>
        </motion.div>

        {/* The clay bunnies hopping along the floor of the hole: an animated PNG,
            so it stays in the clay's own color. Reduce Motion gets a still frame. */}
        <div className="relative mt-6 inline-block">
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet="/clayfooter-still.png" />
            <img
              src="/clayfooter.png"
              alt=""
              width={1000}
              height={303}
              className="relative h-8 w-auto sm:h-11"
            />
          </picture>
        </div>

        {/* Meta row */}
        <div className="mt-8 flex flex-col gap-6 border-t border-black/[0.08] pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-neutral-900">
            © {new Date().getFullYear()} Hannah Roxas
          </span>

          <div className="flex gap-x-8 gap-y-2 sm:gap-x-10">
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              LinkedIn
            </a>
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              GitHub
            </a>
            <Link
              href="/#works"
              onClick={(e) => {
                // Already on the homepage: scroll directly, since a same-URL hash
                // link won't re-scroll once the hash is already set.
                if (pathname !== "/") return;
                const target = document.getElementById("works");
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", "/#works");
              }}
              className="link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              Works
            </Link>
            <Link
              href="/about"
              onClick={(e) => openAboutOnPlainClick(e, openAbout)}
              className="link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
