import { filled } from "@/app/data/placeholder";

export type TestimonialData = {
  quote: string | null;
  name: string | null;
  title: string | null;
};

// A testimonial shows only once a real quote and name are filled in; a
// placeholder ("{{TODO: ...}}", null, etc.) never renders.
export function hasTestimonial(t: TestimonialData) {
  return filled(t.quote) && filled(t.name);
}

export default function Testimonial({ testimonial }: { testimonial: TestimonialData }) {
  if (!hasTestimonial(testimonial)) return null;

  return (
    <figure className="max-w-2xl rounded-2xl border border-black/[0.06] bg-neutral-900 p-6">
      <blockquote className="text-base leading-relaxed text-white/90">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-xs font-semibold tracking-widest text-white/50 uppercase">
        {testimonial.name}
        {filled(testimonial.title) && ` · ${testimonial.title}`}
      </figcaption>
    </figure>
  );
}
