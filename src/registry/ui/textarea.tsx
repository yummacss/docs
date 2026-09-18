"use client";

import { Field } from "@base-ui/react/field";
import { Check, WarningTriangle } from "iconoir-react";
import type { ChangeEvent, ComponentProps } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Status = "default" | "error" | "success";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

const STATUS_BORDER: Record<Status, string> = {
  default: "bc:silver-3",
  error: "bc:red-5",
  success: "bc:green-5",
};

const STATUS_OUTLINE: Record<Status, string> = {
  default: "",
  error: "fv:oc:red-2/60 fv:bc:red-3",
  success: "fv:oc:green-2/60 fv:bc:green-3",
};

const STATUS_ICON: Record<Status, string> = {
  default: "",
  error: "c:red-5",
  success: "c:green-5",
};

const STATUS_MESSAGE: Record<Status, string> = {
  default: "c:slate-6",
  error: "c:red-5",
  success: "c:green-6",
};

const WARN_AT = 20;

export interface TextareaProps
  extends Omit<ComponentProps<"textarea">, "className" | "onChange"> {
  /**
   * Text above the control. `Field.Root` and `Field.Label` associate it
   * automatically, so no `id`/`htmlFor` bookkeeping is needed.
   */
  label?: string;

  /**
   * Appends a red asterisk to the label & sets the control's native `required`
   * attribute.
   */
  required?: boolean;

  /**
   * A line under the control, for format or context. Replaced by `error` or
   * `success` when either is set.
   */
  description?: string;

  /**
   * Red border, a warning icon & this message in place of `description`. Wins
   * over `success` if both are set.
   */
  error?: string;

  /** Green border, a check icon & this message in place of `description`. */
  success?: string;

  /**
   * Caps the value and draws the counter under the field. Zero draws neither.
   */
  maxLength?: number;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /**
   * Depth on the control. `inset` reads as a well, `outset` as a raised
   * control.
   */
  shadow?: Shadow;
  /** Called on every input event. */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
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
 * A multi-line text field, in three shapes and three shadows, with an optional
 * character counter and error or success states.
 */
export default function TextareaBase({
  label,
  required = false,
  description,
  error,
  success,
  maxLength,
  shape = "square",
  shadow = "none",
  disabled,
  className,
  focus = true,
  onChange,
  defaultValue,
  value: controlledValue,
  ...props
}: TextareaProps) {
  const [internalValue, setInternalValue] = useState(
    String(defaultValue ?? controlledValue ?? ""),
  );
  const value = String(controlledValue ?? internalValue);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(event.target.value);
    onChange?.(event);
  };

  const status: Status = error ? "error" : success ? "success" : "default";
  const outline = focus
    ? merge(FOCUS, STATUS_OUTLINE[status], focus === true ? "" : focus)
    : "";
  const message = error ?? success ?? description;

  const showCounter = maxLength !== undefined && maxLength > 0;
  const remaining = showCounter ? maxLength - value.length : 0;
  const percent = showCounter
    ? Math.min((value.length / maxLength) * 100, 100)
    : 0;
  const warn = showCounter && remaining <= WARN_AT;

  const controlClasses = merge(
    outline,
    "h:24 w:64 pt:3 pl:3 bg:white c:slate-10 bw:1 fs:md r:none",
    showCounter || status !== "default" ? "pr:10" : "pr:3",
    SHAPES[shape],
    SHADOWS[shadow],
    STATUS_BORDER[status],
    className,
  );

  return (
    <Field.Root
      disabled={disabled}
      className={`d:f fd:c g:2 ${disabled ? "o:60 c:na" : ""}`}
    >
      {label && (
        <Field.Label className="c:slate-10 fs:sm fw:500">
          {label}
          {required && <span className="c:red-5"> *</span>}
        </Field.Label>
      )}

      <div className="d:f p:r ai:s">
        {}
        <Field.Control
          render={<textarea />}
          value={value}
          maxLength={maxLength}
          required={required}
          className={controlClasses}
          {...(props as ComponentProps<typeof Field.Control>)}
          onChange={
            handleChange as unknown as ComponentProps<
              typeof Field.Control
            >["onChange"]
          }
        />
        {status !== "default" && (
          <span className={`d:f p:a r:3 t:3 ai:c jc:c ${STATUS_ICON[status]}`}>
            {status === "error" ? (
              <WarningTriangle className="w:4 h:4" />
            ) : (
              <Check className="w:4 h:4" />
            )}
          </span>
        )}
      </div>

      {message && (
        <p className={`m:0 fs:xs ${STATUS_MESSAGE[status]}`}>{message}</p>
      )}

      {showCounter && (
        <div className="d:f fd:c g:1">
          <div className="d:f jc:sb">
            <span className="c:slate-5 fs:xs">
              {remaining} characters remaining
            </span>
            <span className={`fs:xs fw:500 ${warn ? "c:red" : "c:slate-5"}`}>
              {value.length} / {maxLength}
            </span>
          </div>
          <div className="w:100% h:1 bg:silver-2 br:9999 o:h">
            <div
              className={`h:100% br:9999 ${warn ? "bg:red" : "bg:slate-12"}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}
    </Field.Root>
  );
}
