"use client";

import { Button } from "@base-ui/react";
import { Select } from "@base-ui/react/select";
import { Switch } from "@base-ui/react/switch";
import { useState } from "react";
import { NavArrowDown } from "@/icons";
import type { RegistryProp } from "@/registry";
import { exampleIcon } from "@/utils/demo";

interface Props {
  prop: RegistryProp;
  value: unknown;
  onChange: (value: unknown) => void;
  inert?: boolean;
}

export default function Control({ prop, value, onChange, inert }: Props) {
  if (prop.exampleIcon) {
    return (
      <Toggle
        checked={value !== undefined && value !== null}
        onCheckedChange={(next) =>
          onChange(next ? exampleIcon(prop.exampleIcon ?? "") : undefined)
        }
        label={prop.name}
        inert={inert}
      />
    );
  }

  if (prop.optional) {
    return (
      <Toggle
        checked={Boolean(value)}
        onCheckedChange={(next) => onChange(next ? prop.example : "")}
        label={prop.name}
        inert={inert}
      />
    );
  }

  if (prop.type === "boolean") {
    return (
      <Toggle
        checked={Boolean(value)}
        onCheckedChange={onChange}
        label={prop.name}
        inert={inert}
      />
    );
  }

  if (prop.type === "number") {
    return (
      <Stepper
        name={prop.name}
        value={
          typeof value === "number"
            ? value
            : (prop.default as number | undefined)
        }
        min={prop.min}
        max={prop.max}
        step={prop.step ?? 1}
        onChange={onChange}
        inert={inert}
      />
    );
  }

  if (prop.type === "enum" && prop.values) {
    return (
      <EnumSelect
        name={prop.name}
        values={prop.values}
        value={typeof value === "string" ? value : null}
        onChange={onChange}
        inert={inert}
      />
    );
  }

  return null;
}

function Stepper({
  name,
  value,
  min,
  max,
  step,
  onChange,
  inert,
}: {
  name: string;
  value?: number;
  min?: number;
  max?: number;
  step: number;
  onChange: (value: unknown) => void;
  inert?: boolean;
}) {
  // a float step accumulates error, so 0.2 three times is 0.6000000000000001
  const places = (String(step).split(".")[1] ?? "").length;
  const clamp = (next: number) =>
    Number(
      Math.min(
        max ?? Number.POSITIVE_INFINITY,
        Math.max(min ?? Number.NEGATIVE_INFINITY, next),
      ).toFixed(places),
    );

  // unset means the component picks, so the control says so rather than showing 0
  const unset = value === undefined;
  const atMin = !unset && min !== undefined && value <= min;
  const atMax = !unset && max !== undefined && value >= max;
  const from = (delta: number) => clamp(unset ? (min ?? 0) : value + delta);

  const button = (spent: boolean) =>
    `d:f fs:0 ai:c jc:c w:6 h:6 bw:0 bg:transparent ff:m fs:xs fv:oo:-1 fv:oc:accent ${
      inert || spent ? "c:ink/25 c:na" : "c:accent-dim h:c:accent c:p"
    }`;

  return (
    <div className={`d:f fs:0 ai:c jc:sb w:32 bw:1 ${"bc:border"}`}>
      <Button
        type="button"
        aria-label={`Decrease ${name}`}
        disabled={inert || atMin}
        onClick={() => onChange(from(-step))}
        className={button(atMin)}
      >
        &minus;
      </Button>
      <span
        aria-live="polite"
        className={`ff:m fs:xs ${inert ? "c:ink/40" : unset ? "c:ink/40" : "c:accent"}`}
      >
        {unset ? "none" : value}
      </span>
      <Button
        type="button"
        aria-label={`Increase ${name}`}
        disabled={inert || atMax}
        onClick={() => onChange(from(step))}
        className={button(atMax)}
      >
        +
      </Button>
    </div>
  );
}

