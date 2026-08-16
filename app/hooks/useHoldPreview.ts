"use client";

import { useCallback, useRef, useState } from "react";

const HOLD_DELAY_MS = 350;

/**
 * Touch/pointer press-and-hold detector. A short tap passes through (e.g. lets
 * a wrapping <Link> navigate); holding past HOLD_DELAY_MS flips `held` true and
 * swallows the next click so the hold-to-preview gesture doesn't also navigate.
 */
export function useHoldPreview() {
  const [held, setHeld] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasHeldRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      wasHeldRef.current = true;
      setHeld(true);
    }, HOLD_DELAY_MS);
  }, []);

  const release = useCallback(() => {
    clearTimer();
    setHeld(false);
  }, []);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (wasHeldRef.current) {
      e.preventDefault();
      wasHeldRef.current = false;
    }
  }, []);

  return {
    held,
    handlers: {
      onPointerDown,
      onPointerUp: release,
      onPointerCancel: release,
      onPointerLeave: release,
      onClickCapture,
    },
  };
}
