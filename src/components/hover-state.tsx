import {
  type Category,
  getPrefix,
  getVariants,
  sampleValues,
} from "../utils/yummacss";
import VariantList from "./variant-list";

interface Props {
  category: Category;
  name: string;
}

/**
 * The interactive states, which is what a reader on a utility page is after.
 *
 * The full set of sixteen belongs on the pseudo-classes page: `:empty` and
 * `:indeterminate` are worth knowing about, but not worth repeating under a
 * "Hover State" heading on a hundred and thirty pages.
 */
const INTERACTIVE = ["h", "f", "a", "fv", "fw"];

export default function HoverVariant({ category, name }: Props) {
  const prefix = getPrefix(category, name);
  const value = sampleValues(category, name, 1)[0];
  const base = value ? `${prefix}-${value}` : prefix;

  const pseudoClasses = getVariants(category, name).pseudoClasses ?? [];
  const rows = INTERACTIVE.flatMap((wanted) => {
    const entry = pseudoClasses.find((p) => p.prefix === wanted);
    return entry
      ? [{ className: `${entry.prefix}:${base}`, detail: entry.value }]
      : [];
  });

  return (
    <VariantList
      rows={rows}
      description={
        <>
          Prefix <code className="px-1 bg-border c-code">{base}</code> with a
          state to apply it only while that state matches.
        </>
      }
      href="/docs/pseudo-classes"
      linkText={`All ${pseudoClasses.length} Pseudo Classes`}
    />
  );
}
