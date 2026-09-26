"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { useId } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shadow = "none" | "inset" | "outset";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const BASE = "d:f ai:c jc:c p:0 m:0";

const SIZES: Record<Size, string> = {
  sm: "w:3 h:3",
  md: "w:4 h:4",
  lg: "w:5 h:5",
};

const DOT_SIZES: Record<Size, string> = {
  sm: "w:1 h:1",
  md: "w:2 h:2",
  lg: "w:3 h:3",
};

const LABEL_SIZES: Record<Size, string> = {
  sm: "fs:xs",
  md: "fs:sm",
  lg: "fs:md",
};

const ROUND = "br:9999";

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i:md",
  outset: "bs-o:sm",
};

export interface RadioProps {
  /**
   * The choices. `value` and `label` are required; `description` and `icon` are
   * optional per option. The shape is fixed rather than generic because you own
   * the file: data that does not fit is an edit to the option body, not an API.
   */
  options: RadioOption[];
  /**
   * A caption above the group, correctly wired to it via `aria-labelledby`.
   * Without one the group has no accessible name at all.
   */
  label?: string;
  /**
   * The option selected when you are not controlling the group. Pair `value`
   * with `onValueChange` instead if you are.
   */
  defaultValue?: string;
  /** Controlled selection. */
  value?: string;
  /** Called with the newly selected value. Required for a controlled group. */
  onValueChange?: (value: string) => void;
  /** The circle, the dot and the label together. */
  size?: Size;
  /**
   * Depth on an unselected circle. A selected one is already a solid fill, so
   * it does not carry the shadow: stacking one on top muddies the color.
   */
  shadow?: Shadow;
  /** Blocks interaction and dims every option. */
  disabled?: boolean;
  /**
   * The dot's transition when selection changes. Turn it off for a static
   * group, or when the user has asked for reduced motion.
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
 * A single choice from a short list, always round, with an optional icon and
 * description on each option.
 */
export default function RadioBase({
  options,
  label,
  defaultValue,
  value,
  onValueChange,
  size = "md",
  shadow = "none",
  disabled = false,
  animated = true,
  className,
  focus = true,
}: RadioProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const labelId = useId();

  const dotClasses = (checked: boolean) =>
    checked
      ? `${DOT_SIZES[size]} ${ROUND} bg:white ${animated ? "tp:t tdu:150 ttf:eo @st:s:0 @prm:tp:none" : ""}`
      : "d:none";

  return (
    <div className="d:f fd:c g:2">
      {label && (
        <div id={labelId} className="fs:xs fw:600 c:slate-5 us:none">
          {label}
        </div>
      )}

      <RadioGroup
        aria-labelledby={label ? labelId : undefined}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className={merge("d:f fd:c g:3 ai:fs", className)}
      >
        {options.map((option) => {
          const rootClasses = (checked: boolean) =>
            merge(
              outline,
              BASE,
              SIZES[size],
              ROUND,
              checked
                ? "bg:slate-12"
                : `bg:white bw:1 bc:silver-3 ${SHADOWS[shadow]}`,
            );

          const indicator = (
            <Radio.Indicator className={(state) => dotClasses(state.checked)} />
          );

          return (
            <label
              key={option.value}
              className={`d:f fd:c g:1 fw:500 ${LABEL_SIZES[size]} ${
                disabled ? "o:60 c:na" : "c:slate-10 c:p"
              }`}
            >
              <div className="d:f ai:c g:2">
                <Radio.Root
                  value={option.value}
                  className={(state) => rootClasses(state.checked)}
                >
                  {indicator}
                </Radio.Root>
                <span>{option.label}</span>
              </div>
              {option.description && (
                <p className="pl:6 m:0 c:slate-6 fs:xs fw:400">
                  {option.description}
                </p>
              )}
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
