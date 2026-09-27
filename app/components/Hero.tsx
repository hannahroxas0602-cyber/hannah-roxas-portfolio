"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { social } from "@/app/data/social";
import { CURSOR_COLOR } from "@/app/components/CustomCursor";

const wordVariants = {
  hidden: { opacity: 0.001, filter: "blur(10px)", y: 10 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

// Seven pieces with bold shapes and big type, which stay recognizable at thumbnail size.
// `depth` sets how fast each card rushes past as you scroll: the parallax that
// makes scrolling feel like dropping into a tunnel.
const ringImages = [
  { src: "/images/hero-ring/ring-01.webp", angle: 0, tilt: -8, depth: 1.0 }, // Learvo laptop
  { src: "/images/hero-ring/ring-04.webp", angle: 51.4, tilt: 6, depth: 1.35 }, // Outside Inside
  { src: "/images/hero-ring/ring-10.webp", angle: 102.9, tilt: -5, depth: 0.8 }, // In Due Time
  { src: "/images/hero-ring/ring-05.webp", angle: 154.3, tilt: 7, depth: 1.2 }, // Good Friends Poke
  { src: "/images/hero-ring/ring-11.webp", angle: 205.7, tilt: -6, depth: 0.9 }, // Tokyo CD
  { src: "/images/hero-ring/ring-12.webp", angle: 257.1, tilt: 8, depth: 1.3 }, // ASAP
  { src: "/images/hero-ring/ring-08.webp", angle: 308.6, tilt: -7, depth: 1.1 }, // Justified book
];

// How far the ring flies apart by the time the hero has scrolled away.
const MAX_CARD_GROWTH = 0.9;
// Scroll progress (0–1) over which the cards fade out.
const FADE_START = 0.04;
const FADE_END = 0.32;

// Each card layer scales from the ring's center, so growing it both pushes the
// card outward and enlarges it. Transform and opacity only.
function RingCard({
  img,
  progress,
  animate,
}: {
  img: (typeof ringImages)[number];
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const scale = useTransform(
    progress,
    [0, 1],
    [1, 1 + MAX_CARD_GROWTH * img.depth],
  );
  // Fully faded before the cards can drift over the role line below. The explicit
  // clamp matters: range-mapped opacity kept un-fading past the end of its range.
  const opacity = useTransform(progress, (p) =>
    Math.min(1, Math.max(0, 1 - (p - FADE_START) / (FADE_END - FADE_START))),
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={
        animate ? { rotate: img.angle, scale, opacity } : { rotate: img.angle }
      }
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
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // 0 when the hero's top reaches the top of the viewport, 1 once it has scrolled away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Reduced motion: the ring stays exactly as drawn, with no scroll effect.
  const animate = !reduceMotion;
  // The opening draws a little closer as you fall toward it; the headline rides along.
  const holeScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-6xl px-6 pt-6 pb-4 sm:px-10 sm:pt-10 lg:pt-16"
    >
      <p className="mb-8 text-center text-base font-medium tracking-tight text-neutral-500 sm:mb-5 sm:text-lg sm:text-black lg:hidden">
        Welcome to the rabbit hole.
      </p>
      <div className="relative mx-auto aspect-square w-full max-w-[14rem] sm:max-w-sm lg:max-w-[clamp(20rem,calc(100svh_-_28rem),28rem)]">
        {/* Decorative photo ring — not interactive, so it doesn't read as clickable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[1%] z-0"
        >
          {ringImages.map((img) => (
            <RingCard
              key={img.src}
              img={img}
              progress={scrollYProgress}
              animate={animate}
            />
          ))}
        </div>

        <motion.div
          className="absolute inset-0 z-10"
          style={animate ? { scale: holeScale } : undefined}
        >
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
        </motion.div>

        {/* Welcome to / the rabbit hole flanking labels */}
        <span className="absolute top-1/2 left-0 hidden -translate-x-[calc(100%+3.5rem)] -translate-y-1/2 text-xl font-medium tracking-tight whitespace-nowrap text-black lg:block">
          Welcome to
        </span>
        <span className="absolute top-1/2 right-0 hidden translate-x-[calc(100%+3.5rem)] -translate-y-1/2 text-xl font-medium tracking-tight whitespace-nowrap text-black lg:block">
          the rabbit hole.
        </span>
      </div>

      {/* Role line + availability — plain and scannable, outside the ring */}
      {/* relative z-10 keeps this text above ring cards as they fly outward */}
      <div className="relative z-10 mx-auto mt-9 flex flex-col items-center gap-3 text-center sm:mt-10 lg:mt-12">
        <p className="text-base leading-relaxed text-balance text-neutral-600 sm:text-lg lg:whitespace-nowrap">
          Product designer who designs in Figma and ships in code. Currently at
          Learvo, an ed-tech startup.
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
