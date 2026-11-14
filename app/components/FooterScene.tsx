"use client";

import Image from "next/image";
import { MotionConfig, motion } from "motion/react";
import { useState } from "react";
import { social } from "@/app/data/social";

// The footer is a hand-drawn tea party, built from layers so it scales as one picture: a stage, a table, two
// curtains, and two groups of objects (the cake and the sleeping cat with the "Hire me!" potion on the left, the
// Mad Hatter cat with the teapot and candles on the right). Every layer is placed in percentages of the original
// 3024 x 1964 drawing, so the whole scene scales together at any width. The title and my email sit in the empty
// part of the stage and size with the scene (container-query units).
//
// Light mode is the drawing as it was made: navy line art on the page's light color. In dark mode the stage goes
// black and the line art (but never the cat photos) is inverted to light lines, like chalk. That's why each object
// group is two images: the photo of the cat, and the line art around and over it. See .footer-scene in globals.css.
const EASE = [0.22, 1, 0.36, 1] as const;

type File = { src: string; art: boolean; w: number; h: number };
type Layer = { files: File[]; left: number; top: number; width: number; from: { x?: number; y?: number } };
const LAYERS: Layer[] = [
  { files: [{ src: "table", art: true, w: 2419, h: 563 }], left: 0, top: 64.155, width: 100, from: { y: 0 } },
  { files: [{ src: "curtain-left", art: true, w: 346, h: 1068 }], left: 0.099, top: 0, width: 14.319, from: { x: -30 } },
  { files: [{ src: "curtain-right", art: true, w: 346, h: 1068 }], left: 85.317, top: 0, width: 14.319, from: { x: 30 } },
  {
    files: [
      { src: "scene-left-photo", art: false, w: 882, h: 590 },
      { src: "scene-left-art", art: true, w: 882, h: 590 },
    ],
    left: 3.241,
    top: 43.177,
    width: 36.442,
    from: { y: 36 },
  },
  {
    files: [
      { src: "scene-right-photo", art: false, w: 1074, h: 885 },
      { src: "scene-right-art", art: true, w: 1074, h: 885 },
    ],
    left: 52.05,
    top: 24.695,
    width: 44.411,
    from: { y: 36 },
  },
];

// the skirt of the table fades away so the stripes don't run into the small print
const fade = "linear-gradient(to bottom, #000 42%, transparent 90%)";

export default function FooterScene() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${social.email}`;
    }
  };

  const label = copied ? "Copied to clipboard ✓" : social.email;

  return (
    <MotionConfig reducedMotion="user">
      {/* on a phone the title and the line sit just above the picture, tight to the email, which sits on top of the picture */}
      <div className="footer-scene footer-ink px-6 pt-2 text-center sm:hidden">
        <p className="font-display text-[1.75rem] leading-[1.05] font-medium tracking-[-0.03em]">It&apos;s always tea time.</p>
        <p className="footer-sub mt-1 text-[0.95rem]">Open to full-time roles.</p>
      </div>

      <div className="footer-scene @container relative aspect-[3024/1964] w-full select-none">
        {/* the stage: the page's light color, or black in dark mode */}
        <div aria-hidden className="footer-stage absolute inset-x-0 top-0" style={{ height: "64.2%" }} />

        {LAYERS.map((l, i) => (
          <motion.div
            key={l.files[0].src}
            aria-hidden
            initial={{ opacity: 0, ...l.from }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
            className="pointer-events-none absolute"
            style={{ left: `${l.left}%`, top: `${l.top}%`, width: `${l.width}%` }}
          >
            {l.files.map((f, k) => (
              <Image
                key={f.src}
                src={`/images/footer/${f.src}.webp`}
                alt=""
                width={f.w}
                height={f.h}
                unoptimized
                sizes="(min-width: 1280px) 1280px, 100vw"
                className={`h-auto w-full ${k > 0 ? "absolute inset-0" : ""} ${f.art ? "footer-art" : ""}`}
                style={f.src === "table" ? { WebkitMaskImage: fade, maskImage: fade } : undefined}
              />
            ))}
          </motion.div>
        ))}

        {/* phone: the email sits at the top of the picture, centered between the curtains */}
        <button type="button" onClick={copy} data-cursor={copied ? "Copied" : "Copy email"} className="footer-pill footer-ink absolute top-[3.5%] left-1/2 z-10 inline-flex max-w-[72%] -translate-x-1/2 items-center rounded-full border px-4 py-2 text-[0.9rem] whitespace-nowrap transition-colors sm:hidden">
          <span className="truncate">{label}</span>
        </button>

        {/* tablet and up: the words sit in the empty part of the stage, centered between the curtains */}
        <div className="footer-ink absolute top-[8%] left-1/2 hidden w-[56%] -translate-x-1/2 text-center sm:block">
          <p className="font-display text-[clamp(20px,4.5cqw,62px)] leading-[1.04] font-medium tracking-[-0.03em]">It&apos;s always tea time.</p>
          <p className="footer-sub mt-[1.2cqw] text-[clamp(12px,1.9cqw,24px)] leading-snug">Open to full-time roles.</p>
          <button
            type="button"
            onClick={copy}
            data-cursor={copied ? "Copied" : "Copy email"}
            className="footer-pill mt-[1.8cqw] inline-flex max-w-full items-center rounded-full border px-[1.8cqw] py-[0.7cqw] text-[clamp(12px,1.7cqw,21px)] transition-colors"
          >
            <span className="truncate">{label}</span>
          </button>
        </div>
      </div>
    </MotionConfig>
  );
}
