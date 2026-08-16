"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useAboutPanel } from "@/app/components/AboutPanelContext";
import { experience } from "@/app/about/data";
import { projects } from "@/app/data/projects";
import { social } from "@/app/data/social";
import {
  FigmaIcon,
  AdobeIcon,
  SlackIcon,
  GithubIcon,
  CursorAppIcon,
  NotionIcon,
  LinearIcon,
  VSCodeIcon,
} from "@/app/components/ToolIcons";

const tools = [
  { name: "Figma", Icon: FigmaIcon },
  { name: "Adobe CC", Icon: AdobeIcon },
  { name: "Slack", Icon: SlackIcon },
  { name: "GitHub", Icon: GithubIcon },
  { name: "Cursor", Icon: CursorAppIcon },
  { name: "Notion", Icon: NotionIcon },
  { name: "Linear", Icon: LinearIcon },
  { name: "VS Code", Icon: VSCodeIcon },
];

const tabs = ["Info", "Work", "Contact"] as const;
type Tab = (typeof tabs)[number];

const workProjects = projects.slice(0, 2);

export default function AboutPanel({ width }: { width: number }) {
  const { isOpen, close } = useAboutPanel();
  const [activeTab, setActiveTab] = useState<Tab>("Info");

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
            {/* Pill nav: Info / Work / Contact */}
            <div className="flex items-center justify-between rounded-2xl bg-white px-2 py-2">
              <button
                type="button"
                onClick={close}
                aria-label="Close about panel"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg text-neutral-700 transition-colors hover:bg-black/[0.04]"
              >
                ×
              </button>
              <div className="flex items-center gap-1">
                {tabs.map((tab) => {
                  const isActive = tab === activeTab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className="relative rounded-full px-3.5 py-1.5 text-sm font-medium text-neutral-900 transition-colors"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="about-tab-pill"
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: "#F2A9E8" }}
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {activeTab === "Info" && (
              <>
                {/* Photo + bio, side by side */}
                <div className="flex gap-4 rounded-2xl bg-white p-4">
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src="/images/hero/inline-photo.webp"
                      alt="Hannah Roxas"
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-[family-name:var(--font-manrope)] text-lg text-neutral-900">
                      Hannah Roxas
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      A curious, detail-obsessed designer who treats every project like a
                      rabbit hole worth falling into.
                    </p>
                  </div>
                </div>

                {/* Tool row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl bg-white px-5 py-4">
                  {tools.map(({ name, Icon }) => (
                    <span
                      key={name}
                      title={name}
                      className="flex items-center gap-1.5 text-neutral-800"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{name}</span>
                    </span>
                  ))}
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
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                      {entry.context}
                    </p>
                  </div>
                ))}
              </>
            )}

            {activeTab === "Work" && (
              <>
                {workProjects.map((project) => (
                  <a
                    key={project.slug}
                    href={project.href}
                    className="flex gap-4 rounded-2xl bg-white p-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-[family-name:var(--font-manrope)] text-base text-neutral-900">
                        {project.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                        {project.description}
                      </p>
                    </div>
                  </a>
                ))}
              </>
            )}

            {activeTab === "Contact" && (
              <div className="rounded-2xl bg-white p-5">
                <a
                  href={`mailto:${social.email}`}
                  data-cursor="Email me"
                  className="link-underline w-fit text-sm font-medium text-neutral-700"
                >
                  {social.email}
                </a>
                <br />
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-2 inline-block w-fit text-sm font-medium text-neutral-700"
                >
                  LinkedIn
                </a>
              </div>
            )}

            {/* Quiet footer */}
            <div className="px-2 pt-2 pb-1">
              <p className="text-xs text-neutral-400">{social.email}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
