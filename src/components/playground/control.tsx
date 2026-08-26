"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Select } from "@base-ui/react/select";
import { Check, NavArrowDown } from "iconoir-react";
import type { RegistryProp } from "@/registry";
import { exampleIcon } from "@/utils/demo";

/**
 * The widget for one controllable prop.
 *
 * Which widget appears is the prop's type, which is why the rail can stand in
 * for a Type column: a segment is an enum, a checkbox is a boolean. Short enums
 * get segments because seeing the options costs nothing at three of them;
 * longer ones get a select, because six would not fit a rail. Strings and
 * numbers never reach this component - see `isControllable`.
 */
const SEGMENT_LIMIT = 3;

interface Props {
  prop: RegistryProp;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function Control({ prop, value, onChange }: Props) {
  // An icon slot is a `ReactNode` the schema cannot spell, so the control is
  // not "which glyph" but "is there one": checked puts the schema's own
  // example in the slot, and the snippet spells it as the JSX it means.
  if (prop.exampleIcon) {
    return (
      <Box
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
      <Box
        checked={Boolean(value)}
        onCheckedChange={onChange}
        label={prop.name}
      />
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
                  : "bc-border c-accent-dim h:c-accent-dim"
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
 * A checkbox, which is what a boolean prop is: it is either written on the
 * element or it is not. A switch would suggest a setting that takes effect
 * somewhere, rather than an attribute you are choosing to type.
 */
function Box({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <Checkbox.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={label}
      className={`d-f fs-0 ai-c jc-c w-4 h-4 p-0 bw-1 c-p tp-c tdu-150 fv:oo-2 fv:oc-accent ${
        checked ? "bc-accent-dim bg-accent-dim" : "bc-border bg-transparent"
      }`}
    >
      <Checkbox.Indicator>
        <Check className="w-3 h-3 c-page" aria-hidden />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}
