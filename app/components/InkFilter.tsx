// The "ink on paper" look for script lettering: a slightly wobbly edge, as if the
// pen bled into paper, and a rare tiny pit where the ink skipped. Defined once;
// the .script class applies it. Zero size and hidden from assistive tech.
export default function InkFilter() {
  return (
    <svg aria-hidden width="0" height="0" className="pointer-events-none absolute">
      <filter id="ink" x="-4%" y="-14%" width="108%" height="128%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="4" result="edge" />
        <feDisplacementMap in="SourceGraphic" in2="edge" scale="1.15" xChannelSelector="R" yChannelSelector="G" result="rough" />
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" result="grain" />
        <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  10 0 0 0 -1.0" result="pits" />
        <feComposite in="rough" in2="pits" operator="in" />
      </filter>
    </svg>
  );
}
