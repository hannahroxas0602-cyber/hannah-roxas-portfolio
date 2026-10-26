import type { ReactNode } from "react";

// The serif emphasis: wrap the one word (or short phrase) in a heading that
// should sing. See .serif-em in globals.css.
export function Em({ children }: { children: ReactNode }) {
  return <span className="serif-em">{children}</span>;
}

// A heading with its last word in the serif: "Product & UX design" renders
// "Product & UX" in the sans and "design" in the italic serif.
export function EmphasizeLast({ text }: { text: string }) {
  const i = text.lastIndexOf(" ");
  if (i < 0) return <Em>{text}</Em>;
  return (
    <>
      {text.slice(0, i + 1)}
      <Em>{text.slice(i + 1)}</Em>
    </>
  );
}
