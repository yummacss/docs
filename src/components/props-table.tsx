"use client";

import { NavArrowDown } from "iconoir-react";
import { Fragment, useEffect, useState } from "react";
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
 * Scan first, read second: name/type/default stay visible and dense: the
 * description - the only prose, and the only thing with variable height -
 * is collapsed until a row is opened. A migrated component can carry 8-11
 * props now, versus 0 before the demo files pointed at them, and showing
 * every description at once was the thing Renildo called "drowning."
 *
 * Deliberately not Base UI's pattern of collapsing the whole row behind a
 * chevron: name/type/default are the fields you scan a table like this for,
 * so those stay put. Only the description - the field you read, not scan -
 * is what opens.
 */
export default function PropsTable({ registryId }: { registryId: string }) {
  const [meta, setMeta] = useState<RegistryMeta | null>(null);
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    const importMeta = getRegistryMeta(registryId);
    if (!importMeta) return;
    importMeta().then((module) => setMeta(module.default));
  }, [registryId]);

  if (!meta) return null;

  const toggle = (name: string) => {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="ox-auto my-6">
      <table className="w-100% bc-border bg-transparent bc-c">
        <thead className="bg-surface">
          <tr>
            {["Prop", "Type", "Default"].map((heading) => (
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
          {meta.props.map((prop) => {
            const isOpen = open.has(prop.name);
            const hasDescription = Boolean(prop.description);
            return (
              <Fragment key={prop.name}>
                <tr>
                  <td className="p-0 bc-border bw-1 va-t ws-nw">
                    {hasDescription ? (
                      <button
                        type="button"
                        onClick={() => toggle(prop.name)}
                        aria-expanded={isOpen}
                        className="d-f ai-c g-2 px-4 py-2 w-100% bg-transparent bw-0 c-p ta-l fv:oo--1 fv:oc-indigo-5"
                      >
                        <NavArrowDown
                          className={`fs-0 w-3 h-3 c-white/40 tp-c tdu-150 ${isOpen ? "tr-180" : ""}`}
                          aria-hidden
                        />
                        <code className="c-code fs-md ff-m">{prop.name}</code>
                      </button>
                    ) : (
                      <div className="px-4 py-2">
                        <code className="c-code fs-md ff-m">{prop.name}</code>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 bc-border bw-1 va-t">
                    <code className="c-white/50 fs-sm ff-m">
                      {typeOf(prop)}
                    </code>
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
                </tr>
                {isOpen && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 pt-2 pb-3 bc-border c-white/80 bw-1"
                    >
                      <div className="pl-5">{describe(prop.description)}</div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
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
