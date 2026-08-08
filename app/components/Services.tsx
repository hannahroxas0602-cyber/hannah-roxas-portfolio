import { servicesIntro, services } from "@/app/services/data";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:px-10 sm:py-24">
      <p className="text-lg text-neutral-500">
        <span className="mr-1">{servicesIntro.eyebrow}</span>
        <span className="text-black">{servicesIntro.title}</span>
      </p>

      <div className="mt-10 border-t border-black/[0.08]">
        {services.map((service) => (
          <div
            key={service.slug}
            className="flex flex-col gap-2 border-b border-black/[0.08] py-8 sm:flex-row sm:items-baseline sm:gap-20"
          >
            <h2 className="text-lg font-normal text-black sm:w-56 sm:flex-none">
              {service.title}
            </h2>
            <p className="text-base leading-relaxed text-neutral-500">
              {service.deliverables.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
