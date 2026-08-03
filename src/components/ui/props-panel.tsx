"use client";

import { Select } from "@base-ui/react/select";
import { Toggle } from "@base-ui/react/toggle";
import { NavArrowDown } from "iconoir-react";
import {
  type PropValue,
  usePlayground,
} from "@/components/ui/playground-context";
import type { RegistryProp } from "@/registry";

/**
 * The component's API, in the column the table of contents used to hold.
 *
 * A UI page is one component, so a list of its own headings was never worth a
 * third of the width. The controls & the reference below them render from the
 * same `src/registry/meta/<id>.json` the stage builds its snippet from, so what
 * you can change, what is documented & what gets copied cannot drift apart.
 */
export default function PropsPanel() {
  const { meta, values, setValue } = usePlayground();

  if (!meta) return null;

  return (
    // Unlike the table of contents it replaces, this does not disappear on a
    // phone: it is the component's API, not a navigation aid. It stacks under
    // the page instead.
    <aside className="bc-border btw-1 @lg:btw-0 @lg:blw-1 @lg:gc-s-3">
      <div className="props-panel">
        <div className="px-8 pb-12">
          <Heading first>Controls</Heading>
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

          <Heading>Props</Heading>
          <PropsTable props={meta.props} />
        </div>
      </div>
    </aside>
  );
}

/**
 * The sidebar's own section label, so the panel reads as part of the site.
 * The first one carries no top margin: the column is sticky, and 3rem of empty
 * space above the first label is the gap you notice.
 */
function Heading({
  children,
  first,
}: {
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <h3
      className={`mb-4 c-silver-8 fs-xs fw-600 ls-2 tt-u ${first ? "mt-0" : "mt-12"}`}
    >
      {children}
    </h3>
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
        <EnumControl
          id={id}
          value={String(value ?? "")}
          options={prop.values ?? []}
          onChange={onChange}
        />
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
 * Base UI's Select rather than a bare `<select>`.
 *
 * A native menu cannot be styled to match the rest of the panel & renders in
 * the platform's own scheme, which on this page means a light popup hanging off
 * a dark surface. The primitive gives the same keyboard behaviour without that.
 */
function EnumControl({
  id,
  value,
  options,
  onChange,
}: {
  id: string;
  value: string;
  options: string[];
  onChange: (next: string) => void;
}) {
  return (
    <Select.Root
      value={value}
      onValueChange={(next) => onChange(String(next))}
      items={options.map((option) => ({ label: option, value: option }))}
    >
      <Select.Trigger
        id={id}
        className="d-f ai-c g-2 px-2 py-1 bg-transparent c-white bw-0 fs-sm ff-m us-none c-p h:c-accent fv:oo-2 fv:oc-accent"
      >
        <Select.Value />
        <Select.Icon className="d-f c-white/40">
          <NavArrowDown className="fs-0 w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          sideOffset={4}
          alignItemWithTrigger={false}
          className="zi-10 us-none"
        >
          {/* `data-chrome` opts out of the preview reset in globals.css, which
              catches Base UI portals by `[role="listbox"]` & would otherwise
              give this docs-side popup a light scheme and system-ui. */}
          <Select.Popup data-chrome className="py-1 bc-border bg-surface bw-1">
            {options.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className={(state) =>
                  `d-f ai-c px-3 py-1 fs-sm ff-m ws-nw us-none c-p ${
                    state.selected ? "c-accent" : "c-white/70"
                  } ${state.highlighted ? "bg-border" : "bg-transparent"}`
                }
              >
                <Select.ItemText>{option}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

/**
 * Sharp, because the site is. Every other surface here is a rectangle, so a
 * pill switch would be the only rounded thing on the page.
 */
function Switch({
  id,
  pressed,
  onPressedChange,
}: {
  id?: string;
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
}) {
  return (
    <Toggle
      id={id}
      pressed={pressed}
      onPressedChange={onPressedChange}
      className={`d-f p-r ai-c fs-0 w-9 h-5 px-1 bc-border bw-1 c-p tp-c tdu-150 ttf-io fv:oo-2 fv:oc-accent ${
        pressed ? "bg-accent" : "bg-surface"
      }`}
    >
      <span
        className={`d-b w-3 h-3 tp-a tdu-150 ttf-io ${pressed ? "bg-page" : "bg-white/40"}`}
        style={{ transform: pressed ? "translateX(0.875rem)" : "none" }}
      />
    </Toggle>
  );
}

/**
 * The reference, framed like every other table on the site so it cannot be
 * mistaken for more controls. The description sits under the name rather than
 * in a fourth column: this panel is a third of the page, and a prose column at
 * that width would be two words wide.
 */
function PropsTable({ props }: { props: RegistryProp[] }) {
  return (
    <div className="ox-auto bc-border bg-surface bw-1">
      <table className="w-100% bg-transparent bc-c">
        <thead className="bg-page">
          <tr>
            {["Prop", "Type", "Default"].map((heading) => (
              <th
                key={heading}
                className="px-3 py-2 bc-border c-white bw-1 fs-xs ta-l fw-500"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        {props.map((prop) => (
          // Two rows per prop in their own tbody, so the description spans the
          // full width & the frame closes after the pair rather than between.
          <tbody key={prop.name}>
            <tr>
              <td className="px-3 pt-2 bc-border blw-1 btw-1 va-t">
                <code className="c-code fs-xs ff-m">{prop.name}</code>
              </td>
              <td className="px-3 pt-2 bc-border btw-1 va-t">
                <code className="c-white/50 fs-xs ff-m">{typeOf(prop)}</code>
              </td>
              <td className="px-3 pt-2 bc-border brw-1 btw-1 va-t ws-nw">
                {prop.default === undefined ? (
                  <span className="c-white/30 fs-xs">-</span>
                ) : (
                  <code className="c-white/50 fs-xs ff-m">
                    {JSON.stringify(prop.default)}
                  </code>
                )}
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="px-3 pt-1 pb-2 bc-border c-white/50 blw-1 brw-1 fs-xs"
              >
                {describe(prop.description)}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
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
        <code key={segment.id} className="c-code fs-xs ff-m">
          {segment.value}
        </code>
      ) : (
        segment.value
      ),
    );
}
