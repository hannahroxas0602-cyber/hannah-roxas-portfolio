"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { social } from "@/app/data/social";
import { CURSOR_COLOR } from "@/app/components/CustomCursor";

const wordVariants = {
  hidden: { opacity: 0.001, filter: "blur(10px)", y: 10 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

// Seven pieces with bold shapes and big type, which stay recognizable at thumbnail size.
const ringImages = [
  { src: "/images/hero-ring/ring-01.webp", angle: 0, tilt: -8 }, // Learvo laptop
  { src: "/images/hero-ring/ring-04.webp", angle: 51.4, tilt: 6 }, // Outside Inside
  { src: "/images/hero-ring/ring-10.webp", angle: 102.9, tilt: -5 }, // In Due Time
  { src: "/images/hero-ring/ring-05.webp", angle: 154.3, tilt: 7 }, // Good Friends Poke
  { src: "/images/hero-ring/ring-11.webp", angle: 205.7, tilt: -6 }, // Tokyo CD
  { src: "/images/hero-ring/ring-12.webp", angle: 257.1, tilt: 8 }, // ASAP
  { src: "/images/hero-ring/ring-08.webp", angle: 308.6, tilt: -7 }, // Justified book
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-6 pb-4 sm:px-10 sm:pt-10 lg:pt-16">
      <p className="mb-8 text-center text-base font-medium tracking-tight text-neutral-500 sm:mb-5 sm:text-lg sm:text-black lg:hidden">
        Welcome to the rabbit hole.
      </p>
      <div className="relative mx-auto aspect-square w-full max-w-[14rem] sm:max-w-sm lg:max-w-[clamp(20rem,calc(100svh_-_28rem),28rem)]">
        {/* Decorative photo ring — not interactive, so it doesn't read as clickable */}
        <div aria-hidden className="pointer-events-none absolute inset-[1%] z-0">
          {ringImages.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{ transform: `rotate(${img.angle}deg)` }}
            >
              <div
                className="absolute top-0 left-1/2 h-[24%] w-[22%] overflow-hidden rounded-lg shadow-lg"
                style={{
                  transform: `translate(-50%, -50%) rotate(${img.tilt - img.angle}deg)`,
                }}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 56px"
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Black oval with sleeping rabbit */}
        <div className="absolute inset-[21%] z-10 overflow-hidden rounded-[50%] bg-black">
          <div className="absolute inset-[12%]">
            <Image
              src="/images/bunny_hero.png"
              alt="A sleeping white rabbit curled up in a dark burrow"
              fill
              sizes="(min-width: 640px) 500px, 70vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Scrim — keeps the headline readable over the bunny photo */}
        <div className="absolute inset-[21%] z-10 rounded-[50%] bg-gradient-to-b from-black/55 via-black/35 to-black/55" />

        {/* Headline overlay */}
        <div className="absolute inset-[23%] z-20 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.045, delayChildren: 0.1 }}
            className="font-[family-name:var(--font-manrope)] text-xs leading-snug font-bold text-white sm:text-lg lg:text-[clamp(0.9rem,2.05svh,1.15rem)]"
          >
            <motion.span
              variants={wordVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mr-[0.28em] inline-block"
            >
              I&apos;m
            </motion.span>
            <motion.a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View LinkedIn"
              variants={wordVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="link-underline inline-block"
            >
              Hannah
            </motion.a>
            {". I design connected digital systems that reward curiosity."
              .split(" ")
              .map((word, i, arr) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`inline-block ${i < arr.length - 1 ? "mr-[0.28em]" : ""}`}
                >
                  {word}
                </motion.span>
              ))}
          </motion.h1>
        </div>

        {/* Welcome to / the rabbit hole flanking labels */}
        <span className="absolute top-1/2 left-0 hidden -translate-x-[calc(100%+3.5rem)] -translate-y-1/2 text-xl font-medium tracking-tight whitespace-nowrap text-black lg:block">
          Welcome to
        </span>
        <span className="absolute top-1/2 right-0 hidden translate-x-[calc(100%+3.5rem)] -translate-y-1/2 text-xl font-medium tracking-tight whitespace-nowrap text-black lg:block">
          the rabbit hole.
        </span>
      </div>

      {/* Role line + availability — plain and scannable, outside the ring */}
      <div className="mx-auto mt-9 flex flex-col items-center gap-3 text-center sm:mt-10 lg:mt-12">
        <p className="text-base leading-relaxed text-balance text-neutral-600 sm:text-lg lg:whitespace-nowrap">
          Product designer who designs in Figma and ships in code. Currently at Learvo, an ed-tech
          startup.
        </p>
        <p className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-medium text-neutral-700 sm:text-sm">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: CURSOR_COLOR }}
          />
          Open to product &amp; graphic design roles
        </p>
      </div>
    </section>
  );
}
