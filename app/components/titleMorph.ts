// The project title morph: tapping a project link carries its title up into the
// big page title of the case study it opens (a shared-element view transition).
//
// The name is only ever set for the one navigation that needs it. On click,
// HoleLink names the title inside the tapped link ([data-vt-title]); when the
// next page mounts, PageTransition names that page's title ([data-vt-target])
// for the length of the transition. Leaving the names on permanently would
// make every other navigation float those titles on their own.
const NAME = "project-title";
const EXPIRES_MS = 4000;
const CLEAR_AFTER_MS = 1000;

let pending: { at: number } | null = null;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function startTitleMorph(link: HTMLElement) {
  const title = link.querySelector<HTMLElement>("[data-vt-title]");
  if (!title || reducedMotion()) return;
  title.style.viewTransitionName = NAME;
  pending = { at: Date.now() };
}

// Called from the incoming page's layout effect, which runs before the browser
// captures the new page, so the pair forms in the same transition.
export function finishTitleMorph(page: HTMLElement) {
  const nav = pending;
  pending = null;
  if (!nav || Date.now() - nav.at >= EXPIRES_MS) return;
  const target = page.querySelector<HTMLElement>("[data-vt-target]");
  if (!target) return;
  target.style.viewTransitionName = NAME;
  setTimeout(() => {
    target.style.viewTransitionName = "";
  }, CLEAR_AFTER_MS);
}
