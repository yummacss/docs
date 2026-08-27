"use client";

import { Select } from "@base-ui/react/select";
import { Switch } from "@base-ui/react/switch";
import { NavArrowDown } from "iconoir-react";
import type { RegistryProp } from "@/registry";
import { exampleIcon } from "@/utils/demo";

interface Props {
  prop: RegistryProp;
  value: unknown;
  onChange: (value: unknown) => void;
}

/**
 * Widget for one controllable prop (enum, boolean, or icon slot).
 *
 * Every enum is a select, however few values it has. Segments laid each option
 * out across a rail three columns wide, so `shape` with four ate a line that
 * `size` with three had already crowded. A select is the same width whatever
 * the enum holds, which is what lets a column of fifteen share a right edge.
 */
export default function Control({ prop, value, onChange }: Props) {
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
          className="d-f fs-0 ai-c jc-sb g-1 px-2 py-1 max-w-32 bc-border bg-transparent c-accent bw-1 ff-m fs-xs c-p us-none fv:oo--1 fv:oc-accent"
        >
          <Select.Value className="o-h to-e ws-nw" />
          <NavArrowDown className="fs-0 w-3 h-3 c-accent-dim" aria-hidden />
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
                      state.highlighted ? "bg-border c-accent" : "c-accent-dim"
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
 * A switch in the docs palette.
 *
 * The geometry is Yumma UI's own switch at `sm` - a `px-1` track, a thumb that
 * travels `ml-0` to `ml-2` - because that is the part worth borrowing. Its
 * colours are not: `bg-indigo` on a white track is the library's look, and in
 * the rail it read as a saturated blue stripe with a thumb you could barely
 * find. These are the page's own accent and border.
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
      className={`d-f fs-0 ai-c px-1 w-7 h-4 bw-0 c-p tp-c tdu-150 ttf-io fv:oo-2 fv:oc-accent ${
        checked ? "bg-accent-dim" : "bg-border"
      }`}
    >
      <Switch.Thumb
        className={`d-b w-3 h-2 tp-a tdu-150 ttf-io ${
          checked ? "ml-2 bg-page" : "ml-0 bg-white/40"
        }`}
      />
    </Switch.Root>
  );
}
