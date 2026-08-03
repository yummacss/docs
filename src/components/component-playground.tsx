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

type Values = Record<string, string | boolean>;

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
      // component as it ships, not an arbitrary configuration.
      const initial: Values = {};
      for (const prop of loaded.props) {
        if (prop.default !== undefined && prop.type !== "string") {
          initial[prop.name] = prop.default;
        }
      }
      setValues(initial);
    });
  }, [registryId]);

  const text = label ?? meta?.examples?.[0]?.label ?? "Label";

  // Only props that differ from their default reach the snippet, which is what
  // keeps it copy-pasteable rather than a dump of every option.
  const snippet = useMemo(() => {
    if (!meta) return "";
    const name = componentName(registryId);
    const attrs = meta.props
      .filter((prop) => {
        const value = values[prop.name];
        return value !== undefined && value !== prop.default && value !== "";
      })
      .map((prop) => {
        const value = values[prop.name];
        return typeof value === "boolean"
          ? value
            ? prop.name
            : `${prop.name}={false}`
          : `${prop.name}="${value}"`;
      });

    const open = attrs.length
      ? `<${name}\n  ${attrs.join("\n  ")}\n>`
      : `<${name}>`;
    return `${open}${attrs.length ? "\n  " : ""}${text}${attrs.length ? "\n" : ""}</${name}>`;
  }, [meta, values, registryId, text]);

  if (!Component) return null;

  return (
    <div className="d-g gtc-1 mb-8 bc-border bw-1 @lg:gtc-3">
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
  );
}

function Control({
  prop,
  value,
  onChange,
}: {
  prop: RegistryProp;
  value: string | boolean | undefined;
  onChange: (next: string | boolean) => void;
}) {
  // `className` is free text with no useful control, and showing an empty input
  // for it would imply the others are similarly open-ended.
  if (prop.type === "string") return null;

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
      ) : (
        <select
          id={`ctl-${prop.name}`}
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
          className="px-2 py-1 bc-border bg-surface c-white bw-1 fs-sm c-p fv:oo-2 fv:oc-accent"
        >
          {prop.values?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

/** `alert-dialog` -> `AlertDialog`, matching the component's exported name. */
function componentName(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
