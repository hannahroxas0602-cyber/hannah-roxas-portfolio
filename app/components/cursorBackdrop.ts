// Picks the cursor's color from what's under it: the deep pink on light
// backgrounds, a brighter pink on dark ones, whichever contrasts more. A solid
// background is read from its computed color; a photo or video is sampled at
// the pointer, so a dark corner of a bright photo still gets the bright pink.
export const CURSOR_DEEP = "#CA1CC0";
export const CURSOR_BRIGHT = "#FF5BF2";

// Relative luminance of the two pinks (WCAG), used to compare contrast.
const DEEP_LUMINANCE = 0.16;
const BRIGHT_LUMINANCE = 0.36;

function linear(v: number) {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(r: number, g: number, b: number) {
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

export function colorFor(backdropLuminance: number) {
  const against = (l: number) => {
    const [hi, lo] = l > backdropLuminance ? [l, backdropLuminance] : [backdropLuminance, l];
    return (hi + 0.05) / (lo + 0.05);
  };
  return against(BRIGHT_LUMINANCE) > against(DEEP_LUMINANCE) ? CURSOR_BRIGHT : CURSOR_DEEP;
}

let canvas: HTMLCanvasElement | null = null;

// Luminance of the pixel of an <img>/<video> under (x, y), or null if it can't
// be read (not loaded yet, cross-origin).
function sampleMedia(el: HTMLImageElement | HTMLVideoElement, x: number, y: number) {
  const nw = el instanceof HTMLVideoElement ? el.videoWidth : el.naturalWidth;
  const nh = el instanceof HTMLVideoElement ? el.videoHeight : el.naturalHeight;
  if (!nw || !nh) return null;
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const fit = style.objectFit;
  const sx = rect.width / nw;
  const sy = rect.height / nh;
  const scaleX = fit === "cover" ? Math.max(sx, sy) : fit === "contain" ? Math.min(sx, sy) : sx;
  const scaleY = fit === "cover" || fit === "contain" ? scaleX : sy;
  // object-position defaults to the center; the few off-center ones are close enough.
  const px = (x - rect.left - (rect.width - nw * scaleX) / 2) / scaleX;
  const py = (y - rect.top - (rect.height - nh * scaleY) / 2) / scaleY;
  if (px < 0 || py < 0 || px >= nw || py >= nh) return null;
  try {
    canvas ??= document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(el, Math.floor(px), Math.floor(py), 1, 1, 0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return a < 128 ? null : luminance(r, g, b);
  } catch {
    return null;
  }
}

// Looks down through everything stacked under the pointer, topmost first, for
// the first thing that decides the backdrop: a photo/video pixel, or a mostly
// opaque background color. Going through the whole stack (not just the top
// element's parents) sees past transparent overlays, like the scrim over the
// black hero circle.
export function cursorColorAt(x: number, y: number) {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) {
      const l = sampleMedia(el, x, y);
      if (l !== null) return colorFor(l);
    }
    const bg = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
    if (bg && bg.length >= 3 && (bg.length === 3 || Number(bg[3]) >= 0.5)) {
      return colorFor(luminance(Number(bg[0]), Number(bg[1]), Number(bg[2])));
    }
  }
  return CURSOR_DEEP;
}
