import Image from "next/image";
import Link from "next/link";
import { learvoHero } from "@/app/learvo/data";

// Learvo's own colours (see the Color System in Brand Identity).
const MINT = "#D8F7D8";
const BLUE = "#4065C5";

// Learvo's real palette, from the Color System image in Brand Identity.
const SWATCHES = [
  { name: "Ink", hex: "#1D2527", css: "#1D2527" },
  { name: "Primary Green", hex: "#4CA886", css: "#4CA886" },
  { name: "Primary Blue", hex: "#4065C5", css: "#4065C5" },
  { name: "Ambient Gradient", hex: "#DBECF2 to #D8F7D8", css: "linear-gradient(#DBECF2, #D8F7D8)" },
];

// Tiles share one frame: big rounded corners, hairline border, tight gutters (like the
// Continuum design-system bento). No label chips: each tile is a link with a screen-reader
// label, and the pictures speak for themselves.
const tile =
  "relative block h-full w-full overflow-hidden rounded-3xl border border-black/[0.06] outline-offset-2 focus-visible:outline-2 focus-visible:outline-neutral-900";

type Pic = { src: string; alt: string };

function Linked({
  href,
  label,
  bg,
  children,
}: {
  href: string;
  label: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={tile} style={{ background: bg }}>
      {children}
      <span className="sr-only">{label}</span>
    </Link>
  );
}

// Photos are decoration, not links.
function Photo({ pic, position, sizes }: { pic: Pic; position: string; sizes: string }) {
  return (
    <div className={`${tile} bg-neutral-200`}>
      <Image src={pic.src} alt={pic.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
    </div>
  );
}

// A small frameless sticker that links to its section, tilted a touch so the three read as scattered.
function Sticker({ href, label, pic, tilt }: { href: string; label: string; pic: Pic; tilt: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`relative block h-full w-full rounded-2xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-neutral-900 ${tilt}`}
    >
      <Image src={pic.src} alt={pic.alt} fill sizes="140px" className={`object-contain p-0.5`} />
    </Link>
  );
}

// A compact board, 8 columns x 3 rows on desktop (about 330px tall), every cell used:
//   landing landing landing landing students students students avatar
//   landing landing landing landing students students students lenny
//   pencil  exam    exam    exam    exam     colors   colors   colors
// One real photo, the landing page, and three stickers spread over the left, right and middle.
// Phones are 3 columns and stack the big tiles. Placement is explicit at md+, so DOM order only
// matters on phones.
export default function LearvoHeroBento() {
  const b = learvoHero.bento;
  return (
    <nav aria-label="Jump to a part of the work" className="mt-8 mb-2">
      <ul className="grid auto-rows-[4.25rem] grid-cols-3 gap-2.5 md:auto-rows-[6.5rem] md:grid-cols-8">
        <li className="col-span-3 row-span-3 md:col-span-4 md:row-span-2 md:col-start-1 md:row-start-1">
          <Linked href="#landing-page" label="Landing page" bg={MINT}>
            <Image
              src={b.landing.src}
              alt={b.landing.alt}
              fill
              priority
              sizes="(min-width: 768px) 440px, 100vw"
              className={`object-cover`}
              style={{ objectPosition: "50% 45%" }}
            />
          </Linked>
        </li>

        <li className="col-span-3 row-span-3 md:col-span-3 md:row-span-2 md:col-start-5 md:row-start-1">
          <Photo pic={b.students} position="55% 30%" sizes="(min-width: 768px) 380px, 100vw" />
        </li>

        {/* The "I have an exam coming up" goal card from onboarding, rebuilt crisp with the real doodle. */}
        <li className="col-span-3 row-span-2 md:col-span-4 md:col-start-2 md:row-span-1 md:row-start-3">
          <Linked href="#onboarding-quiz-flow" label="Onboarding" bg="#68AB88">
            <div className="absolute inset-2.5 flex items-center gap-4 rounded-2xl bg-white py-2 pr-4 pl-3 shadow-sm">
              <div className="relative h-full w-14 shrink-0 sm:w-16">
                <Image
                  src={b.calendar.src}
                  alt={b.calendar.alt}
                  fill
                  sizes="64px"
                  className={`object-contain`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-tight font-semibold text-neutral-900">I have an exam coming up</p>
                <p className="mt-1 text-[11px] leading-snug text-neutral-600">Retrieval practice beats re-reading.</p>
              </div>
              <span
                aria-hidden
                className="shrink-0 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-wide text-white"
                style={{ background: BLUE }}
              >
                QUIZ →
              </span>
            </div>
          </Linked>
        </li>

        {/* The color system, as real swatches (hex values for screen readers). */}
        <li className="col-span-3 md:col-span-3 md:col-start-6 md:row-start-3">
          <Link
            href="#brand-identity"
            className={`${tile} flex p-2.5`}
            style={{ background: "linear-gradient(160deg, #DBECF2, #D8F7D8)" }}
          >
            <span className="sr-only">
              Color system: {SWATCHES.map((c) => `${c.name} ${c.hex}`).join(", ")}.
            </span>
            <span aria-hidden className="grid h-full w-full grid-cols-4 gap-1.5">
              {SWATCHES.map((c) => (
                <span key={c.name} className="rounded-xl shadow-sm ring-1 ring-black/10" style={{ background: c.css }} />
              ))}
            </span>
          </Link>
        </li>

        {/* Stickers: avatar and Lenny down the right edge, the doodle bottom-left. */}
        <li className="row-span-2 md:row-span-1 md:col-start-8 md:row-start-1">
          <Sticker href="#top-nav" label="Preset avatars" pic={b.avatar} tilt="rotate-6" />
        </li>
        <li className="row-span-2 md:row-span-1 md:col-start-1 md:row-start-3">
          <Sticker href="#doodles" label="Doodle system" pic={b.pencil} tilt="-rotate-3" />
        </li>
        <li className="row-span-2 md:row-span-1 md:col-start-8 md:row-start-2">
          <Sticker href="#mascot" label="Lenny, the mascot" pic={b.lenny} tilt="rotate-3" />
        </li>
      </ul>
    </nav>
  );
}
