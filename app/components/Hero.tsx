import { social } from "@/app/data/social";
import RabbitHole from "@/app/components/RabbitHole";

// The hero is built for the first three seconds of a recruiter's visit: one statement
// that says what I am, a quiet row of facts, and, off to the side, the rabbit hole.
// Nothing in it moves. It shares its width and left edge with the projects below.
export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 pb-6 sm:px-10 sm:pt-14 lg:pt-[4.25rem] lg:pb-12">
      <p className="welcome text-base text-neutral-500 italic sm:text-lg">
        Welcome to the rabbit hole <span aria-hidden>↓</span>
      </p>

      <div className="mt-2 grid items-end gap-x-10 gap-y-5 lg:mt-3 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <h1 className="welcome text-[clamp(1.9rem,3.5vw,3.1rem)] leading-[1.08] tracking-[-0.02em] text-pretty text-neutral-950 lg:col-start-1 lg:row-start-1">
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

        <RabbitHole className="h-36 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-44" />

        <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-4 text-sm lg:col-start-1 lg:row-start-2">
          <div>
            <dt className="text-neutral-400">Currently</dt>
            <dd className="mt-1 leading-snug text-neutral-700">
              Sole designer @ Learvo, designing and building in React and the API.
            </dd>
          </div>
          <div>
            <dt className="text-neutral-400">Open to</dt>
            <dd className="mt-1 flex items-start gap-2 leading-snug text-neutral-700">
              <span aria-hidden className="mt-[0.35rem] size-1.5 shrink-0 rounded-full bg-accent" />
              Product Designer / Design Engineer roles
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
