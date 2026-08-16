"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useAboutPanel } from "@/app/components/AboutPanelContext";
import AboutPanel from "@/app/components/AboutPanel";

const PANEL_WIDTH = 420;

export default function AppShell({ children }: { children: ReactNode }) {
  const { isOpen } = useAboutPanel();

  return (
    <div className="relative flex min-h-full w-full flex-1 overflow-hidden">
      <motion.div
        animate={{
          scale: isOpen ? 0.94 : 1,
          x: isOpen ? -PANEL_WIDTH / 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        style={{ transformOrigin: "center left" }}
        className="flex min-h-full w-full origin-left flex-col rounded-3xl"
      >
        {children}
      </motion.div>

      <AboutPanel width={PANEL_WIDTH} />
    </div>
  );
}
