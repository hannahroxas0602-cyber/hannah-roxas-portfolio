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
    <section className="mx-auto max-w-6xl px-6 pt-10 pb-6 sm:px-10 sm:pt-12">
      <p className="mb-6 text-center text-base font-medium tracking-tight text-neutral-500 sm:mb-5 sm:text-lg sm:text-black lg:hidden">
        Welcome to the rabbit hole.
      </p>
      <div className="relative mx-auto aspect-square w-full max-w-[14rem] sm:max-w-sm lg:max-w-md">
        {/* Rotating photo ring — each card flips individually on hover */}
        <div className="absolute inset-[6%] z-0">
          {ringImages.map((img, i) => (
            <div
              key={i}
              className="pointer-events-none absolute inset-0"
              style={{ transform: `rotate(${img.angle}deg)` }}
            >
              <div
                className="group pointer-events-auto absolute top-0 left-1/2 h-8 w-7 cursor-pointer sm:h-12 sm:w-11 lg:h-16 lg:w-[3.75rem]"
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
            className="font-[family-name:var(--font-manrope)] text-xs leading-snug font-bold text-white sm:text-lg lg:text-xl"
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
        <span className="absolute top-1/2 left-0 hidden -translate-x-[calc(100%+2.5rem)] -translate-y-1/2 text-xl font-medium tracking-tight whitespace-nowrap text-black lg:block">
          Welcome to
        </span>
        <span className="absolute top-1/2 right-0 hidden translate-x-[calc(100%+2.5rem)] -translate-y-1/2 text-xl font-medium tracking-tight whitespace-nowrap text-black lg:block">
          the rabbit hole.
        </span>
      </div>
    </section>
  );
}
