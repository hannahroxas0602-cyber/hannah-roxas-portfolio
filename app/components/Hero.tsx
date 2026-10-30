import { social } from "@/app/data/social";

// Two columns, like the reference: the statement on the left, a short paragraph on the
// right, and the two buttons right under the statement. Nothing in it moves.
export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 pb-10 sm:px-10 sm:pt-16 lg:pt-20 lg:pb-14">
      <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <p className="welcome text-[0.95rem] text-neutral-500 italic sm:text-lg">
            Welcome to the rabbit hole
          </p>
          <h1 className="welcome mt-3 text-[clamp(2rem,4.3vw,3.7rem)] leading-[1.04] tracking-[-0.025em] text-neutral-950">
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View LinkedIn"
              className="link-underline"
            >
              Hannah Roxas
            </a>{" "}
            designs it, then <em>ships it to production</em>, front end and back.
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#works"
              className="rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              View my work
            </a>
            <a
              href={social.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View resume"
              className="rounded-full border border-black/15 bg-white/60 px-6 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:border-black/30 hover:bg-white"
            >
              Resume
            </a>
          </div>
        </div>

        <dl className="flex max-w-md flex-col gap-y-3 text-sm leading-relaxed text-neutral-700 sm:text-base lg:pb-1">
          <div>
            <dt className="inline text-neutral-400">Currently </dt>
            <dd className="inline">
              Product designer @ Learvo. 4 features shipped to a live product, front end and
              API.
            </dd>
          </div>
          <div>
            <dt className="inline text-neutral-400">
              <span
                aria-hidden
                className="mr-1.5 inline-block size-1.5 rounded-full bg-accent-deep align-middle"
              />
              Open to{" "}
            </dt>
            <dd className="inline">Product Designer / Design Engineer roles</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
