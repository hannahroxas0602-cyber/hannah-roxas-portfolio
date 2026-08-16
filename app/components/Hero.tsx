"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { social } from "@/app/data/social";

const wordVariants = {
  hidden: { opacity: 0.001, filter: "blur(10px)", y: 10 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

const ringImages = [
  { src: "/images/hero-ring/ring-01.webp", angle: 0, tilt: -8 },
  { src: "/images/hero-ring/ring-02.webp", angle: 27.7, tilt: 6 },
  { src: "/images/hero-ring/ring-03.webp", angle: 55.4, tilt: -5 },
  { src: "/images/hero-ring/ring-04.webp", angle: 83.1, tilt: 9 },
  { src: "/images/hero-ring/ring-05.webp", angle: 110.8, tilt: -6 },
  { src: "/images/hero-ring/ring-06.webp", angle: 138.5, tilt: 7 },
  { src: "/images/hero-ring/ring-07.webp", angle: 166.2, tilt: -9 },
  { src: "/images/hero-ring/ring-08.webp", angle: 193.8, tilt: 5 },
  { src: "/images/hero-ring/ring-09.webp", angle: 221.5, tilt: -7 },
  { src: "/images/hero-ring/ring-10.webp", angle: 249.2, tilt: 8 },
  { src: "/images/hero-ring/ring-11.webp", angle: 276.9, tilt: -6 },
  { src: "/images/hero-ring/ring-12.webp", angle: 304.6, tilt: 6 },
  { src: "/images/hero-ring/ring-13.webp", angle: 332.3, tilt: -8 },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-8 sm:px-10 sm:pt-20">
      <p className="mb-6 text-center text-base font-medium tracking-tight text-neutral-500 sm:mb-4 sm:text-lg sm:text-black lg:hidden">
        Welcome to the rabbit hole.
      </p>
      <div className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-lg lg:max-w-xl">
        {/* Rotating photo ring — each card flips individually on hover */}
        <div className="absolute inset-[3%] z-0 sm:inset-[5%] lg:inset-[6%]">
          {ringImages.map((img, i) => (
            <div
              key={i}
              className="pointer-events-none absolute inset-0"
              style={{ transform: `rotate(${img.angle}deg)` }}
            >
              <div
                className="group pointer-events-auto absolute top-0 left-1/2 h-10 w-9 cursor-pointer sm:h-14 sm:w-12 lg:h-20 lg:w-[4.5rem]"
                style={{
                  transform: `translate(-50%, -50%) rotate(${img.tilt - img.angle}deg)`,
                  perspective: 1200,
                }}
              >
                <motion.div
                  className="relative h-full w-full"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ rotateY: 0 }}
                  whileHover={{ rotateY: 180 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.6 }}
                >
                  {/* Front face */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-lg shadow-lg"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 72px, (min-width: 640px) 48px, 36px"
                      className="object-cover"
                    />
                  </div>
                  {/* Back face — same photo, mirrored so it reads correctly once flipped */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-lg shadow-lg"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 72px, (min-width: 640px) 48px, 36px"
                      className="scale-x-[-1] object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Black oval with sleeping rabbit */}
        <div className="absolute inset-[18%] z-10 overflow-hidden rounded-[50%] bg-black">
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
        <div className="absolute inset-[18%] z-10 rounded-[50%] bg-gradient-to-b from-black/55 via-black/35 to-black/55" />

        {/* Headline overlay */}
        <div className="absolute inset-[20%] z-20 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.045, delayChildren: 0.1 }}
            className="font-[family-name:var(--font-manrope)] text-sm leading-snug font-bold text-white sm:text-lg lg:text-xl"
          >
            {"I'm Hannah".split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mr-[0.28em] inline-block"
              >
                {word}
              </motion.span>
            ))}
            <motion.a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View LinkedIn"
              variants={wordVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              className="group relative -top-0.5 mr-[0.28em] inline-block h-6 w-6 -rotate-3 overflow-hidden rounded-lg border-2 border-[#F0F0F0] align-middle shadow-lg transition-transform sm:h-8 sm:w-8"
            >
              <Image
                src="/images/hero/inline-photo.webp"
                alt="Hannah, view LinkedIn"
                fill
                sizes="40px"
                className="object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white sm:h-4 sm:w-4">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.1H5.67v8.24h2.67zM7 8.94A1.54 1.54 0 1 0 7 5.86a1.54 1.54 0 0 0 0 3.08zM18.34 18.34v-4.52c0-2.42-1.29-3.55-3.02-3.55a2.6 2.6 0 0 0-2.36 1.3v-1.12h-2.67v8.24h2.67v-4.34c0-1.14.22-2.25 1.63-2.25 1.39 0 1.4 1.3 1.4 2.32v4.27h2.67z" />
                </svg>
              </span>
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
        <span className="absolute top-1/2 left-0 hidden -translate-x-[calc(100%+2.5rem)] -translate-y-1/2 text-xl font-medium tracking-tight whitespace-nowrap text-black lg:block">
          Welcome to
        </span>
        <span className="absolute top-1/2 right-0 hidden translate-x-[calc(100%+2.5rem)] -translate-y-1/2 text-xl font-medium tracking-tight whitespace-nowrap text-black lg:block">
          the rabbit hole.
        </span>
      </div>

      {/* More below indicator */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-neutral-400">
        <span>More below with hire potential inside</span>
        <svg viewBox="0 0 256 256" className="h-4 w-4 fill-neutral-400">
          <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </div>
    </section>
  );
}
