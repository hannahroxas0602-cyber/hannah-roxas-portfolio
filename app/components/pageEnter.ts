// After the circle opens into a project, the page's content eases in piece by
// piece instead of appearing all at once: the first screen's blocks rise and
// fade in, one after another. Blocks below the fold are left alone.
//
// Runs in the incoming page's layout effect, before the browser captures the
// new page for the transition, so nothing flashes at full opacity first.
const BASE_DELAY_MS = 200; // lets the circle get most of the way open
const STEP_MS = 75;
const MAX_UNITS = 10;
const SAFETY_MS = 2500;
const WAIT_MS = 4000; // how long to wait for content that hasn't arrived

// The blocks to animate: each section, or, for the section holding the project
// title (which flies in on its own, see titleMorph.ts), that section's other
// blocks, so the intro doesn't arrive as one slab.
function collect(parent: Element, target: Element | null, out: HTMLElement[]) {
  for (const child of Array.from(parent.children) as HTMLElement[]) {
    if (child === target) continue;
    if (target && child.contains(target)) collect(child, target, out);
    else out.push(child);
  }
}

// Returns true once the page's <main> exists (whether or not anything needed
// animating), false if the content hasn't arrived yet.
function run(page: HTMLElement) {
  const main = page.querySelector("main");
  if (!main) return false;

  const units: HTMLElement[] = [];
  for (const section of Array.from(main.querySelectorAll<HTMLElement>("section"))) {
    if (section.parentElement?.closest("section")) continue; // inside one we already handle
    const target = section.querySelector("[data-vt-target]");
    if (target) collect(section, target, units);
    else units.push(section);
  }

  // Measured from the top of the page: the new page starts at the top even if
  // the old one was scrolled when the link was clicked.
  const fold = window.innerHeight * 1.05;
  const visible = units
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.height > 0 && r.top + window.scrollY < fold;
    })
    .slice(0, MAX_UNITS);

  visible.forEach((el, i) => {
    el.style.setProperty("--rise-delay", `${BASE_DELAY_MS + i * STEP_MS}ms`);
    el.classList.add("rise-in");
    const clear = () => {
      el.classList.remove("rise-in");
      el.style.removeProperty("--rise-delay");
    };
    el.addEventListener("animationend", clear, { once: true });
    setTimeout(clear, SAFETY_MS);
  });
  return true;
}

// The new page's content can arrive a moment after the page mounts (it shows a
// loading state first when it isn't prefetched), so watch for it. Returns a
// cleanup function.
export function staggerPageIn(page: HTMLElement) {
  if (run(page)) return () => {};
  const observer = new MutationObserver(() => {
    if (run(page)) observer.disconnect();
  });
  observer.observe(page, { childList: true, subtree: true });
  const timer = setTimeout(() => observer.disconnect(), WAIT_MS);
  return () => {
    observer.disconnect();
    clearTimeout(timer);
  };
}
