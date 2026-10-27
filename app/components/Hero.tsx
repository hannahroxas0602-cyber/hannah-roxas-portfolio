import { social } from "@/app/data/social";

// The hero is built for the first three seconds of a recruiter's visit: one statement
// that says what I am, and a quiet row of facts. Nothing in it moves. It shares its
// width and left edge with the projects below.
export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 pb-6 sm:px-10 sm:pt-14 lg:pt-[4.25rem] lg:pb-12">
      <p className="welcome text-base text-neutral-500 italic sm:text-lg">
        Welcome to the rabbit hole <span aria-hidden>↓</span>
      </p>

      <div className="mt-2 flex flex-col gap-y-6 lg:mt-3 lg:gap-y-7">
        <h1 className="welcome text-[clamp(1.7rem,3vw,2.65rem)] leading-[1.08] tracking-[-0.02em] text-pretty text-neutral-950">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="View LinkedIn"
            className="link-underline"
          >
            Hannah Roxas
          </a>
          {" "}designs it, then <em>ships it to production</em>, front end and back.
        </h1>

        <dl className="grid grid-cols-1 gap-x-12 gap-y-4 text-sm sm:grid-cols-[auto_auto] sm:justify-start">
          <div>
            <dt className="text-neutral-400">Currently</dt>
            <dd className="mt-1 leading-snug text-neutral-700">
              Sole designer @ Learvo, designing and building in React and the API.
            </dd>
          </div>
          <div>
            <dt className="text-neutral-400">Open to</dt>
            <dd className="mt-1 flex items-start gap-2 leading-snug whitespace-nowrap text-neutral-700">
              <span aria-hidden className="mt-[0.35rem] size-1.5 shrink-0 rounded-full bg-accent" />
              Product Designer / Design Engineer roles
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
