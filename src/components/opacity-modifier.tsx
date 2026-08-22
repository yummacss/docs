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

export default function OpacityModifier({ category, name }: Props) {
  const prefix = getPrefix(category, name);
  const value = sampleValues(category, name, 1)[0];
  const base = value ? `${prefix}-${value}` : prefix;

  // The full set, because this is where a guess goes wrong: the steps are
  // fives and they stop at 95, which no amount of `(opacity)` would tell you.
  const rows = (getVariants(category, name).opacity ?? []).map((entry) => ({
    className: `${base}/${entry.prefix}`,
    detail: entry.value,
  }));

  return (
    <VariantList
      rows={rows}
      description={
        <>
          Append <code className="px-1 bg-border c-code">/</code> and a step to
          any value to set its transparency.
        </>
      }
      href="/docs/colors"
      linkText="Colors"
    />
  );
}
