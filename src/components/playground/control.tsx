"use client";

import { Select } from "@base-ui/react/select";
import { Switch } from "@base-ui/react/switch";
import { NavArrowDown } from "iconoir-react";
import type { RegistryProp } from "@/registry";
import { exampleIcon } from "@/utils/demo";

/**
 * The widget for one prop.
 *
 * Two shapes, and only two: a switch for anything that is on or off, a select
 * for anything that picks from a list. Segmented buttons were the first
 * attempt & they laid every option out across the rail, so `shape` with four
 * values ate a line that `size` with three had already crowded. A select is
 * the same height whatever the enum holds, which is what keeps a column of
 * fifteen props readable in three of the page's twelve columns.
 */
interface Props {
  prop: RegistryProp;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function Control({ prop, value, onChange }: Props) {
  // An icon slot is a `ReactNode` the schema cannot spell, so the control is
  // not "which glyph" but "is there one": on puts the schema's own example in
  // the slot, and the snippet spells it as the JSX it means.
  if (prop.exampleIcon) {
    return (
      <Toggle
        checked={value !== undefined && value !== null}
        onCheckedChange={(next) =>
          onChange(next ? exampleIcon(prop.exampleIcon ?? "") : undefined)
        }
        label={prop.name}
      />
    );
  }

  if (prop.type === "boolean") {
    return (
      <Toggle
        checked={Boolean(value)}
        onCheckedChange={onChange}
        label={prop.name}
      />
    );
  }

  if (prop.type === "enum" && prop.values) {
    return (
      <Select.Root
        value={typeof value === "string" ? value : null}
        onValueChange={onChange}
      >
        <Select.Trigger
          aria-label={prop.name}
          className="d-f fs-0 ai-c jc-sb g-1 px-2 py-1 min-w-24 max-w-32 bc-border bg-transparent c-accent bw-1 ff-m fs-xs c-p us-none fv:oo--1 fv:oc-accent"
        >
          <Select.Value className="o-h to-e ws-nw" />
          <NavArrowDown className="fs-0 w-3 h-3 c-white/40" aria-hidden />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={4} align="end" className="zi-50">
            <Select.Popup className="p-1 bc-border bg-surface bw-1">
              {prop.values.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className={(state) =>
                    `d-b px-2 py-1 ff-m fs-xs c-p us-none ws-nw ${
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

  return null;
}

/**
 * A switch, for a prop that is either written on the element or not.
 */
function Toggle({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={label}
      className={`d-f fs-0 ai-c w-8 h-4 p-0 br-9999 bw-0 c-p tp-c tdu-150 fv:oo-2 fv:oc-accent ${
        checked ? "bg-accent-dim" : "bg-border"
      }`}
    >
      <Switch.Thumb
        className={`d-b w-3 h-3 br-9999 tp-a tdu-150 ttf-io ${
          checked ? "ml-4 bg-page" : "ml-1 bg-white/40"
        }`}
      />
    </Switch.Root>
  );
}
