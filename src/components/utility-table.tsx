"use client";

import * as core from "@yummacss/core";

const categoryGetters = {
  background: core.backgroundUtils,
  border: core.borderUtils,
  boxModel: core.boxModelUtils,
  color: core.colorUtils,
  effect: core.effectUtils,
  flexbox: core.flexboxUtils,
  font: core.fontUtils,
  grid: core.gridUtils,
  interactivity: core.interactivityUtils,
  outline: core.outlineUtils,
  positioning: core.positioningUtils,
  svg: core.svgUtils,
  table: core.tableUtils,
  text: core.textUtils,
  transform: core.transformUtils,
  transition: core.transitionUtils,
} as const;

type Category = keyof typeof categoryGetters;

interface Props {
  category: Category;
  name: string;
}

export default function UtilityTable({ category, name }: Props) {
  const variants: Array<{ prefix: string; property: string; value: string }> =
    [];

  try {
    if (!category || !name) {
      throw new Error("Missing props: category and name are required");
    }

    const getter = categoryGetters[category];
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
      <table className="w-full bc-c">
        <thead>
          <tr>
            <th
              className="fs-md fw-600 px-4 py-2 ta-l bw-1 c-white"
              style={{ borderColor: "#31365e80" }}
            >
              Class
            </th>
            <th
              className="fs-md fw-600 px-4 py-2 ta-l bw-1 c-white"
              style={{ borderColor: "#31365e80" }}
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
                  className="px-4 py-2 bw-1 c-white/80"
                  style={{ borderColor: "#31365e80" }}
                >
                  <code className="fs-xs" style={{ color: "#dda2f6" }}>
                    {variant.prefix}
                  </code>
                </td>
                <td
                  className="px-4 py-2 bw-1 c-white/80"
                  style={{ borderColor: "#31365e80" }}
                >
                  <code className="fs-xs" style={{ color: "#bec6f2" }}>
                    {/** biome-ignore lint/suspicious/noSuspiciousSemicolonInJsx: semicolons are needed in this context */}
                    {variant.property}: {variant.value};
                  </code>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={2}
                className="px-4 py-2 bw-1 c-white/80 ta-c"
                style={{ borderColor: "#31365e80" }}
              >
                Something went wrong while fetching the data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
