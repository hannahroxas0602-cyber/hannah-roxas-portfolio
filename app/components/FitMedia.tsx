import Image from "next/image";
import DemoVideo from "@/app/components/DemoVideo";

// A picture or video shown whole in its container, never cropped. The space the picture doesn't cover is
// filled with a soft, blurred, enlarged copy of the same picture (a still for videos), so it never looks
// like blank bars and the frame keeps its size.
export default function FitMedia({ src, backdrop, width, height, alt, sizes }: { src: string; backdrop: string; width: number; height: number; alt: string; sizes: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-panel-2">
      <Image src={backdrop} alt="" width={120} height={120} aria-hidden className="absolute inset-0 size-full scale-125 object-cover opacity-70 blur-2xl" sizes="10vw" />
      {src.endsWith(".mp4") ? (
        <DemoVideo src={src} alt={alt} fallbackSrc={backdrop} sizes={sizes} className="relative size-full object-contain" />
      ) : (
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="relative size-full object-contain" />
      )}
    </div>
  );
}
