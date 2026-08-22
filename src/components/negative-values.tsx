import {
  type Category,
  getPrefix,
  getProperties,
  getValue,
  sampleValues,
} from "../utils/yummacss";
import VariantList from "./variant-list";

interface Props {
  category: Category;
  name: string;
}

export default function NegativeValues({ category, name }: Props) {
  const prefix = getPrefix(category, name);
  const property = getProperties(category, name)[0] ?? "";

  // Real values off the utility's own scale, each with what it resolves to, so
  // the `--` syntax is shown working rather than described in the abstract.
  const rows = sampleValues(category, name, 4).flatMap((key) => {
    const value = getValue(category, name, key);
    if (!value || value === "0") return [];
    return [
      {
        className: `${prefix}--${key}`,
        detail: `${property}: -${value};`,
      },
    ];
  });

  return (
    <VariantList
      rows={rows}
      description={
        <>
          Double the hyphen to negate any numeric value on the scale, so{" "}
          <code className="px-1 bg-border c-code">{prefix}--</code> takes the
          same range <code className="px-1 bg-border c-code">{prefix}-</code>{" "}
          does.
        </>
      }
      href="/docs/negative-values"
      linkText="Negative Values"
    />
  );
}
