"use client";

import { useEffect, useState } from "react";
import {
  getRegistryMeta,
  type RegistryMeta,
  type RegistryProp,
} from "@/registry";

/**
 * A component's prop API, from the same `src/registry/meta/<id>.json` that
 * feeds the generated registry & `yummaui add`. One schema, so the documented
 * API and the shipped one cannot drift apart.
 *
 * Rendered in the page flow rather than in a panel: a UI page is a page you
 * scroll, and the table is reference material you reach for once.
 */
export default function PropsTable({ registryId }: { registryId: string }) {
  const [meta, setMeta] = useState<RegistryMeta | null>(null);

  useEffect(() => {
    const importMeta = getRegistryMeta(registryId);
    if (!importMeta) return;
    importMeta().then((module) => setMeta(module.default));
  }, [registryId]);

  if (!meta) return null;

  return (
    <div className="ox-auto my-6">
      <table className="w-100% bc-border bg-transparent bc-c">
        <thead className="bg-surface">
          <tr>
            {["Prop", "Type", "Default", "Description"].map((heading) => (
              <th
                key={heading}
                className="px-4 py-2 bc-border c-white bw-1 ta-l fw-500"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {meta.props.map((prop) => (
            <tr key={prop.name}>
              <td className="px-4 py-2 bc-border bw-1 va-t ws-nw">
                <code className="c-code fs-md ff-m">{prop.name}</code>
              </td>
              <td className="px-4 py-2 bc-border bw-1 va-t">
                <code className="c-white/50 fs-sm ff-m">{typeOf(prop)}</code>
              </td>
              <td className="px-4 py-2 bc-border bw-1 va-t ws-nw">
                {prop.default === undefined ? (
                  <span className="c-white/30">-</span>
                ) : (
                  <code className="c-white/50 fs-sm ff-m">
                    {JSON.stringify(prop.default)}
                  </code>
                )}
              </td>
              <td className="px-4 py-2 bc-border c-white/80 bw-1 va-t">
                {describe(prop.description)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * An enum reads as its own values. `typeName` covers everything the schema
 * cannot offer a control for, where `type` would only say `none`.
 */
function typeOf(prop: RegistryProp): string {
  if (prop.typeName) return prop.typeName;
  if (prop.type === "enum" && prop.values) return prop.values.join(" | ");
  return prop.type;
}

/**
 * Schema descriptions are written as markdown, and the only markup any of them
 * needs is inline code. Rendering the backticks rather than a markdown pipeline
 * keeps the schema readable as prose in the JSON file.
 */
function describe(text: string | undefined) {
  if (!text) return null;
  return text
    .split("`")
    .map((value, index) => ({
      id: `${index}-${value}`,
      value,
      code: index % 2,
    }))
    .map((segment) =>
      segment.code ? (
        <code key={segment.id} className="c-code fs-sm ff-m">
          {segment.value}
        </code>
      ) : (
        segment.value
      ),
    );
}
