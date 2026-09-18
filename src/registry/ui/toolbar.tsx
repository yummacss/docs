"use client";

import { Button } from "@base-ui/react";
import { NumberField } from "@base-ui/react/number-field";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import { Minus, Plus } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const ROOT_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "",
  squircle: "br:3xl cs:s",
};

const CONTROL_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:md",
  outset: "bs-o:sm",
};

export interface ToolbarButtonItem {
  type?: "button";
  label?: string;
  icon?: ReactNode;
  iconOnly?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ToolbarSeparatorItem {
  type: "separator";
}

export interface ToolbarToggleOption {
  value: string;
  label: string;
  icon: ReactNode;
}

export interface ToolbarTogglesItem {
  type: "toggles";
  options: ToolbarToggleOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  label?: string;
}

export interface ToolbarInputItem {
  type: "input";
  placeholder?: string;
  label: string;
}

export interface ToolbarLinkItem {
  type: "link";
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface ToolbarNumberItem {
  type: "number";
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
}

export type ToolbarItem =
  | ToolbarButtonItem
  | ToolbarSeparatorItem
  | ToolbarTogglesItem
  | ToolbarInputItem
  | ToolbarLinkItem
  | ToolbarNumberItem;

export interface ToolbarProps {
  /**
   * A discriminated union. `{ label }` is a button (plus optional `icon`,
   * `iconOnly`, `disabled`, `onClick`). `{ type: "separator" }` divides. `{
   * type: "toggles", options }` is an icon toggle group. `{ type: "input",
   * label }` and `{ type: "link", label, href }` are the remaining kinds.
   */
  items: ToolbarItem[];
  /**
   * Corner radius on the bar and every control inside it. The bar takes one
   * step more than its controls.
   */
  shape?: Shape;
  /** Depth on the bar. */
  shadow?: Shadow;
  /**
   * The press-scale on buttons and toggles. Turn it off for static controls, or
   * when the user has asked for reduced motion.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
  /**
   * The focus outline. `true` draws it, `false` removes it along with the
   * danger, error and success tints that ride with it, and a string of Yumma
   * CSS utilities restyles it on every focusable part of the component, which
   * is more than `className` reaches. Removing it outright and putting nothing
   * back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
}

/**
 * A toolbar with roving focus, built from an item list: buttons, icon toggles,
 * separators, an input and links.
 */
export default function ToolbarBase({
  items,
  shape = "square",
  shadow = "none",
  animated = true,
  className,
  focus = true,
}: ToolbarProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const shadowClass =
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "";

  const rootClasses = merge(
    "d:f ai:c g:1 p:2 bg:white bc:silver-2 bw:1",
    ROOT_SHAPES[shape],
    shadowClass,
    className,
  );

  const control = CONTROL_SHAPES[shape];

  return (
    <Toolbar.Root className={rootClasses}>
      {items.map((item, index) => {
        const key = `item-${index}`;

        if ("type" in item && item.type === "separator") {
          return (
            <Toolbar.Separator
              key={key}
              className="w:px h:5 mx:1 bg:silver-2"
            />
          );
        }

        if ("type" in item && item.type === "toggles") {
          return (
            <ToolbarToggles
              key={key}
              item={item}
              control={control}
              animated={animated}
              outline={outline}
            />
          );
        }

        if ("type" in item && item.type === "input") {
          return (
            <Toolbar.Input
              key={key}
              className={merge(
                outline,
                "h:9 w:40 pl:3 bg:transparent bw:0 fs:sm",
                control,
              )}
              placeholder={item.placeholder}
              aria-label={item.label}
            />
          );
        }

        if ("type" in item && item.type === "number") {
          const stepClasses = [
            "d:f ai:c jc:c w:9 h:9 bg:transparent c:slate-7 bw:0 us:none c:p h:bg:silver-1 h:c:slate-10",
            control,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <NumberField.Root
              key={key}
              defaultValue={item.defaultValue}
              value={item.value}
              onValueChange={(value) =>
                item.onValueChange?.(value ?? item.min ?? 0)
              }
              min={item.min}
              max={item.max}
              aria-label={item.label}
            >
              <NumberField.Group className="d:f ai:c">
                <NumberField.Decrement
                  render={
                    animated
                      ? (props) => (
                          <motion.button
                            type="button"
                            {...(props as HTMLMotionProps<"button">)}
                            whileTap={{ scale: 0.92 }}
                            className={stepClasses}
                          />
                        )
                      : undefined
                  }
                  className={animated ? undefined : stepClasses}
                >
                  <Minus className="w:5 h:5" />
                </NumberField.Decrement>
                <Toolbar.Input
                  render={<NumberField.Input />}
                  className={merge(
                    outline,
                    "w:16 bg:transparent c:slate-10 bw:0 ta:c fs:sm fw:500",
                  )}
                />
                <NumberField.Increment
                  render={
                    animated
                      ? (props) => (
                          <motion.button
                            type="button"
                            {...(props as HTMLMotionProps<"button">)}
                            whileTap={{ scale: 0.92 }}
                            className={stepClasses}
                          />
                        )
                      : undefined
                  }
                  className={animated ? undefined : stepClasses}
                >
                  <Plus className="w:5 h:5" />
                </NumberField.Increment>
              </NumberField.Group>
            </NumberField.Root>
          );
        }

        if ("type" in item && item.type === "link") {
          return (
            <Toolbar.Link
              key={key}
              href={item.href}
              className={merge(
                outline,
                "d:f ai:c g:1 h:9 px:3 c:slate-7 fs:sm fw:500 td:none h:c:slate-10",
                control,
              )}
            >
              {item.icon}
              {item.label}
            </Toolbar.Link>
          );
        }

        const button = item as ToolbarButtonItem;
        const buttonClasses = merge(
          outline,
          "d:f ai:c jc:c ws:nw bg:transparent c:slate-7 bw:0 us:none",
          button.iconOnly ? "w:9 h:9" : "g:1 h:9 px:3 fs:sm fw:500",
          control,
          button.disabled
            ? "bg:silver-1 c:slate-4 c:na"
            : "c:p h:bg:silver-1 h:c:slate-10",
        );

        return (
          <Toolbar.Button
            key={key}
            disabled={button.disabled}
            onClick={button.onClick}
            aria-label={button.iconOnly ? button.label : undefined}
            render={
              animated && !button.disabled
                ? (props) => (
                    <motion.button
                      type="button"
                      {...(props as HTMLMotionProps<"button">)}
                      whileTap={{ scale: 0.92 }}
                      className={buttonClasses}
                    />
                  )
                : undefined
            }
            className={animated && !button.disabled ? undefined : buttonClasses}
          >
            {button.icon}
            {!button.iconOnly && button.label}
          </Toolbar.Button>
        );
      })}
    </Toolbar.Root>
  );
}

function Pop({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.span
      key={on ? "on" : "off"}
      className="d:f"
      initial={{ scale: on ? 0.8 : 1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

function ToolbarToggles({
  item,
  control,
  animated,
  outline,
}: {
  item: ToolbarTogglesItem;
  control: string;
  animated: boolean;
  outline: string;
  focus?: boolean | string;
}) {
  const [internalValue, setInternalValue] = useState<string[]>(
    item.defaultValue ?? item.value ?? [],
  );
  const value = item.value ?? internalValue;

  const handleChange = (next: string[]) => {
    setInternalValue(next);
    item.onValueChange?.(next);
  };

  const toggleClasses = (pressed: boolean) =>
    merge(
      outline,
      "d:f w:9 h:9 ai:c jc:c bw:0 us:none c:p",
      control,
      pressed
        ? "bg:silver-1 bc:silver-3 c:slate-12 bw:1"
        : "bg:transparent c:slate-7 h:bg:silver-1 h:c:slate-10",
    );

  return (
    <ToggleGroup
      className="d:f g:1"
      value={value}
      onValueChange={handleChange}
      aria-label={item.label}
    >
      {item.options.map((option) => (
        <Toggle
          key={option.value}
          value={option.value}
          aria-label={option.label}
          render={
            animated
              ? (props, state) => {
                  const { children, ...rest } =
                    props as HTMLMotionProps<"button">;
                  return (
                    <motion.button
                      type="button"
                      {...rest}
                      whileTap={{ scale: 0.92 }}
                      className={toggleClasses(state.pressed)}
                    >
                      <Pop on={state.pressed}>{children as ReactNode}</Pop>
                    </motion.button>
                  );
                }
              : (props, state) => (
                  <Button {...props} className={toggleClasses(state.pressed)} />
                )
          }
        >
          {option.icon}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
