"use client";

import { Slider } from "@base-ui/react/slider";
import { type FocusEvent, type ReactNode, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Value = number | number[];

const SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i:md",
  outset: "bs-o:sm",
};

const FOCUS = "os:s ow:3 oo:0 oc:silver-3/60";

const THUMB_BOX = "d:f ai:c jc:c w:6 h:5 p:1";
const BOX = "1.5rem";
const HALF_BOX = "0.75rem";

function defaultFormat(value: Value): ReactNode {
  return Array.isArray(value) ? `${value[0]} - ${value[1]}` : `${value}%`;
}

export interface SliderProps {
  /** Text beside the value, above the track. */
  label?: string;
  /** Appends a red asterisk to the label. */
  required?: boolean;
  /** A line under the control, for context on what the value means. */
  description?: string;
  /**
   * A single number for one thumb, or a two-item array for a range with two.
   * Whichever shape you start with is the shape the slider keeps. It does not
   * switch thumb count at runtime.
   */
  defaultValue?: Value;
  /** Controlled value, same shape rule as `defaultValue`. */
  value?: Value;
  /**
   * Called with the new value on every change. Required for a controlled
   * slider.
   */
  onValueChange?: (value: Value) => void;
  /** Lower bound. */
  min?: number;
  /** Upper bound. */
  max?: number;
  /** Amount each keyboard press or drag increment changes the value by. */
  step?: number;
  /**
   * Corner radius, applied to the track, the indicator and the thumb together.
   * `squircle` uses `corner-shape`.
   */
  shape?: Shape;
  /**
   * Depth on the thumb only. The track and indicator are flush with the
   * control, so a shadow on them would read as a stray line rather than depth.
   */
  shadow?: Shadow;
  /** Blocks interaction and dims the control. */
  disabled?: boolean;
  /**
   * How the value is shown beside the label. Defaults to `50%` for one thumb,
   * `20 - 80` for a range; override for currency, units, or anything else.
   */
  formatValue?: (value: Value) => ReactNode;
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
 * A value between a min and a max, one thumb or two for a range, in three
 * shapes and three thumb shadows.
 */
export default function SliderBase({
  label,
  required = false,
  description,
  defaultValue,
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  shape = "square",
  shadow = "none",
  disabled = false,
  formatValue = defaultFormat,
  className,
  focus = true,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<Value>(
    defaultValue ?? controlledValue ?? 0,
  );
  const [focused, setFocused] = useState(-1);
  const value = controlledValue ?? internalValue;
  const isRange = Array.isArray(value);

  const handleChange = (next: Value) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const outline = merge(
    focus ? FOCUS : "",
    (typeof focus === "string" ? focus : "").replace(/\bfv:/g, ""),
  );

  const thumbClasses = (index: number) =>
    merge(
      "w:4 h:3",
      disabled ? "bg:silver-5" : "bg:slate-10",
      SHAPES[shape],
      focused === index ? outline : "",
    );

  const focusProps = (index: number) => ({
    onFocus: (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.matches(":focus-visible")) setFocused(index);
    },
    onBlur: () => setFocused(-1),
  });

  return (
    <div className={merge("d:f fd:c g:2 w:64", className)}>
      <div className="d:f ai:c jc:sb">
        {label && (
          <label className="c:slate-10 fs:sm fw:500 us:none">
            {label}
            {required && <span className="c:red-5"> *</span>}
          </label>
        )}
        <span className="c:slate-8 fs:sm">{formatValue(value)}</span>
      </div>

      <Slider.Root
        value={value}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        thumbAlignment="edge"
      >
        <Slider.Control
          className={`d:f ai:c py:2 us:none ta:none ${disabled ? "c:na" : ""}`}
        >
          <Slider.Track
            className={merge(
              "p:r h:5 w:100% bg:white os:s ow:1 oo:0 oc:silver-3",
              SHAPES[shape],
              SHADOWS[shadow],
            )}
          >
            <Slider.Indicator
              style={
                isRange
                  ? {
                      insetInlineStart: `calc(var(--start-position) - ${HALF_BOX})`,
                      width: `calc(var(--relative-size) + ${BOX})`,
                    }
                  : { width: `calc(var(--start-position) + ${HALF_BOX})` }
              }
              className={merge(
                disabled ? "bg:silver-1" : "bg:silver-2 brc:silver-3 brw:1",
                SHAPES[shape],
              )}
            />
            {isRange ? (
              value.map((_, index) => (
                <Slider.Thumb
                  // biome-ignore lint/suspicious/noArrayIndexKey: positional by design
                  key={index}
                  index={index}
                  className={THUMB_BOX}
                  {...focusProps(index)}
                >
                  <span className={thumbClasses(index)} />
                </Slider.Thumb>
              ))
            ) : (
              <Slider.Thumb className={THUMB_BOX} {...focusProps(0)}>
                <span className={thumbClasses(0)} />
              </Slider.Thumb>
            )}
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>

      {description && <p className="m:0 c:slate-6 fs:xs">{description}</p>}
    </div>
  );
}
