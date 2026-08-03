"use client";

import { Toggle } from "@base-ui/react/toggle";
import {
  type ComponentType,
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getRegistryImport,
  getRegistryMeta,
  type RegistryMeta,
  type RegistryProp,
} from "@/registry";

interface Props {
  registryId: string;
  /** Children handed to the component, when it takes them. */
  label?: string;
}

type Value = string | boolean | number;
type Values = Record<string, Value>;

/**
 * One live component with controls, in place of a row of static previews.
 *
 * The controls, the snippet & the props table are all rendered from the same
 * schema in `src/registry/meta/<id>.json`, so the documented API and the
 * demonstrated API cannot drift apart. Button alone replaces 27 preview files.
 */
export default function ComponentPlayground({ registryId, label }: Props) {
  const [Component, setComponent] = useState<ComponentType<
    Record<string, unknown>
  > | null>(null);
  const [meta, setMeta] = useState<RegistryMeta | null>(null);
  const [values, setValues] = useState<Values>({});

  useEffect(() => {
    const importComponent = getRegistryImport(registryId);
    if (importComponent) setComponent(() => lazy(importComponent));

    const importMeta = getRegistryMeta(registryId);
    if (!importMeta) return;

    importMeta().then((module) => {
      const loaded = module.default;
      setMeta(loaded);
      // Start from the component's own defaults so the first render is the
      // component as it ships, not an arbitrary configuration. `example` covers
      // the props it cannot default, like the image an Avatar has to be given.
      const initial: Values = {};
      for (const prop of loaded.props) {
        const start = prop.example ?? prop.default;
        if (start !== undefined) initial[prop.name] = start;
      }
      setValues(initial);
    });
  }, [registryId]);

  // A component that declares no children slot is written self-closing, so the
  // snippet matches how it is actually used rather than inventing a text child.
  const text = label ?? meta?.children;

  // Only props that differ from their default reach the snippet, which is what
  // keeps it copy-pasteable rather than a dump of every option.
  const snippet = useMemo(() => {
    if (!meta) return "";
    const name = componentName(registryId);
    const attrs = meta.props
      .filter((prop) => {
        const value = values[prop.name];
        if (value === undefined || value === "") return false;
        return value !== prop.default;
      })
      .map((prop) => attribute(prop, values[prop.name] as Value));

    const open = attrs.length
      ? `<${name}\n  ${attrs.join("\n  ")}`
      : `<${name}`;
    if (text === undefined) return attrs.length ? `${open}\n/>` : `${open} />`;
    return attrs.length
      ? `${open}\n>\n  ${text}\n</${name}>`
      : `${open}>${text}</${name}>`;
  }, [meta, values, registryId, text]);

  if (!Component) return null;

  return (
    <div className="mb-8">
      <div className="d-g gtc-1 bc-border bw-1 @lg:gtc-3">
        <div className="@lg:gc-s-2">
          <div
            data-preview
            className="d-f p-r ai-c jc-c p-12 bg-white"
            style={{ minHeight: "12rem" }}
          >
            <Suspense fallback={null}>
              <Component {...values}>{text}</Component>
            </Suspense>
          </div>

          {meta && (
            <pre className="ox-auto p-4 bg-surface bc-border btw-1 fs-sm">
              <code>{snippet}</code>
            </pre>
          )}
        </div>

        {meta && (
          <aside className="p-6 bc-border btw-1 @lg:blw-1 @lg:btw-0">
            <h4 className="mb-4 c-silver-8 fs-xs fw-600 ls-2 tt-u">Props</h4>
            <div className="d-f fd-c g-4">
              {meta.props.map((prop) => (
                <Control
                  key={prop.name}
                  prop={prop}
                  value={values[prop.name]}
                  onChange={(next) =>
                    setValues((current) => ({ ...current, [prop.name]: next }))
                  }
                />
              ))}
            </div>
          </aside>
        )}
      </div>

      {meta && <PropsTable props={meta.props} />}
    </div>
  );
}

/**
 * The same schema as a reference table. `className` has no control but does
 * belong here, and the type column is where an enum's full set of values is
 * readable rather than hidden behind a `<select>`.
 */
function PropsTable({ props }: { props: RegistryProp[] }) {
  return (
    <div className="ox-auto mt-6">
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
          {props.map((prop) => (
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

function Control({
  prop,
  value,
  onChange,
}: {
  prop: RegistryProp;
  value: Value | undefined;
  onChange: (next: Value) => void;
}) {
  // `className` is free text with no useful control, and showing an empty input
  // for it would imply the enum controls are similarly open-ended.
  if (prop.name === "className") return null;

  const field = "w-40 px-2 py-1 bc-border bg-surface c-white bw-1 fs-sm";

  return (
    <div className="d-f ai-c jc-sb g-4">
      <label className="c-white/70 fs-sm" htmlFor={`ctl-${prop.name}`}>
        {prop.name}
      </label>

      {prop.type === "boolean" ? (
        <Toggle
          id={`ctl-${prop.name}`}
          pressed={Boolean(value)}
          onPressedChange={onChange}
          className="d-f p-r ai-c w-10 h-6 px-1 bc-border bg-surface bw-1 br-9999 c-p fv:oo-2 fv:oc-accent"
        >
          <span
            className="d-b w-4 h-4 bg-white br-9999 tp-a tdu-150"
            style={{ transform: value ? "translateX(0.9rem)" : "none" }}
          />
        </Toggle>
      ) : prop.type === "enum" ? (
        <select
          id={`ctl-${prop.name}`}
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
          className={`${field} c-p fv:oo-2 fv:oc-accent`}
        >
          {prop.values?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={`ctl-${prop.name}`}
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
          className={`${field} fv:oo-2 fv:oc-accent`}
        />
      )}
    </div>
  );
}

/** `variant="danger"`, `loading`, `delay={0.15}` - JSX, not JSON. */
function attribute(prop: RegistryProp, value: Value): string {
  if (typeof value === "boolean") {
    return value ? prop.name : `${prop.name}={false}`;
  }
  if (typeof value === "number") return `${prop.name}={${value}}`;
  return `${prop.name}="${value}"`;
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

/** An enum reads as its own values; everything else as its TypeScript type. */
function typeOf(prop: RegistryProp): string {
  if (prop.type === "enum" && prop.values) return prop.values.join(" | ");
  return prop.type;
}

/** `alert-dialog` -> `AlertDialog`, matching the component's exported name. */
function componentName(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
