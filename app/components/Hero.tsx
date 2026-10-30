import { social } from "@/app/data/social";

// Two columns, like the reference: the statement on the left, a short paragraph on the
// right. Nothing in it moves. The resume lives in the nav, so the hero has no buttons.
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
