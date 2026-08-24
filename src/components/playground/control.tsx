"use client";

import { Input } from "@base-ui/react";
import { Select } from "@base-ui/react/select";
import { Switch } from "@base-ui/react/switch";
import { NavArrowDown } from "iconoir-react";
import type { RegistryProp } from "@/registry";

/**
 * The widget for one prop.
 *
 * Which widget appears is the prop's type, which is why the rail can stand in
 * for a Type column: a segment is an enum, a switch is a boolean, a field is a
 * string. Short enums get segments because seeing the options costs nothing at
 * three of them; longer ones get a select, because six would not fit a rail.
 */
const SEGMENT_LIMIT = 3;

interface Props {
  prop: RegistryProp;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function Control({ prop, value, onChange }: Props) {
  if (prop.type === "boolean") {
    return (
      <Switch.Root
        checked={Boolean(value)}
        onCheckedChange={onChange}
        aria-label={prop.name}
        className={`d-f fs-0 ai-c w-8 h-4 p-0 br-9999 bw-0 c-p tp-c tdu-150 fv:oo-2 fv:oc-accent ${
          value ? "bg-accent-dim" : "bg-border"
        }`}
      >
        <Switch.Thumb
          className={`d-b w-3 h-3 br-9999 tp-a tdu-150 ttf-io ${
            value ? "ml-4 bg-page" : "ml-1 bg-white/40"
          }`}
        />
      </Switch.Root>
    );
  }

  if (prop.type === "enum" && prop.values) {
    if (prop.values.length <= SEGMENT_LIMIT) {
      return (
        <div className="d-f fs-0 g-1">
          {prop.values.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={value === option}
              className={`px-2 py-1 bg-transparent bw-1 ff-m fs-xs c-p tp-c tdu-150 fv:oo--1 fv:oc-accent ${
                value === option
                  ? "bc-accent-dim c-accent"
                  : "bc-border c-white/40 h:c-white/70"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }

    return (
      <Select.Root
        value={typeof value === "string" ? value : null}
        onValueChange={onChange}
      >
        <Select.Trigger
          aria-label={prop.name}
          className="d-f fs-0 ai-c jc-sb g-1 px-2 py-1 max-w-32 bc-border bg-transparent c-accent bw-1 ff-m fs-xs c-p us-none fv:oo--1 fv:oc-accent"
        >
          <Select.Value className="o-h to-e ws-nw" />
          <NavArrowDown className="fs-0 w-3 h-3 c-white/40" aria-hidden />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={4} className="zi-50">
            <Select.Popup className="p-1 bc-border bg-surface bw-1">
              {prop.values.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className={(state) =>
                    `d-b px-2 py-1 ff-m fs-xs c-p us-none ${
                      state.highlighted ? "bg-border c-white" : "c-white/70"
                    }`
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

  if (prop.type === "number") {
    return (
      <Input
        type="number"
        value={typeof value === "number" ? value : ""}
        onChange={(event) =>
          onChange(
            event.target.value === "" ? undefined : Number(event.target.value),
          )
        }
        aria-label={prop.name}
        className="w-16 px-2 py-1 bc-border bg-transparent c-accent bw-1 ff-m fs-xs fv:oo--1 fv:oc-accent"
      />
    );
  }

  return (
    <Input
      type="text"
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder={prop.default === undefined ? "" : String(prop.default)}
      aria-label={prop.name}
      className="w-24 px-2 py-1 bc-border bg-transparent c-accent bw-1 ff-m fs-xs fv:oo--1 fv:oc-accent"
    />
  );
}
