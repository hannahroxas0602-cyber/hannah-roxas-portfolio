"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useAboutPanel } from "@/app/components/AboutPanelContext";
import { aboutIntro, experience } from "@/app/about/data";
import { social } from "@/app/data/social";

const tools = ["Figma", "Slack", "GitHub", "Cursor", "Adobe CC", "Notion", "Linear", "VS Code"];

export default function AboutPanel({ width }: { width: number }) {
  const { isOpen, close } = useAboutPanel();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          style={{ width }}
          className="fixed inset-y-0 right-0 z-[91] max-w-full overflow-y-auto bg-neutral-100 sm:max-w-[92vw]"
        >
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Top bar */}
            <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
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
            <div className="rounded-2xl bg-white p-5">
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
                hole worth falling into — chasing the smallest interaction details until the
                whole system feels inevitable.
              </p>
            </div>

            {/* Tool carousel */}
            <div className="overflow-hidden rounded-2xl bg-white py-4">
              <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-2 px-4">
                {[...tools, ...tools].map((tool, i) => (
                  <span
                    key={`${tool}-${i}`}
                    className="shrink-0 rounded-full border border-black/[0.08] bg-neutral-50 px-4 py-1.5 text-sm font-medium text-neutral-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            {experience.map((entry) => (
              <div key={entry.slug} className="rounded-2xl bg-white p-5">
                <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-neutral-400 uppercase">
                  {entry.dates}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-manrope)] text-lg text-neutral-900">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-500">{entry.context}</p>
              </div>
            ))}

            {/* Contact */}
            <div className="rounded-2xl bg-white p-5">
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
      )}
    </AnimatePresence>
  );
}
