"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AboutPanelContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const AboutPanelContext = createContext<AboutPanelContextValue | null>(null);

export function AboutPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // The panel is an overlay on mobile/tablet and a fixed sidebar on desktop —
  // either way the page behind it shouldn't scroll while it's open.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousOverflow;
    };
  }, [isOpen]);

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
