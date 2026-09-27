// A minimal portal on a project image: on hover, two thin rings ripple out from
// the center while the image eases forward (its own hover zoom), like stepping
// through. Transform/opacity only. Shown only on devices with a real hover and
// no reduced-motion preference; the rings are invisible at rest (see globals.css).
//
// Place inside a positioned, overflow-hidden image container that sits within
// an element with the `group` class.
export default function Portal() {
  return (
    <span
      aria-hidden
      className="portal pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      <span className="portal-ring" />
      <span className="portal-ring portal-ring-late" />
    </span>
  );
}
