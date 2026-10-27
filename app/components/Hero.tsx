import { social } from "@/app/data/social";

// The hero is built for the first three seconds of a recruiter's visit: one statement
// that says what I am, and a quiet row of facts. Nothing in it moves. It is centred
// and set in two lines, so the sentence reads as a statement.
export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 pb-6 sm:px-10 sm:pt-14 lg:pt-[4.25rem] lg:pb-12">
      <p className="welcome text-center text-base text-neutral-500 italic sm:text-lg">
        Welcome to the rabbit hole <span aria-hidden>↓</span>
      </p>

      <div className="mt-3 flex flex-col items-center gap-y-7 text-center lg:mt-4 lg:gap-y-8">
        <h1 className="welcome max-w-6xl text-[clamp(1.6rem,3.3vw,2.9rem)] leading-[1.06] tracking-[-0.022em] text-balance text-neutral-950">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="View LinkedIn"
            className="link-underline"
          >
            Hannah Roxas
          </a>
          {" "}designs it, then <br className="hidden sm:block" /> <em>ships it to production</em>, front end and back.
        </h1>

        <dl className="flex max-w-3xl flex-col gap-y-2.5 text-sm leading-snug text-neutral-700 sm:text-[0.95rem]">
          <div>
            <dt className="inline text-neutral-400">Currently </dt>
            <dd className="inline">
              Sole designer @ Learvo. 4 features shipped to a live product, front end and API.
            </dd>
          </div>
          <div>
            <dt className="inline text-neutral-400">Open to </dt>
            <dd className="inline">Product Designer / Design Engineer roles</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
