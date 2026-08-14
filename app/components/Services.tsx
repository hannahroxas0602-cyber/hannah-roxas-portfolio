"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { servicesIntro, services } from "@/app/services/data";

export default function Services() {
  const [openSlug, setOpenSlug] = useState<string | null>(services[0]?.slug ?? null);

  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:px-10 sm:py-24">
      <p className="text-lg text-neutral-500">
        <span className="mr-1 font-[family-name:var(--font-mono)] text-sm tracking-wide">
          {servicesIntro.eyebrow}
        </span>
        <span className="text-black">{servicesIntro.title}</span>
      </p>

      <div
        className="mt-10 flex flex-col gap-3"
        onMouseLeave={() => setOpenSlug(null)}
      >
        {services.map((service) => {
          const isOpen = service.slug === openSlug;
          return (
            <div
              key={service.slug}
              onMouseEnter={() => setOpenSlug(service.slug)}
              className="group relative overflow-hidden rounded-2xl border border-black/[0.08] transition-colors duration-500"
            >
              {/* Ambient surface the glass panel blurs against */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-50 transition-opacity duration-500"
                style={{ opacity: isOpen ? 1 : 0 }}
              />

              <button
                type="button"
                onClick={() => setOpenSlug(isOpen ? null : service.slug)}
                className="relative z-10 flex w-full items-center justify-between px-6 py-5 text-left sm:px-8 sm:py-6"
              >
                <h3 className="font-[family-name:var(--font-manrope)] text-xl text-black sm:text-2xl">
                  {service.title}
                </h3>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border text-lg transition-colors duration-500 ${
                    isOpen ? "border-black/15 bg-white/40 text-black backdrop-blur-md" : "border-black/10 text-black"
                  }`}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.7 }}
                    className="relative z-10"
                  >
                    <ul className="flex flex-wrap gap-2 px-6 pb-6 sm:px-8 sm:pb-8">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/40 bg-white/30 px-3 py-1.5 text-sm text-black/80 backdrop-blur-xl backdrop-saturate-150"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
