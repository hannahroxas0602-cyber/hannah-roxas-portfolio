"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { ReactNode } from "react";
import { GateLeaf, OrnateKey } from "@/app/components/Gates";

// Wrought-iron gates with panes of frosted glass, in front of a picture. `open` runs from 0 (shut: the work
// shows through the glass, blurred, with a key at the lock) to 1 (swung wide). The ironwork is white wire
// with an ink edge, drawn in Gates.tsx, a different pattern for each project (`variant`), so it holds up on
// a white page. As the doors open the key turns and fades.
function Leaf({ open, side, variant, simple }: { open: MotionValue<number>; side: "l" | "r"; variant: number; simple?: boolean }) {
  const left = side === "l";
  const rotateY = useTransform(open, [0, 1], [0, left ? 84 : -84]);
  const fade = useTransform(open, [0, 0.8, 1], [1, 0.45, 0]);
  return (
    <motion.div
      style={{ rotateY, transformOrigin: left ? "0% 50%" : "100% 50%", transformPerspective: 2600, opacity: fade }}
      className={`absolute inset-y-0 w-1/2 ${left ? "left-0" : "right-0"}`}
    >
      <span aria-hidden className="absolute inset-[2%] rounded-[3px] bg-white/30 shadow-[0_14px_40px_-18px_rgba(30,50,80,0.4)] ring-1 ring-white/50 backdrop-blur-2xl backdrop-saturate-150" />
      {simple ? <span aria-hidden className="absolute inset-y-[2%] right-[8%] left-[8%] border-x border-white/80" /> : <GateLeaf variant={variant} preserveAspectRatio="none" className="absolute inset-0 size-full" />}
    </motion.div>
  );
}

export default function Gate({ open, variant = 0, simple = false, children, className = "" }: { open: MotionValue<number>; variant?: number; simple?: boolean; children: ReactNode; className?: string }) {
  const keyRotate = useTransform(open, [0, 0.12, 0.3], [0, 0, 90]);
  const keyOpacity = useTransform(open, [0, 0.2, 0.34], [1, 1, 0]);
  return (
    <div className={`relative ${className}`}>
      {/* the picture, on a light panel */}
      <div className="absolute inset-[2%] overflow-hidden rounded-xl bg-panel-2 ring-1 ring-black/[0.06]">{children}</div>
      <Leaf open={open} side="l" variant={variant} simple={simple} />
      <Leaf open={open} side="r" variant={variant} simple={simple} />
      {!simple && (
        <motion.span aria-hidden style={{ opacity: keyOpacity }} className="pointer-events-none absolute top-[52%] left-1/2 grid aspect-square w-[15%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/55 shadow-[0_10px_30px_-10px_rgba(30,50,80,0.45)] ring-1 ring-white/80 backdrop-blur-xl">
          <motion.span style={{ rotate: keyRotate }} className="block w-[46%]">
            <OrnateKey className="w-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.22)]" />
          </motion.span>
        </motion.span>
      )}
    </div>
  );
}