export function EnumSelect({
  name,
  values,
  value,
  onChange,
  inert,
  blocked = [],
}: {
  name: string;
  values: string[];
  value: string | null;
  onChange: (value: unknown) => void;
  inert?: boolean;
  blocked?: string[];
}) {
  const [open, setOpen] = useState(false);

  const popup = (
    <Select.Popup className="tp:a tdu:200 ttf:eo opening:o:0 opening:s:90 closing:o:0 closing:s:90 @prm:tp:none p:1 oy:auto w:32 max-h:40 bc:border bg:surface bw:1">
      <Select.List>
        {values.map((option) => (
          <Select.Item
            key={option}
            value={option}
            disabled={blocked.includes(option)}
            className={(state) =>
              `d:b px:2 py:1 ff:m fs:xs us:none ${
                state.disabled
                  ? "c:ink/30 c:na tdl:lt"
                  : state.highlighted
                    ? "bg:border c:accent c:p"
                    : "c:accent-dim c:p"
              }`
            }
          >
            <Select.ItemText>{option}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.List>
    </Select.Popup>
  );

  return (
    <Select.Root
      value={value}
      onValueChange={onChange}
      disabled={inert}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger
        aria-label={name}
        className={`d:f fs:0 ai:c jc:sb g:1 px:2 py:1 w:32 bg:transparent bw:1 ff:m fs:xs us:none fv:oo:-1 fv:oc:accent ${
          inert ? "bc:border c:ink/40 c:na" : "bc:border c:ink c:p"
        }`}
      >
        <Select.Value className="o:h to:e ws:nw" />
        <NavArrowDown className="fs:0 w:3 h:3 c:ink/50" aria-hidden />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          data-chrome
          side="bottom"
          sideOffset={4}
          alignItemWithTrigger={false}
          collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }}
          className="zi:50"
        >
          {popup}
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

function Toggle({
  checked,
  onCheckedChange,
  label,
  inert,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  inert?: boolean;
}) {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={inert}
      aria-label={label}
      className={`d:f fs:0 ai:c px:1 w:7 h:4 bw:0 tp:c tdu:150 ttf:io fv:oo:2 fv:oc:accent ${
        inert ? "bg:ink/10 c:na" : `c:p ${checked ? "bg:accent" : "bg:ink/15"}`
      }`}
    >
      <Switch.Thumb
        className={`d:b w:3 h:2 tp:a tdu:150 ttf:io ${
          checked ? "ml:2 bg:page" : "ml:0 bg:ink/50"
        }`}
      />
    </Switch.Root>
  );
}

/** Steps through named values, as the stepper does for numbers. */
export function StepSelect({
  name,
  values,
  value,
  min = 0,
  max = values.length - 1,
  onChange,
}: {
  name: string;
  values: string[];
  value: string;
  min?: number;
  max?: number;
  onChange: (value: string) => void;
}) {
  const index = values.indexOf(value);
  const button = (spent: boolean) =>
    `d:f fs:0 ai:c jc:c w:6 h:6 bw:0 bg:transparent ff:m fs:xs fv:oo:-1 fv:oc:accent ${
      spent ? "c:ink/25 c:na" : "c:accent-dim h:c:accent c:p"
    }`;

  return (
    <div className="d:f fs:0 ai:c jc:sb w:32 bc:border bw:1">
      <Button
        type="button"
        aria-label={`Smaller ${name}`}
        disabled={index <= min}
        onClick={() => onChange(values[index - 1])}
        className={button(index <= min)}
      >
        &minus;
      </Button>
      <span aria-live="polite" className="ff:m fs:xs c:accent">
        {value}
      </span>
      <Button
        type="button"
        aria-label={`Larger ${name}`}
        disabled={index >= max}
        onClick={() => onChange(values[index + 1])}
        className={button(index >= max)}
      >
        +
      </Button>
    </div>
  );
}

function Bars({ colors }: { colors: string[] }) {
  return (
    <span aria-hidden className="d:f fs:0 g:px">
      {colors.map((color) => (
        <span
          key={color}
          className="d:b w:1 h:3"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}

/** A select whose options are colour families, each drawn as its shades. */
export function SwatchSelect({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; colors: string[] }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((option) => option.value === value);

  return (
    <Select.Root
      value={value}
      onValueChange={(next) => next && onChange(String(next))}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger
        aria-label={name}
        className="d:f fs:0 ai:c g:2 px:2 py:1 w:32 bg:transparent bw:1 bc:border c:ink c:p ff:m fs:xs us:none fv:oo:-1 fv:oc:accent"
      >
        {current && <Bars colors={current.colors} />}
        <Select.Value className="f:1 o:h to:e ws:nw ta:l" />
        <NavArrowDown className="fs:0 w:3 h:3 c:ink/50" aria-hidden />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          data-chrome
          side="bottom"
          sideOffset={4}
          alignItemWithTrigger={false}
          collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }}
          className="zi:50"
        >
          <Select.Popup className="tp:a tdu:200 ttf:eo opening:o:0 opening:s:90 closing:o:0 closing:s:90 @prm:tp:none p:1 oy:auto w:32 max-h:72 bc:border bg:surface bw:1">
            <Select.List>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={(state) =>
                    `d:f ai:c g:2 px:2 py:1 ff:m fs:xs us:none c:p ${
                      state.highlighted
                        ? "bg:border c:accent"
                        : state.selected
                          ? "c:ink"
                          : "c:accent-dim"
                    }`
                  }
                >
                  <Bars colors={option.colors} />
                  <Select.ItemText>{option.value}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
