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
        <h1 className="welcome max-w-6xl text-[clamp(1.75rem,3.9vw,3.4rem)] leading-[1.06] tracking-[-0.022em] text-balance text-neutral-950">
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

        <dl className="grid grid-cols-1 gap-x-14 gap-y-4 text-sm sm:grid-cols-[auto_auto] sm:justify-center">
          <div>
            <dt className="text-neutral-400">Currently</dt>
            <dd className="mt-1 leading-snug text-neutral-700">
              Sole designer @ Learvo, designing and building in React and the API.
            </dd>
          </div>
          <div>
            <dt className="text-neutral-400">Open to</dt>
            <dd className="mt-1 flex items-start justify-center gap-2 leading-snug whitespace-nowrap text-neutral-700">
              <span aria-hidden className="mt-[0.35rem] size-1.5 shrink-0 rounded-full bg-accent" />
              Product Designer / Design Engineer roles
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
