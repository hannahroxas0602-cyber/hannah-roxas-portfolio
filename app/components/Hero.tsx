"use client";

import Image from "next/image";
import { motion } from "motion/react";

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
      <p className="mb-4 text-center text-lg font-medium tracking-tight text-black lg:hidden">
        Welcome to the rabbit hole.
      </p>
      <div className="relative mx-auto aspect-square w-full max-w-xl">
        {/* Rotating photo ring */}
        <div className="absolute inset-[6%]">
          {ringImages.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{ transform: `rotate(${img.angle}deg)` }}
            >
              <div
                className="absolute top-0 left-1/2 h-14 w-12 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `translateX(-50%) rotate(${img.tilt - img.angle}deg)` }}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="rounded-md object-cover shadow-md"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Black oval with sleeping rabbit */}
        <div className="absolute inset-[18%] overflow-hidden rounded-[50%] bg-black">
          <Image
            src="/images/hero/sleeping-rabbit-oval.webp"
            alt="A sleeping white rabbit curled up in a dark burrow"
            fill
            sizes="(min-width: 640px) 500px, 70vw"
            className="object-cover opacity-90"
            priority
          />
        </div>

        {/* Alice + White Rabbit line art */}
        <div className="pointer-events-none absolute top-[6%] right-[8%] w-[18%]">
          <Image
            src="/images/hero/alice-falling.webp"
            alt=""
            width={1475}
            height={1120}
            className="h-auto w-full"
          />
        </div>

        {/* Headline overlay */}
        <div className="absolute inset-[20%] flex items-center justify-center text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.045, delayChildren: 0.1 }}
            className="font-[family-name:var(--font-inter)] text-xl leading-tight font-medium text-white sm:text-2xl"
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
            <motion.span
              variants={wordVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative -top-0.5 mr-[0.28em] inline-block h-8 w-8 -rotate-3 overflow-hidden rounded-lg border-2 border-[#F0F0F0] align-middle shadow-lg sm:h-10 sm:w-10"
            >
              <Image
                src="/images/hero/inline-photo.webp"
                alt="Hannah"
                fill
                sizes="40px"
                className="object-cover"
              />
            </motion.span>
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
