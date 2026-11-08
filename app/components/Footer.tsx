"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import TeaTable, { Cookie } from "@/app/components/TeaTable";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { social } from "@/app/data/social";
import { openAboutOnPlainClick, useAboutPanel } from "@/app/components/AboutPanelContext";
import Melt from "@/app/components/Melt";

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

// `compact` drops the big contact block, for pages that have already said it. Beside it, on every page,
// sits the tea set in silhouette and the biscuit that copies my email (TeaTable); `aside` swaps that.
export default function Footer({ compact = false, aside }: { compact?: boolean; aside?: ReactNode }) {
  // Every page ends with the tea set and the biscuit, unless a page passes something else.
  const side = aside ?? (compact ? null : <TeaTable />);
  const { open: openAbout } = useAboutPanel();
  const pathname = usePathname();

  return (
    <footer id={compact ? undefined : "contact"} data-rail={compact ? undefined : "Contact"} className="relative scroll-mt-24 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-8 sm:px-10 sm:pt-16 sm:pb-10">
        <div className={side ? "grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]" : ""}>
        {!compact && (
        <motion.div initial={{ y: -16 }} whileInView={{ y: 0 }} viewport={LANDING_VIEWPORT} transition={THUMP}>
          <p className="inline-flex items-center gap-2 font-label text-xs font-medium tracking-widest text-neutral-600 uppercase">
            <span aria-hidden className="size-2 rounded-full bg-[#3ec3ff] shadow-[0_0_0_4px_rgba(62,195,255,0.25)]" />
            Open to full-time roles
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-neutral-950">
            <Melt as="span" className="block">
              Product Designer<br />
              <em className="welcome font-normal">&amp; Design Engineer.</em>
            </Melt>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600">
            If you need someone who can take a product from research to shipped code, let&apos;s talk.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-4">
            <a
              href={`mailto:${social.email}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Email me"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Email me <span aria-hidden>↗</span>
            </a>
            <a
              href={social.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Resume"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
            >
              Resume
            </a>
            <Cookie />
          </div>
          <p className="mt-5 text-sm text-neutral-500">{social.email}</p>
        </motion.div>
        )}
        {side}
        </div>

        {/* The clay bunnies hopping along the floor of the hole: an animated PNG,
            so it stays in the clay's own color. Reduce Motion gets a still frame. */}
        <div className="relative mt-6 inline-block">
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet="/footer-bunnies-still.png" />
            <img
              src="/footer-bunnies.png"
              alt=""
              width={1000}
              height={306}
              className="relative h-7 w-auto sm:h-9"
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
              data-cursor="Connect"
              className="link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              LinkedIn
            </a>
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="See my code"
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
