"use client";

import { Switch } from "@base-ui/react/switch";
import type { RegistryProp } from "@/registry";

/**
 * A prop the control strip knows how to drive. `none` covers a `ReactNode`,
 * a function, or an array/object - real API surface, just not a dropdown or a
 * switch - so it stays fixed at the schema's example instead.
 */
export function isPlayableProp(prop: RegistryProp): boolean {
  return (
    prop.type === "enum" ||
    prop.type === "boolean" ||
    prop.type === "string" ||
    prop.type === "number"
  );
}

interface Props {
  prop: RegistryProp;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function PropControl({ prop, value, onChange }: Props) {
  const id = `ctl-${prop.name}`;
  const label = (
    <span className="c-white/60 fs-xs ff-m us-none">{prop.name}</span>
  );

  if (prop.type === "boolean") {
    return (
      <label htmlFor={id} className="d-f ai-c g-2 c-p">
        {label}
        <Switch.Root
          id={id}
          checked={Boolean(value)}
          onCheckedChange={onChange}
          className={`p-r d-f ai-c fs-0 w-8 h-4 px-1 br-9999 bw-0 tp-c tdu-150 ttf-io c-p fv:oc-white fv:ow-2 ${
            value ? "bg-accent-dim" : "bg-border"
          }`}
        >
          <Switch.Thumb
            className={`w-3 h-3 br-9999 bg-white tp-t tdu-150 ttf-io ${
              value ? "ml-3" : "ml-0"
            }`}
          />
        </Switch.Root>
      </label>
    );
  }

  if (prop.type === "enum") {
    return (
      <label htmlFor={id} className="d-f ai-c g-2">
        {label}
        <select
          id={id}
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
          className="pl-2 pr-6 py-1 bg-page bc-border c-white bw-1 br-sm fs-xs a-none"
        >
          {prop.values?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (prop.type === "number") {
    return (
      <label htmlFor={id} className="d-f ai-c g-2">
        {label}
        <input
          id={id}
          type="number"
          value={typeof value === "number" ? value : ""}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-16 px-2 py-1 bg-page bc-border c-white bw-1 br-sm fs-xs ff-m"
        />
      </label>
    );
  }

  return (
    <label htmlFor={id} className="d-f ai-c g-2">
      {label}
      <input
        id={id}
        type="text"
        value={typeof value === "string" ? value : ""}
        onChange={(event) => onChange(event.target.value)}
        className="w-32 px-2 py-1 bg-page bc-border c-white bw-1 br-sm fs-xs ff-m"
      />
    </label>
  );
}
