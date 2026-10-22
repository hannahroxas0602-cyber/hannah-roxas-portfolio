"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Every video ships with a still beside it: foo.mp4 -> foo.poster.jpg
// (extracted with ffmpeg, see public/images/**/*.poster.jpg).
export function posterFor(src: string) {
  return src.replace(/\.[a-z0-9]+$/i, ".poster.jpg");
}

// A muted, looping autoplay demo. If the video can't load, the fallback image
// (or its poster) takes its place so the section is never left blank. The
// className is shared by both, so it should size the element to its parent
// (the parent must be positioned, since the fallback uses `fill`).
export default function DemoVideo({
  src,
  alt,
  className,
  fallbackSrc,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  /** Image to show if the video fails; defaults to the video's poster. */
  fallbackSrc?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // An error that fires before hydration never reaches onError, so check once on mount.
  useEffect(() => {
    if (videoRef.current?.error) setFailed(true);
  }, []);

  if (failed) {
    return <Image src={fallbackSrc ?? posterFor(src)} alt={alt} fill sizes={sizes} className={className} />;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={posterFor(src)}
      aria-label={alt}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
