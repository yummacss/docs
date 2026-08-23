"use client";

import { Switch } from "@base-ui/react/switch";
import { NavArrowDown } from "iconoir-react";
import PropsTable from "@/components/props-table";
import type { RegistryMeta, RegistryProp } from "@/registry";
import { titleCase } from "@/utils/title-case";

interface Props {
  id: string;
  meta: RegistryMeta | null;
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
}

/**
 * A prop the control panel knows how to drive. `none` covers a `ReactNode`,
 * a function, or an array/object - real API surface, just not a button or a
 * switch - so it stays fixed at the schema's example and only shows up in the
 * props table below.
 */
function isControllable(prop: RegistryProp): boolean {
  return (
    prop.type === "enum" ||
    prop.type === "boolean" ||
    prop.type === "string" ||
    prop.type === "number"
  );
}

export default function ControlPanel({ id, meta, values, onChange }: Props) {
  const controls = meta?.props.filter(isControllable) ?? [];

  return (
    <div className="w-96 oy-auto ob-c blw-1 bc-border">
      <div className="px-5 py-5 bbw-1 bc-border">
        <h2 className="c-white fs-xl ff-e">{titleCase(id)}</h2>
        {meta?.summary && (
          <p className="mt-2 mb-0 c-white/65 fs-sm lh-5">{meta.summary}</p>
        )}
      </div>

      {controls.length > 0 && (
        <div className="d-f fd-c g-4 px-5 py-5 bbw-1 bc-border">
          {controls.map((prop) => (
            <Control
              key={prop.name}
              prop={prop}
              value={values[prop.name]}
              onChange={(value) => onChange(prop.name, value)}
            />
          ))}
        </div>
      )}

      <div className="px-5 py-5">
        <h3 className="mb-3 c-silver-8 fs-xs ls-2 tt-u">Props</h3>
        <PropsTable registryId={id} />
      </div>
    </div>
  );
}

function Control({
  prop,
  value,
  onChange,
}: {
  prop: RegistryProp;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const label = (
    <label htmlFor={`ctl-${prop.name}`} className="c-white/80 fs-sm us-none">
      {prop.name}
    </label>
  );

  if (prop.type === "enum") {
    return (
      <div className="d-f ai-c jc-sb g-3">
        {label}
        <div className="p-r">
          <select
            id={`ctl-${prop.name}`}
            value={String(value ?? "")}
            onChange={(event) => onChange(event.target.value)}
            className="d-b w-32 pl-3 pr-8 py-1 bg-surface bc-border c-white bw-1 br-md fs-sm a-none fv:oc-white fv:ow-2"
          >
            {prop.values?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <NavArrowDown className="p-a t-2 r-2 w-3 h-3 c-white/40 pe-none" />
        </div>
      </div>
    );
  }

  if (prop.type === "boolean") {
    return (
      <div className="d-f ai-c jc-sb g-3">
        {label}
        <Switch.Root
          id={`ctl-${prop.name}`}
          checked={Boolean(value)}
          onCheckedChange={onChange}
          className={`p-r d-f ai-c fs-0 w-9 h-5 px-1 br-9999 bw-0 tp-c tdu-150 ttf-io c-p fv:oc-white fv:ow-2 ${
            value ? "bg-accent-dim" : "bg-border"
          }`}
        >
          <Switch.Thumb
            className={`w-4 h-4 br-9999 bg-white tp-t tdu-150 ttf-io ${
              value ? "ml-3" : "ml-0"
            }`}
          />
        </Switch.Root>
      </div>
    );
  }

  if (prop.type === "number") {
    return (
      <div className="d-f ai-c jc-sb g-3">
        {label}
        <input
          id={`ctl-${prop.name}`}
          type="number"
          value={typeof value === "number" ? value : ""}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-32 px-3 py-1 bg-surface bc-border c-white bw-1 br-md fs-sm ff-m fv:oc-white fv:ow-2"
        />
      </div>
    );
  }

  return (
    <div className="d-f fd-c g-2">
      {label}
      <input
        id={`ctl-${prop.name}`}
        type="text"
        value={typeof value === "string" ? value : ""}
        placeholder={prop.name === "className" ? "e.g. mt-4" : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="w-100% px-3 py-1 bg-surface bc-border c-white bw-1 br-md fs-sm ff-m fv:oc-white fv:ow-2"
      />
    </div>
  );
}
