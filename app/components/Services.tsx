"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { servicesIntro, services } from "@/app/services/data";

// One shared timing for everything that opens or closes, so the box that is
// closing and the box that is opening move together.
const ACCORDION = { duration: 0.45, ease: [0.32, 0.72, 0, 1] } as const;

const halftones = [
  "/images/halftone_1.png",
  "/images/halftone_2.png",
  "/images/halftone_3.png",
  "/images/halftone_4.png",
];

export default function Services() {
  const [openSlug, setOpenSlug] = useState<string | null>(services[0]?.slug ?? null);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mql.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section id="what-i-do" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-8 pb-16 sm:px-10 sm:pt-12 sm:pb-24">
      <p className="text-lg text-neutral-500">
        <span className="mr-1 font-[family-name:var(--font-mono)] text-sm tracking-wide">
          {servicesIntro.eyebrow}
        </span>
        <span className="text-black">{servicesIntro.title}</span>
      </p>

      <div
        className="mt-10 flex flex-col gap-3"
        onMouseLeave={canHover ? () => setOpenSlug(null) : undefined}
      >
        {services.map((service, i) => {
          const isOpen = service.slug === openSlug;
          return (
            <div
              key={service.slug}
              onMouseEnter={canHover ? () => setOpenSlug(service.slug) : undefined}
              className="relative overflow-hidden rounded-2xl border border-black/[0.08]"
            >
              {/* Halftone artwork — full-bleed background, always visible, drifts on hover */}
              <motion.div
                animate={{ scale: isOpen ? 1.06 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="absolute inset-0"
              >
                <Image
                  src={halftones[i % halftones.length]}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 896px, 100vw"
                  className="pointer-events-none object-cover"
                  style={{
                    objectPosition:
                      i === 1 ? "center top" : i === 3 ? "center 25%" : "center center",
                  }}
                />
              </motion.div>

              {/* Title row — frosted glass pill so it reads over the artwork */}
              <button
                type="button"
                onClick={() => setOpenSlug(isOpen ? null : service.slug)}
                className="relative z-10 flex w-full flex-col px-6 py-4 text-left sm:px-8 sm:py-5"
              >
                <div className="flex w-full items-center justify-between">
                  <h3
                    className={`inline-block w-fit rounded-full border border-white/10 bg-black/70 px-4 font-[family-name:var(--font-manrope)] text-white backdrop-blur-xl backdrop-saturate-150 transition-[font-size,line-height,padding] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      isOpen ? "py-1.5 text-xl sm:text-2xl" : "py-1 text-lg sm:text-xl"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={ACCORDION}
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/10 bg-black/70 text-lg text-white backdrop-blur-xl backdrop-saturate-150"
                  >
                    +
                  </motion.span>
                </div>

                {/* Collapsed-state teaser — one-line proof point, visible without expanding */}
                <AnimatePresence initial={false}>
                  {!isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={ACCORDION}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 w-fit rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-xl backdrop-saturate-150">
                        {service.proof}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={ACCORDION}
                    className="relative z-10 overflow-hidden"
                  >
                    <div className="mx-3 mb-3 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl backdrop-saturate-150 sm:mx-4 sm:mb-4 sm:p-5">
                      <p className="text-sm text-white/80">{service.proof}</p>

                      <ul className="mt-3 flex flex-wrap gap-2">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white/90"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-3 flex items-center gap-2">
                        <span className="font-[family-name:var(--font-mono)] text-xs font-semibold tracking-widest text-white/50 uppercase">
                          Tools
                        </span>
                        <span className="text-sm text-white/80">
                          {service.tools.join(" · ")}
                        </span>
                      </div>
                    </div>
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
