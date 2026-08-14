import Image from "next/image";
import Link from "next/link";

type NextProjectPreviewProps = {
  label: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export default function NextProjectPreview({
  label,
  title,
  description,
  href,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
}: NextProjectPreviewProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
      <p className="text-sm font-medium tracking-wide text-neutral-400 uppercase">{label}</p>

      <Link href={href} className="group mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative aspect-[4/3] w-full max-w-xs shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:w-1/2">
          <Image
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 30vw, 100vw"
          />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900">
            {title}
          </h2>
          <p className="mt-2 max-w-sm text-base leading-relaxed text-neutral-600">
            {description}
          </p>
        </div>
      </Link>
    </section>
  );
}
