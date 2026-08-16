"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useAboutPanel } from "@/app/components/AboutPanelContext";
import AboutPanel from "@/app/components/AboutPanel";
import PageTransition from "@/app/components/PageTransition";

const PANEL_WIDTH = 420;

export default function AppShell({ children }: { children: ReactNode }) {
  const { isOpen } = useAboutPanel();

  return (
    <div className="flex min-h-full w-full">
      <motion.div
        animate={{ width: isOpen ? `calc(100% - ${PANEL_WIDTH}px)` : "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="flex min-h-full flex-none flex-col"
      >
        <PageTransition>{children}</PageTransition>
      </motion.div>

      <AboutPanel width={PANEL_WIDTH} />
    </div>
  );
}
