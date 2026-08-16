"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useAboutPanel } from "@/app/components/AboutPanelContext";
import { aboutIntro, experience } from "@/app/about/data";
import { social } from "@/app/data/social";

const tools = [
  "Figma",
  "Slack",
  "GitHub",
  "Cursor",
  "Adobe CC",
  "Notion",
  "Linear",
  "VS Code",
];

export default function AboutPanel() {
  const { isOpen, close } = useAboutPanel();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm"
          />

          {/* Panel — slides from the right on desktop, sheet from bottom on mobile */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[91] w-full overflow-y-auto bg-[var(--background)] shadow-[-16px_0_48px_rgba(0,0,0,0.12)] sm:w-[440px] sm:max-w-[92vw]"
          >
            <div className="flex flex-col gap-3 p-4 sm:p-5">
              {/* Top bar */}
              <div className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white/70 px-4 py-3 backdrop-blur-xl backdrop-saturate-150">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-neutral-500 uppercase">
                  {aboutIntro.eyebrow} {aboutIntro.title}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close about panel"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04] text-lg text-neutral-700 transition-colors hover:bg-black/[0.08]"
                >
                  ×
                </button>
              </div>

              {/* Photo + bio */}
              <div className="rounded-2xl border border-black/[0.06] bg-white/70 p-5 backdrop-blur-xl backdrop-saturate-150">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src="/images/hero/inline-photo.webp"
                      alt="Hannah Roxas"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-manrope)] text-xl text-neutral-900">
                      Hannah Roxas
                    </p>
                    <p className="text-sm text-neutral-500">Product & Visual Designer</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                  A curious, detail-obsessed designer who treats every project like a rabbit
                  hole worth falling into — chasing the smallest interaction details until
                  the whole system feels inevitable.
                </p>
              </div>

              {/* Tool carousel */}
              <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white/70 py-4 backdrop-blur-xl backdrop-saturate-150">
                <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-2 px-4">
                  {[...tools, ...tools].map((tool, i) => (
                    <span
                      key={`${tool}-${i}`}
                      className="shrink-0 rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-sm font-medium text-neutral-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              {experience.map((entry) => (
                <div
                  key={entry.slug}
                  className="rounded-2xl border border-black/[0.06] bg-white/70 p-5 backdrop-blur-xl backdrop-saturate-150"
                >
                  <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-neutral-400 uppercase">
                    {entry.dates}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-manrope)] text-lg text-neutral-900">
                    {entry.role}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                    {entry.context}
                  </p>
                </div>
              ))}

              {/* Contact */}
              <div className="rounded-2xl border border-black/[0.06] bg-white/70 p-5 backdrop-blur-xl backdrop-saturate-150">
                <a
                  href={`mailto:${social.email}`}
                  data-cursor="Email me"
                  className="link-underline w-fit text-sm font-medium text-neutral-700"
                >
                  {social.email}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
