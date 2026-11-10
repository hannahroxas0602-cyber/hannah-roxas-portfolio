"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { social } from "@/app/data/social";
import { openAboutOnPlainClick, useAboutPanel } from "@/app/components/AboutPanelContext";

// A teapot in silhouette with three curls of steam that rise and fade, one after another.
function Teapot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 104" className={className} fill="currentColor" aria-hidden>
      {[46, 62, 78].map((x, i) => (
        <motion.path key={x} d={`M${x} 18c-5-4 5-8 0-13`} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth="2.4" strokeLinecap="round" initial={{ opacity: 0, y: 4 }} animate={{ opacity: [0, 0.9, 0], y: [4, -4, -8] }} transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }} />
      ))}
      <ellipse cx="62" cy="62" rx="36" ry="27" />
      <ellipse cx="62" cy="36" rx="21" ry="5.5" />
      <circle cx="62" cy="29" r="4.2" />
      <path d="M95 56C108 54 112 42 122 33L126 38C119 50 114 66 95 72z" />
      <path d="M28 50C6 44 4 78 31 76" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <rect x="38" y="86" width="48" height="7" rx="3.5" />
    </svg>
  );
}

// A slim footer: one line saying I'm available with my email (click to copy), the links, and the small print.
// `compact` drops the contact line, for pages that have already said it.
export default function Footer({ compact = false }: { compact?: boolean; aside?: ReactNode }) {
  const { open: openAbout } = useAboutPanel();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${social.email}`;
    }
  };
  const link = "link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950";

  return (
    <footer id={compact ? undefined : "contact"} data-rail={compact ? undefined : "Contact"} className="relative scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-7 sm:px-10">
        {!compact && (
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 pt-4">
            <div aria-hidden className="flex w-full items-center gap-4 text-neutral-900">
              <span className="h-px flex-1 bg-neutral-300/70" />
              <Teapot className="h-20 w-auto" />
              <span className="h-px flex-1 bg-neutral-300/70" />
            </div>
            <p className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium tracking-[-0.03em] text-neutral-950">
              It&apos;s always tea time. Open to full-time roles.{" "}
              <button type="button" onClick={copy} data-cursor={copied ? "Copied" : "Copy email"} className="group relative text-neutral-500 transition-colors hover:text-neutral-950">
                <span className="link-underline">{copied ? "Copied to clipboard ✓" : social.email}</span>
              </button>
            </p>
            <div className="flex items-center gap-6">
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="Connect" className={link}>LinkedIn</a>
              <a href={social.github} target="_blank" rel="noopener noreferrer" data-cursor="See my code" className={link}>GitHub</a>
              <a href={social.resume} target="_blank" rel="noopener noreferrer" data-cursor="Resume" className={link}>Resume</a>
            </div>
          </div>
        )}
        <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${compact ? "border-t border-neutral-300/70 pt-6" : "mt-6"}`}>
          <span className="text-[13px] text-neutral-500">© {new Date().getFullYear()} Hannah Roxas · thanks for stopping by for tea</span>
          <div className="flex gap-6 sm:pr-20">
            <Link
              href="/#works"
              onClick={(e) => {
                if (pathname !== "/") return;
                const target = document.getElementById("works");
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", "/#works");
              }}
              className={link}
            >
              Works
            </Link>
            <Link href="/about" onClick={(e) => openAboutOnPlainClick(e, openAbout)} className={link}>About</Link>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={link}>Back up ↑</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
