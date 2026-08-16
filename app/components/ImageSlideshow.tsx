"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const AUTO_ADVANCE_MS = 4000;

function useSlideshow(length: number) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + length) % length);
  };

  useEffect(() => {
    if (length <= 1) return;
    timerRef.current = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), AUTO_ADVANCE_MS);
  };

  return { index, setIndex, direction, setDirection, go, restartTimer };
}

function Frame({
  images,
  alt,
  index,
  direction,
  onPrev,
  onNext,
  onDot,
  priority,
  objectFit = "cover",
}: {
  images: string[];
  alt: string;
  index: number;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
  priority?: boolean;
  objectFit?: "cover" | "contain";
}) {
  return (
    <>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          initial={{ x: direction >= 0 ? 60 : -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction >= 0 ? -60 : 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            fill
            className={objectFit === "contain" ? "object-contain" : "object-cover"}
            sizes={objectFit === "contain" ? "100vw" : "(min-width: 1024px) 60vw, 100vw"}
            priority={priority && index === 0}
          />
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/70 text-black backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-white"
      >
        ←
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/70 text-black backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-white"
      >
        →
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDot(i);
            }}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 shrink-0 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export default function ImageSlideshow({
  images,
  alt,
  width,
  height,
}: {
  images: string[];
  alt: string;
  width: number;
  height: number;
}) {
  const main = useSlideshow(images.length);
  const [isExpanded, setIsExpanded] = useState(false);
  const lightbox = useSlideshow(images.length);

  const openLightbox = () => {
    lightbox.setDirection(0);
    lightbox.setIndex(main.index);
    setIsExpanded(true);
  };

  return (
    <div>
      <div
        className="group relative w-full cursor-zoom-in overflow-hidden rounded-2xl bg-neutral-100"
        style={{ aspectRatio: `${width}/${height}` }}
        onClick={openLightbox}
      >
        <Frame
          images={images}
          alt={alt}
          index={main.index}
          direction={main.direction}
          onPrev={() => {
            main.go(-1);
            main.restartTimer();
          }}
          onNext={() => {
            main.go(1);
            main.restartTimer();
          }}
          onDot={(i) => {
            main.setDirection(i > main.index ? 1 : -1);
            main.setIndex(i);
            main.restartTimer();
          }}
          priority
        />

        {/* Expand affordance */}
        <span className="pointer-events-none absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/70 text-black opacity-0 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-200 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-black">
            <path d="M9 3H3v6h2V5h4V3zm12 0h-6v2h4v4h2V3zM5 15H3v6h6v-2H5v-4zm14 4h-4v2h6v-6h-2v4z" />
          </svg>
        </span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4 sm:p-10"
            onClick={() => setIsExpanded(false)}
          >
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white backdrop-blur-xl transition-colors hover:bg-white/20 sm:top-6 sm:right-6"
            >
              ×
            </button>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative h-full max-h-[85vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Frame
                images={images}
                alt={alt}
                index={lightbox.index}
                direction={lightbox.direction}
                onPrev={() => {
                  lightbox.go(-1);
                  lightbox.restartTimer();
                }}
                onNext={() => {
                  lightbox.go(1);
                  lightbox.restartTimer();
                }}
                onDot={(i) => {
                  lightbox.setDirection(i > lightbox.index ? 1 : -1);
                  lightbox.setIndex(i);
                  lightbox.restartTimer();
                }}
                objectFit="contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
