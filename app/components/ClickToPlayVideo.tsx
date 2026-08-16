"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ClickToPlayVideo({
  src,
  title,
  width,
  height,
  hasAudio = true,
  aspectRatio,
  className = "relative w-full",
}: {
  src: string;
  title: string;
  width: number;
  height: number;
  hasAudio?: boolean;
  /** Override the container's aspect ratio (e.g. "1/1") instead of using the video's native width/height. */
  aspectRatio?: string;
  /** Override the container's sizing classes (defaults to a full-width box; always gets `relative` + `overflow-hidden rounded-xl`). */
  className?: string;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    setIsMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  return (
    <>
      <div
        className={`group overflow-hidden rounded-xl ${className}`}
        style={{ aspectRatio: aspectRatio ?? `${width}/${height}` }}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          aria-label={title}
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label={`Expand ${title}`}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/70 text-black opacity-0 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-200 group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-black">
            <path d="M9 3H3v6h2V5h4V3zm12 0h-6v2h4v4h2V3zM5 15H3v6h6v-2H5v-4zm14 4h-4v2h6v-6h-2v4z" />
          </svg>
        </button>

        {hasAudio && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? `Unmute ${title}` : `Mute ${title}`}
            className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-black/85"
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                <path d="M16.5 12A4.5 4.5 0 0 0 14 8.03v2.31l2.45 2.45c.03-.26.05-.52.05-.79zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.9 8.9 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06a4.5 4.5 0 0 0 2.5-4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        )}
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
              className="relative h-full max-h-[85vh] w-full max-w-4xl"
              style={{ aspectRatio: aspectRatio ?? `${width}/${height}` }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={src}
                controls
                autoPlay
                loop
                muted
                playsInline
                aria-label={title}
                className={`h-full w-full ${aspectRatio ? "object-cover" : "object-contain"}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
