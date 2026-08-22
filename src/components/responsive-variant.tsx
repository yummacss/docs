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

export default function ResponsiveVariant({ category, name }: Props) {
  const prefix = getPrefix(category, name);
  const value = sampleValues(category, name, 1)[0];
  const base = value ? `${prefix}-${value}` : prefix;

  // Every breakpoint the utility accepts, rather than the four that used to be
  // typed out here: `@xl` & `@pc` existed the whole time and were never shown.
  const rows = (getVariants(category, name).mediaQueries ?? []).map(
    (entry) => ({
      className: `@${entry.prefix}:${base}`,
      detail: entry.value,
    }),
  );

  return (
    <VariantList
      rows={rows}
      description={
        <>
          Prefix <code className="px-1 bg-border c-code">{base}</code> with a
          breakpoint to apply it from that width up.
        </>
      }
      href="/docs/media-queries"
      linkText="Media Queries"
    />
  );
}
