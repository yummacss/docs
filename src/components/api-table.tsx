"use client";

import {
  backgroundUtils,
  borderUtils,
  boxModelUtils,
  colorUtils,
  effectUtils,
  flexboxUtils,
  fontUtils,
  gridUtils,
  interactivityUtils,
  outlineUtils,
  positioningUtils,
  svgUtils,
  tableUtils,
  textUtils,
  transformUtils,
  type Utilities,
} from "@yummacss/api";

type Category =
  | "background"
  | "border"
  | "boxModel"
  | "color"
  | "effect"
  | "flexbox"
  | "font"
  | "grid"
  | "interactivity"
  | "outline"
  | "positioning"
  | "svg"
  | "table"
  | "text"
  | "transform";

interface ApiTableProps {
  category: Category;
  name: string;
}

const catGetters: Record<Category, () => Utilities> = {
  background: backgroundUtils,
  border: borderUtils,
  boxModel: boxModelUtils,
  color: colorUtils,
  effect: effectUtils,
  flexbox: flexboxUtils,
  font: fontUtils,
  grid: gridUtils,
  interactivity: interactivityUtils,
  outline: outlineUtils,
  positioning: positioningUtils,
  svg: svgUtils,
  table: tableUtils,
  text: textUtils,
  transform: transformUtils,
};

export default function ApiTable({ category, name }: ApiTableProps) {
  const variants: Array<{ prefix: string; property: string; value: string }> =
    [];

  try {
    if (!category || !name) {
      throw new Error("Missing props: category and name are required");
    }

    const getter = catGetters[category];
    if (!getter) {
      throw new Error(`Unknown category: ${category}`);
    }

    const utils = getter();
    const util = utils[name];

    if (util) {
      Object.entries(util.values).forEach(([suffix, value]) => {
        const prefix = suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
        const property = util.properties[0];

        variants.push({
          prefix,
          property,
          value,
        });
      });
    }
  } catch (err) {
    console.error("Failed to get utility:", err);
  }

  return (
    <div className="max-h-90 o-y-auto mb-6">
      <table className="w-full bc-c" style={{ backgroundColor: "#21243fa6" }}>
        <thead>
          <tr>
            <th
              className="fs-md fw-600 px-4 py-2 ta-l b-1 tc-white"
              style={{ borderColor: "#31365e" }}
            >
              Class
            </th>
            <th
              className="fs-md fw-600 px-4 py-2 ta-l b-1 tc-white"
              style={{ borderColor: "#31365e" }}
            >
              Style
            </th>
          </tr>
        </thead>
        <tbody>
          {variants.length > 0 ? (
            variants.map((variant, index) => (
              <tr key={`${variant.prefix}-${index}`}>
                <td
                  className="px-4 py-2 b-1 tc-white/80"
                  style={{ borderColor: "#31365e" }}
                >
                  <code
                    className="px-2 py-1"
                    style={{ backgroundColor: "#31365e" }}
                  >
                    {variant.prefix}
                  </code>
                </td>
                <td
                  className="px-4 py-2 b-1 tc-white/80"
                  style={{ borderColor: "#31365e" }}
                >
                  <code className="fs-sm">
                    {variant.property}: {variant.value}
                  </code>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={2}
                className="px-4 py-2 b-1 tc-white/80 ta-c"
                style={{ borderColor: "#31365e" }}
              >
                Something's gone wrong. Please{" "}
                <a
                  href="https://github.com/yumma-lib/yumma-css-docs/issues"
                  className="tc-blue-5 h:td-u"
                >
                  report this issue
                </a>
                .
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
