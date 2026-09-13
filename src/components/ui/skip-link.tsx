/**
 * The first thing a keyboard reaches on every page, parked off the top until
 * it takes focus. Without it, reaching an article means tabbing through the
 * whole navbar and the whole sidebar, on every page.
 *
 * Styled as one of the pagination buttons, square corners included: it is a
 * page action like they are, and `surface` sits close enough to `page` that
 * the border is what separates it from the background.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="p-f t--20 l-2 zi-50 d-f ai-c jc-c h-8 px-3 bc-border bg-surface a:bg-surface-7 c-accent bw-1 fs-sm td-none tp-c tdu-150 ttf-io fv:t-2 fv:oc-white fv:oo-2"
    >
      Skip to main content
    </a>
  );
}
