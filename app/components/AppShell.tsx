"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";
import { useAboutPanel } from "@/app/components/AboutPanelContext";
import AboutPanel from "@/app/components/AboutPanel";
import PageTransition from "@/app/components/PageTransition";
import DriftingObjects from "@/app/components/DriftingObjects";

const PANEL_WIDTH = 420;

export default function AppShell({ children }: { children: ReactNode }) {
  const { isOpen } = useAboutPanel();

  return (
    // reducedMotion="user": every Framer animation drops movement for visitors
    // who ask their OS for reduced motion, keeping only opacity changes.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-full w-full">
        <motion.div
          animate={{ width: isOpen ? `calc(100% - ${PANEL_WIDTH}px)` : "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="relative flex min-h-full w-full flex-none flex-col sm:w-auto"
        >
          <DriftingObjects />
          <PageTransition>{children}</PageTransition>
        </motion.div>

        <AboutPanel width={PANEL_WIDTH} />
      </div>
    </MotionConfig>
  );
}
