"use client";

import { createContext, useContext, useState, type MouseEvent, type ReactNode } from "react";

type AboutPanelContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

// About links point at /about (shareable, crawlable, works without JS), but a
// plain click opens the side panel instead. Modified clicks (new tab, etc.)
// fall through to the real page.
export function openAboutOnPlainClick(e: MouseEvent, open: () => void) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  open();
}

const AboutPanelContext = createContext<AboutPanelContextValue | null>(null);

export function AboutPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AboutPanelContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </AboutPanelContext.Provider>
  );
}

export function useAboutPanel() {
  const ctx = useContext(AboutPanelContext);
  if (!ctx) throw new Error("useAboutPanel must be used within AboutPanelProvider");
  return ctx;
}
