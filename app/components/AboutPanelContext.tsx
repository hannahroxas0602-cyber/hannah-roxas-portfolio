"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AboutPanelContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

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
