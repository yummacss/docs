"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { ArrowSeparateVertical, Check } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useId, useState } from "react";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";

/**
 * The option shape this component renders. Fixed rather than generic, the
 * same as Autocomplete, Combobox & Radio: you own the file, so data that does
 * not fit is an edit to the option body below rather than a type parameter on
 * every call site.
 */
export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  avatar?: string;
}

const TRIGGER =
  "d-f ai-c jc-sb bw-1 bc-silver-3 bg-white c-slate-10 us-none c-p fv:oo--1 fv:oc-indigo-5";

const SIZES: Record<Size, string> = {
  sm: "h-8 w-56 px-3",
  md: "h-10 w-64 px-3",
  lg: "h-12 w-72 px-4",
};

const POPUP_SIZES: Record<Size, string> = {
  sm: "w-56",
  md: "w-64",
  lg: "w-72",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

export interface SelectProps {
  options: SelectOption[];
  label?: string;
  /** Appends a red asterisk to the label & sets the trigger's native `required` attribute. */
  required?: boolean;
  /** A line under the control, for context on what the choice means. */
  description?: string;
  placeholder?: string;
  defaultValue?: string | null;
  value?: string | null;
  /** Called with the newly selected value, or `null` if the selection was cleared. */
  onValueChange?: (value: string | null) => void;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  /** Any icon, fixed on the trigger. Not per option - for the per-option kind, use `avatar`. */
  icon?: ReactNode;
  iconSide?: IconSide;
  disabled?: boolean;
  animate?: boolean;
  className?: string;
}

export default function SelectBase({
  options,
  label,
  required = false,
  description,
  placeholder = "Select...",
  defaultValue = null,
  value,
  onValueChange,
  size = "md",
  shape = "rounded",
  shadow = "none",
  icon,
  iconSide = "leading",
  disabled = false,
  animate = true,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const triggerClasses = [
    TRIGGER,
    SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    open ? "bg-silver-2/50" : "bg-transparent",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconEl = icon && (
    <span className="d-f ai-c c-slate-5" aria-hidden>
      {icon}
    </span>
  );

  const value_ = (
    <Select.Value>
      {(selected: string) => (
        <span className="min-w-0 o-h to-e ws-nw">
          {selected
            ? (options.find((o) => o.value === selected)?.label ?? selected)
            : placeholder}
        </span>
      )}
    </Select.Value>
  );

  const arrow = (
    <Select.Icon className="d-f c-slate-8">
      <ArrowSeparateVertical className="w-4 h-4" />
    </Select.Icon>
  );

  const popup = (
    <Select.Popup
      className={`o-h py-1 bg-white bc-silver-2 bw-1 ${POPUP_SIZES[size]} ${SHAPES[shape]}`}
    >
      <Select.List className="p-r o-auto">
        {options.map((option) => (
          <Select.Item
            key={option.value}
            value={option.value}
            className={(state) =>
              `d-f ai-c g-3 py-2 px-3 mx-1 br-md fs-sm fw-500 us-none c-p c-slate-10 ${
                state.highlighted ? "bg-silver-2/50" : "bg-transparent"
              }`
            }
          >
            <Select.ItemIndicator className="d-f ai-c">
              <Check className="w-4 h-4" />
            </Select.ItemIndicator>
            {option.avatar && (
              <Avatar.Root className="d-if o-h ai-c jc-c w-6 h-6 bc-white br-9999 bw-1 va-m us-none">
                <Avatar.Image
                  src={option.avatar}
                  alt=""
                  className="of-c w-100% h-100%"
                />
                <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
                  {option.label[0]}
                </Avatar.Fallback>
              </Avatar.Root>
            )}
            <div className="d-f fd-c">
              <Select.ItemText>{option.label}</Select.ItemText>
              {option.description && (
                <span className="c-slate-5 fs-xs">{option.description}</span>
              )}
            </div>
          </Select.Item>
        ))}
      </Select.List>
    </Select.Popup>
  );

  return (
    <Field.Root className={`d-f fd-c g-2 ${disabled ? "o-60 c-na" : ""}`}>
      {label && (
        <label htmlFor={id} className="c-slate-10 fs-sm fw-500 us-none">
          {label}
          {required && <span className="c-red-5"> *</span>}
        </label>
      )}

      <Select.Root
        items={options}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
        required={required}
      >
        <Select.Trigger id={id} className={triggerClasses}>
          {icon && iconSide === "leading" && (
            <span className="d-f ai-c g-2">
              {iconEl}
              {value_}
            </span>
          )}
          {(!icon || iconSide !== "leading") && value_}
          {icon && iconSide === "trailing" ? (
            <span className="d-f ai-c g-1">
              {iconEl}
              {arrow}
            </span>
          ) : (
            arrow
          )}
        </Select.Trigger>

        <AnimatePresence>
          {open && (
            <Select.Portal>
              <Select.Positioner
                sideOffset={8}
                alignItemWithTrigger={false}
                className="zi-10 p-0 ow-0 us-none"
              >
                {animate ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    {popup}
                  </motion.div>
                ) : (
                  popup
                )}
              </Select.Positioner>
            </Select.Portal>
          )}
        </AnimatePresence>
      </Select.Root>

      {description && <p className="m-0 c-slate-6 fs-xs">{description}</p>}
    </Field.Root>
  );
}
