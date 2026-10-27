import Image from "next/image";
import { social } from "@/app/data/social";

// The hero is built for the first three seconds of a recruiter's visit: one statement
// that says what I am, and a quiet row of facts. Nothing in it moves. It is centred
// and set in two lines, so the sentence reads as a statement.
export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 pb-6 sm:px-10 sm:pt-14 lg:pt-[4.25rem] lg:pb-12">
      {/* The welcome sits between two small pictures on one line: the clay rabbit diving
          into the hole (1), "Welcome to the rabbit hole", then the rabbit in the hole (2).
          The pictures are decorative, so the line itself is the only text. */}
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        <div className="flex flex-1 justify-end">
          <Image
            aria-hidden
            src="/images/hero/hero-1.webp"
            alt=""
            width={245}
            height={360}
            priority
            className="h-14 w-auto sm:h-24"
          />
        </div>
        <p className="welcome max-w-[11rem] shrink-0 text-center text-[0.95rem] leading-snug text-balance text-neutral-500 italic sm:max-w-none sm:text-xl">
          Welcome to the rabbit hole
        </p>
        <div className="flex flex-1 justify-start">
          <Image
            aria-hidden
            src="/images/hero/hero-2.webp"
            alt=""
            width={304}
            height={360}
            priority
            className="h-14 w-auto sm:h-24"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-y-7 text-center lg:mt-5 lg:gap-y-8">
        <h1 className="welcome max-w-6xl text-[clamp(1.6rem,3.3vw,2.9rem)] leading-[1.06] tracking-[-0.022em] text-balance text-neutral-950">
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

        <dl className="flex max-w-3xl flex-col gap-y-2.5 text-[0.8rem] leading-snug text-neutral-700 min-[400px]:text-sm sm:text-[0.95rem]">
          <div>
            <dt className="inline text-neutral-400">Currently </dt>
            <dd className="inline">
              Sole designer @ Learvo. 4 features shipped to a live product,
              front end and API.
            </dd>
          </div>
          <div className="whitespace-nowrap">
            <dt className="inline text-neutral-400">Open to </dt>
            <dd className="inline">
              <span
                aria-hidden
                className="mr-1.5 inline-block size-1.5 rounded-full bg-accent align-middle"
              />
              Product Designer / Design Engineer roles
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
