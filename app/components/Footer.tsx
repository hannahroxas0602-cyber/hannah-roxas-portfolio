"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { social } from "@/app/data/social";
import { openAboutOnPlainClick, useAboutPanel } from "@/app/components/AboutPanelContext";
import FooterScene from "@/app/components/FooterScene";

// The footer: a hand-drawn tea party (FooterScene) with the line and my email inside it, then the links and the
// small print. `compact` drops the scene, for pages that have already said it.
export default function Footer({ compact = false }: { compact?: boolean; aside?: ReactNode }) {
  const { open: openAbout } = useAboutPanel();
  const pathname = usePathname();
  const link = "link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950";

  return (
    <footer id={compact ? undefined : "contact"} data-rail={compact ? undefined : "Contact"} className="relative scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl pt-10">
        {!compact && <FooterScene />}
        <div className={`flex flex-col gap-4 px-6 pb-7 sm:flex-row sm:items-center sm:justify-between sm:px-10 ${compact ? "border-t border-neutral-300/70 pt-6" : "pt-6"}`}>
          <span className="text-[13px] text-neutral-500">© {new Date().getFullYear()} Hannah Roxas · thanks for stopping by for tea</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pr-16 sm:pr-20">
            {!compact && (
              <>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="Connect" className={link}>LinkedIn</a>
                <a href={social.github} target="_blank" rel="noopener noreferrer" data-cursor="See my code" className={link}>GitHub</a>
                <a href={social.resume} target="_blank" rel="noopener noreferrer" data-cursor="Resume" className={link}>Resume</a>
              </>
            )}
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
