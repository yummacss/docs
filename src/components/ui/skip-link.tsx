/**
 * The first thing a keyboard reaches on every page, parked off the top until
 * it takes focus. Without it, reaching an article means tabbing through the
 * whole navbar and the whole sidebar, on every page.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="p-f t--20 l-2 zi-50 px-3 py-2 br-lg bc-border bg-surface c-white bw-1 fs-sm td-none tp-c tdu-150 ttf-io fv:t-2 fv:oc-accent fv:os-s fv:ow-3 fv:oo-2"
    >
      Skip to main content
    </a>
  );
}
