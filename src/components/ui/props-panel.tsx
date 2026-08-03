"use client";

import { NavArrowDown } from "iconoir-react";
import { Switch } from "@/components/component-playground";
import {
  type PropValue,
  usePlayground,
} from "@/components/ui/playground-context";
import type { RegistryProp } from "@/registry";

/**
 * The component's API, in the column the table of contents used to hold.
 *
 * A UI page is one component, so a list of its own headings was never worth a
 * third of the width. The controls & the table below them render from the same
 * `src/registry/meta/<id>.json` the stage builds its snippet from, so what you
 * can change, what is documented & what gets copied cannot drift apart.
 */
export default function PropsPanel() {
  const { meta, values, setValue } = usePlayground();

  if (!meta) return null;

  return (
    // Unlike the table of contents it replaces, this does not disappear on a
    // phone: it is the component's API, not a navigation aid. It stacks under
    // the page instead, and only sticks once there is a column to stick in.
    <aside className="bc-border btw-1 @lg:btw-0 @lg:blw-1">
      {/* Sticky & scrollable only once there is a column to stick in. A capped
          height with its own scrollbar is right beside the page and wrong
          stacked under it, and an inline style cannot be made conditional. */}
      <div className="props-panel">
        <div className="px-8 py-12">
          {meta.summary && (
            <p className="mt-0 mb-8 c-white/70 fs-sm">{meta.summary}</p>
          )}

          <div className="d-f fd-c">
            {meta.props.map((prop) => (
              <Control
                key={prop.name}
                prop={prop}
                value={values[prop.name]}
                onChange={(next) => setValue(prop.name, next)}
              />
            ))}
          </div>

          <PropsTable props={meta.props} />
        </div>
      </div>
    </aside>
  );
}

function Control({
  prop,
  value,
  onChange,
}: {
  prop: RegistryProp;
  value: PropValue | undefined;
  onChange: (next: PropValue) => void;
}) {
  // `className` is free text with no useful control, and showing an empty input
  // for it would imply the enum controls are similarly open-ended.
  if (prop.name === "className") return null;

  const id = `ctl-${prop.name}`;

  return (
    <div className="d-f ai-c jc-sb g-4 py-3 bc-border bbw-1">
      <label className="c-white/70 fs-sm" htmlFor={id}>
        {prop.name}
      </label>

      {prop.type === "boolean" ? (
        <Switch id={id} pressed={Boolean(value)} onPressedChange={onChange} />
      ) : prop.type === "enum" ? (
        <div className="d-f p-r ai-c">
          <select
            id={id}
            value={String(value ?? "")}
            onChange={(event) => onChange(event.target.value)}
            // No appearance utility exists in Yumma CSS, and the native arrow
            // cannot be restyled without removing it first.
            style={{ appearance: "none" }}
            className="py-1 pl-2 bg-transparent c-white bw-0 fs-sm ta-r c-p fv:oo-2 fv:oc-accent"
          >
            {prop.values?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <NavArrowDown className="fs-0 w-4 h-4 c-white/40 pe-none" />
        </div>
      ) : (
        <input
          id={id}
          type={prop.type === "number" ? "number" : "text"}
          step={prop.type === "number" ? 0.05 : undefined}
          value={String(value ?? "")}
          onChange={(event) =>
            onChange(
              prop.type === "number"
                ? Number(event.target.value)
                : event.target.value,
            )
          }
          className="w-32 px-2 py-1 bc-border bg-transparent c-white bw-1 fs-sm ta-r fv:oo-2 fv:oc-accent"
        />
      )}
    </div>
  );
}

/**
 * The same schema as a reference. The description sits under the name rather
 * than in a fourth column: this panel is a third of the page, and a prose
 * column at that width would be two words wide.
 */
function PropsTable({ props }: { props: RegistryProp[] }) {
  return (
    <table className="w-100% mt-12 bc-c">
      <thead>
        <tr>
          {["Prop", "Type", "Default"].map((heading) => (
            <th
              key={heading}
              className="pb-2 bc-border bbw-1 c-silver-8 fs-xs fw-600 ls-2 ta-l tt-u"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      {props.map((prop) => (
        // Two rows per prop, in their own tbody, so the description spans the
        // full width & the border falls after the pair rather than between them.
        <tbody key={prop.name} className="bc-border bbw-1">
          <tr>
            <td className="pt-3 pr-2 va-t">
              <code className="c-code fs-sm ff-m">{prop.name}</code>
            </td>
            <td className="pt-3 pr-2 va-t">
              <code className="c-white/50 fs-xs ff-m">{typeOf(prop)}</code>
            </td>
            <td className="pt-3 va-t ws-nw">
              {prop.default === undefined ? (
                <span className="c-white/30 fs-xs">-</span>
              ) : (
                <code className="c-white/50 fs-xs ff-m">
                  {JSON.stringify(prop.default)}
                </code>
              )}
            </td>
          </tr>
          {prop.description && (
            <tr>
              <td colSpan={3} className="pt-1 pb-3 c-white/50 fs-xs">
                {describe(prop.description)}
              </td>
            </tr>
          )}
        </tbody>
      ))}
    </table>
  );
}

/** An enum reads as its own values; everything else as its TypeScript type. */
function typeOf(prop: RegistryProp): string {
  if (prop.type === "enum" && prop.values) return prop.values.join(" | ");
  return prop.type;
}

/**
 * Schema descriptions are written as markdown, and the only markup any of them
 * needs is inline code. Rendering the backticks rather than a markdown pipeline
 * keeps the schema readable as prose in the JSON file.
 */
function describe(text: string) {
  return text
    .split("`")
    .map((value, index) => ({
      id: `${index}-${value}`,
      value,
      code: index % 2,
    }))
    .map((segment) =>
      segment.code ? (
        <code key={segment.id} className="c-code fs-xs ff-m">
          {segment.value}
        </code>
      ) : (
        segment.value
      ),
    );
}
