import Image from "next/image";
import { social } from "@/app/data/social";

// The hero is built for the first three seconds of a recruiter's visit: one statement
// that says what I am, and a quiet row of facts. Nothing in it moves. It is centred
// and set in two lines, so the sentence reads as a statement.
export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 pb-6 sm:px-10 sm:pt-14 lg:pt-[4.25rem] lg:pb-12">
      {/* Below 1100px the welcome sits between two small pictures on one line (the second is
          pulled toward the words, because its slanted hole leaves blank space on its left):
          the clay rabbit diving into the hole (1), "Welcome to the rabbit hole", then the
          rabbit in the hole (2). From 1100px up the pictures move out beside the headline
          instead (below), and the welcome stands alone. They are decorative, so the line
          itself is the only text. */}
      <div className="flex items-center justify-center gap-3 [--h:2.5rem] sm:gap-6 sm:[--h:4rem]">
        <div className="flex flex-1 justify-end min-[1100px]:hidden">
          <Image
            aria-hidden
            src="/images/hero/hero-1.webp"
            alt=""
            width={245}
            height={360}
            priority
            className="h-[var(--h)] w-auto"
          />
        </div>
        <p className="welcome max-w-[11rem] shrink-0 text-center text-[0.95rem] leading-snug text-balance text-neutral-500 italic sm:max-w-none sm:text-xl">
          Welcome to the rabbit hole
        </p>
        <div className="flex flex-1 justify-start min-[1100px]:hidden">
          <Image
            aria-hidden
            src="/images/hero/hero-2.webp"
            alt=""
            width={304}
            height={360}
            priority
            className="ml-[calc(var(--h)*-0.32)] h-[var(--h)] w-auto"
          />
        </div>
      </div>

      <div className="mt-9 flex flex-col items-center gap-y-7 text-center sm:mt-11 lg:mt-12 lg:gap-y-8">
        {/* The headline hugs its own width, and on wide screens the two pictures sit on
            either side of it: the rabbit leaping in on the left, the hole waiting on the
            right, so the sentence reads between them. */}
        <div className="relative w-fit max-w-full [--fh:8rem]">
          <Image
            aria-hidden
            src="/images/hero/hero-1.webp"
            alt=""
            width={245}
            height={360}
            className="absolute top-1/2 right-full mr-10 hidden h-[var(--fh)] w-auto -translate-y-1/2 min-[1100px]:block"
          />
          <Image
            aria-hidden
            src="/images/hero/hero-2.webp"
            alt=""
            width={304}
            height={360}
            className="absolute top-1/2 left-full ml-[calc(2.5rem-var(--fh)*0.37)] hidden h-[var(--fh)] w-auto -translate-y-1/2 min-[1100px]:block"
          />
          <h1 className="welcome max-w-6xl text-[clamp(1.55rem,3.15vw,2.8rem)] leading-[1.06] tracking-[-0.022em] text-balance text-neutral-950">
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View LinkedIn"
              className="link-underline"
            >
              Hannah Roxas
            </a>{" "}
            designs it, then <br className="hidden sm:block" />{" "}
            <em>ships it to production</em>, front end and back.
          </h1>
        </div>

        <dl className="flex max-w-3xl flex-col gap-y-2.5 text-[0.8rem] leading-snug text-neutral-700 min-[400px]:text-sm sm:text-[0.95rem]">
          <div>
            <dt className="inline text-neutral-400">Currently </dt>
            <dd className="inline">
              Product designer @ Learvo. 4 features shipped to a live product,
              front end and API.
            </dd>
          </div>
          <div className="whitespace-nowrap">
            <dt className="inline text-neutral-400">Open to </dt>
            <dd className="inline">
              <span
                aria-hidden
                className="mr-1.5 inline-block size-1.5 rounded-full bg-accent-deep align-middle"
              />
              Product Designer / Design Engineer roles
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
