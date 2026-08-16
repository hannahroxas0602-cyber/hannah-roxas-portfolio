"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useAboutPanel } from "@/app/components/AboutPanelContext";
import { experience } from "@/app/about/data";
import { social } from "@/app/data/social";

const tools = [
  { name: "Figma", slug: "figma" },
  { name: "Adobe CC", slug: "adobecreativecloud" },
  { name: "Slack", slug: "slack" },
  { name: "GitHub", slug: "github" },
  { name: "Cursor", slug: "cursor" },
  { name: "Notion", slug: "notion" },
  { name: "Linear", slug: "linear" },
  { name: "VS Code", slug: "visualstudiocode" },
];

export default function AboutPanel({ width }: { width: number }) {
  const { isOpen, close } = useAboutPanel();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Invisible click-catcher — closes the panel on outside tap, no visual overlay */}
          <div onClick={close} className="fixed inset-0 z-[90]" />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            style={
              {
                "--panel-width": `${width}px`,
                maxHeight: "calc(100svh - 2rem)",
              } as React.CSSProperties
            }
            className="fixed inset-4 z-[91] flex flex-col gap-2 overflow-y-auto overscroll-contain rounded-3xl border border-white/40 bg-neutral-100 p-3 shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:inset-y-0 sm:inset-x-auto sm:right-0 sm:w-[var(--panel-width)] sm:max-w-[92vw] sm:max-h-none sm:gap-3 sm:overflow-visible sm:rounded-none sm:border-0 sm:border-l sm:border-l-white/40 sm:p-5"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close about panel"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/70 text-lg text-white shadow-md backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-black/85 sm:top-5 sm:right-5"
            >
              ×
            </button>

            {/* Photo + name inline, bio below */}
            <div className="rounded-2xl bg-white p-4 pr-12 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src="/images/hero/inline-photo.webp"
                    alt="Hannah Roxas"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <p className="font-[family-name:var(--font-manrope)] text-base font-semibold text-neutral-900">
                  Hannah Roxas
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                A curious, detail-obsessed designer who treats every project like a rabbit hole
                worth falling into.
              </p>
            </div>

            {/* Tool marquee — real logos + names via Simple Icons, scrolling in one line */}
            <div className="overflow-hidden rounded-2xl bg-white py-4 sm:py-5">
              <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center">
                {[...tools, ...tools].map((tool, i) => (
                  <div
                    key={`${tool.slug}-${i}`}
                    className="flex shrink-0 items-center gap-2.5 px-4"
                  >
                    <span
                      aria-hidden
                      className="h-5 w-5 shrink-0 bg-[#E85FE0]"
                      style={{
                        WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tool.slug}.svg)`,
                        maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tool.slug}.svg)`,
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                      }}
                    />
                    <span className="text-sm font-medium whitespace-nowrap text-[#E85FE0]">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline — one minimal, non-scrolling section with a connecting rail */}
            <div className="rounded-2xl bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-mono)] text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                  Experience
                </p>
                <a
                  href="/Hannah%20Roxas%20Product%20Design%20Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="View resume"
                  className="link-underline inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900"
                >
                  Resume
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-[0.9em] w-[0.9em]"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <div className="relative mt-3 flex flex-col gap-3 sm:mt-4 sm:gap-4">
                <div className="absolute top-1 bottom-1 left-[3px] w-px bg-neutral-200" />
                {experience.map((entry, i) => (
                  <div
                    key={entry.slug}
                    className="relative flex items-baseline justify-between gap-3 pl-5"
                  >
                    <span
                      className={`absolute top-1.5 left-0 h-[7px] w-[7px] rounded-full ring-4 ring-white ${
                        i === 0 ? "bg-[#E85FE0]" : "bg-neutral-300"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-neutral-900">
                        {entry.role}
                      </p>
                      <p className="truncate text-xs text-neutral-500">{entry.context}</p>
                    </div>
                    <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-neutral-400">
                      {entry.dates}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact — pinned to the bottom */}
            <div className="mt-auto rounded-2xl bg-white p-4 sm:p-5">
              <p className="font-[family-name:var(--font-mono)] text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                Contact
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={`mailto:${social.email}`}
                  data-cursor="Email me"
                  className="link-underline w-fit text-sm font-medium text-neutral-700"
                >
                  {social.email}
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline w-fit text-sm font-medium text-neutral-700"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
