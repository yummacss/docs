import Link from "next/link";

export interface VariantRow {
  /** The real class, e.g. `@sm:m-4`. */
  className: string;
  /** What it compiles to, e.g. `@media (min-width: 40rem)`. */
  detail: string;
}

interface Props {
  rows: VariantRow[];
  /** One sentence. The full explanation lives on the concept page. */
  description: React.ReactNode;
  /** Concept page carrying the heavy explanation for this variant kind. */
  href: string;
  linkText: string;
}

/**
 * The real classes for one variant kind, applied to one real utility.
 *
 * These sections used to render a single card built from a placeholder, which
 * left the reader to guess which prefixes exist & whether their own guess was
 * one of them. Every row here is a class that resolves, read from the same
 * definitions the generator uses, so a variant added to the framework appears
 * without anyone editing a page.
 */
export default function VariantList({
  rows,
  description,
  href,
  linkText,
}: Props) {
  if (rows.length === 0) return null;

  return (
    <div className="mb-6 p-4 bc-border bg-surface bw-1">
      <p className="mb-3 c-white/70 fs-sm">{description}</p>

      <div className="d-g gtc-1 g-1 @sm:gtc-2">
        {rows.map((row) => (
          <div
            key={row.className}
            className="d-f ai-c jc-sb g-3 px-3 py-2 bg-page"
          >
            <code className="c-code fs-sm ws-nw">{row.className}</code>
            <code className="fs-xs ta-r" style={{ color: "#b9bed5" }}>
              {row.detail}
            </code>
          </div>
        ))}
      </div>

      <Link
        href={href}
        className="d-if ai-c mt-3 c-accent-dim fs-xs h:c-accent fv:oc-white fv:oo-2 fv:ow-2"
      >
        {linkText}
      </Link>
    </div>
  );
}
