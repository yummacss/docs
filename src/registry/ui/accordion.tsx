"use client";

import { Accordion } from "@base-ui/react/accordion";
import {
  AddIcon,
  AltArrowDownIcon,
  LockIcon,
  MinusIcon,
} from "@solar-icons/react/linear";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Variant = "default" | "bordered" | "ghost" | "subtle";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const TURN = "yui-accordion-turn";

const ACCORDION_MOTION = `
  .yui-accordion-panel {
    height: var(--accordion-panel-height);
    overflow: hidden;
    transition: height 200ms ease-out, opacity 200ms ease-out;
  }
  .yui-accordion-panel[data-starting-style],
  .yui-accordion-panel[data-ending-style] {
    height: 0;
    opacity: 0;
  }
  .yui-accordion-turn {
    transition: rotate 150ms ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-accordion-panel,
    .yui-accordion-turn { transition: none; }
  }
`;

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";
type Indicator = "chevron" | "plus-minus";
type IndicatorPosition = "leading" | "trailing";

export interface AccordionItem {
  value: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

const SHAPES: Record<Shape, { item: string; trigger: string }> = {
  rounded: { item: "br:lg", trigger: "br:sm" },
  square: { item: "", trigger: "" },
  squircle: { item: "br:xxl cs:s", trigger: "br:xxl cs:s" },
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

export interface AccordionProps {
  /**
   * Each item's `value`, `title`, `content` and optional `disabled`. `value` is
   * what `defaultValue`/`value` reference to control which items are open.
   */
  items: AccordionItem[];
  /**
   * `default` is a plain list divided by `separator`. `bordered` boxes each
   * item. `ghost` marks the open item with a left border. `subtle` fills the
   * open item's background.
   */
  variant?: Variant;
  /**
   * Corner radius on `bordered` items. The other variants use a fixed radius,
   * since no shape was ever paired with them.
   */
  shape?: Shape;
  /** Wraps the whole list in a card. Only applies to the `default` variant. */
  shadow?: Shadow;
  /**
   * Draws a rule between each pair of items. Only visible on the `default`
   * variant.
   */
  separated?: boolean;
  /**
   * Which built-in open/closed mark the trigger draws. `chevron` rotates one
   * glyph 180 degrees. `plus-minus` swaps between two glyphs with a small
   * rotation flourish.
   */
  indicator?: Indicator;
  /** Which end of the trigger the indicator sits at. */
  indicatorPosition?: IndicatorPosition;
  /**
   * Allow more than one item open at once. Off keeps opening one item closed
   * the rest.
   */
  multiple?: boolean;
  /**
   * Which items start open, by `value`. Pair `value` with `onValueChange`
   * instead if you are controlling it.
   */
  defaultValue?: string[];
  /** Controlled open items, by `value`. */
  value?: string[];
  /** Called with the new open items. Required for a controlled accordion. */
  onValueChange?: (value: string[]) => void;
  /**
   * The icon's rotation & the panel's height/opacity animation. Turn it off for
   * an instant expand/collapse, or when the user has asked for reduced motion.
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
 * A vertically stacked set of collapsible panels, in four variants, with single
 * or multiple selection.
 */
export default function AccordionBase({
  items,
  variant = "default",
  shape = "square",
  shadow = "none",
  separated = true,
  indicator = "chevron",
  indicatorPosition = "trailing",
  multiple = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  animated = true,
  className,
  focus = true,
}: AccordionProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [internalValue, setInternalValue] = useState<string[]>(
    defaultValue ?? controlledValue ?? [],
  );
  const value = controlledValue ?? internalValue;

  const handleValueChange = (next: string[]) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const isCard = variant === "default" && shadow !== "none";
  const itemShadow =
    shadow !== "none" && (variant === "bordered" || variant === "subtle")
      ? SHADOWS[shadow]
      : "";

  const rootClasses = merge(
    "d:f fd:c w:100% max-w:96",
    variant === "bordered" || variant === "subtle" ? "g:2" : "",
    isCard
      ? ["bg:white br:lg bw:1 bc:silver-2", SHADOWS[shadow]]
          .filter(Boolean)
          .join(" ")
      : "",
    className,
  );

  return (
    <Accordion.Root
      className={rootClasses}
      value={value}
      onValueChange={handleValueChange}
      multiple={multiple}
    >
      <style href="yumma-ui-accordion-motion" precedence="default">
        {ACCORDION_MOTION}
      </style>
      {items.map((item, index) => {
        const isOpen = value.includes(item.value);
        const isLast = index === items.length - 1;

        const itemClasses =
          variant === "bordered"
            ? ["bg:white bc:silver-3 bw:1", SHAPES[shape].item, itemShadow]
                .filter(Boolean)
                .join(" ")
            : variant === "ghost"
              ? [
                  "blw:2 pl:4",
                  isOpen ? "blc:slate-12" : "blc:silver-3",
                  isLast ? "" : "mb:3",
                ]
                  .filter(Boolean)
                  .join(" ")
              : variant === "subtle"
                ? [
                    SHAPES[shape].item,
                    isOpen ? "bg:silver-1" : "bg:silver-1 h:bg:silver-2",
                    itemShadow,
                  ]
                    .filter(Boolean)
                    .join(" ")
                : separated && !isLast
                  ? "bbw:1 bc:silver-3"
                  : "";

        const triggerRadius =
          variant === "bordered" ? SHAPES[shape].trigger : "br:sm";
        const inset = variant === "bordered" || variant === "subtle" || isCard;
        const triggerPadX = inset ? "px:4" : "px:0";
        const triggerPadY =
          variant === "ghost"
            ? "py:2"
            : variant === "default" && !separated
              ? "py:3"
              : "py:4";
        const panelPadX = inset ? "px:4" : "";

        const titleColor = item.disabled
          ? "c:slate-4"
          : variant === "ghost"
            ? isOpen
              ? "c:slate-12"
              : "c:slate-8"
            : variant === "subtle"
              ? isOpen
                ? "c:slate-12"
                : "c:slate-8"
              : "c:slate-8";
        const contentColor =
          variant === "subtle" && isOpen ? "c:slate-12" : "c:slate-6";
        const panelClasses = ["m:0 pb:4", panelPadX, "fs:sm lh:4", contentColor]
          .filter(Boolean)
          .join(" ");
        const glyphColor = item.disabled
          ? "c:slate-4"
          : variant === "ghost"
            ? isOpen
              ? "c:slate-10"
              : "c:slate-6"
            : variant === "subtle" && isOpen
              ? "c:slate-10"
              : "c:slate-6";

        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={itemClasses}
          >
            <Accordion.Header className="m:0">
              <Accordion.Trigger
                className={merge(
                  outline,
                  "d:f ai:c",
                  indicatorPosition === "trailing" ? "jc:sb" : "",
                  "g:3 w:100%",
                  triggerPadY,
                  triggerPadX,
                  "bg:transparent bw:0",
                  triggerRadius,
                  "ta:l",
                  item.disabled ? "c:na o:60" : "c:p",
                )}
              >
                {indicator === "plus-minus" &&
                  indicatorPosition === "leading" && (
                    <PlusMinusGlyph
                      isOpen={isOpen}
                      animated={animated}
                      className={glyphColor}
                    />
                  )}
                <div className="d:f ai:c g:3">
                  <span
                    className={["fs:sm fw:500", titleColor]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.title}
                  </span>
                  {item.disabled && (
                    <LockIcon className="w:3 h:3 c:slate-4" aria-hidden />
                  )}
                </div>
                {indicator === "chevron" ? (
                  <ChevronGlyph
                    isOpen={isOpen}
                    animated={animated}
                    className={glyphColor}
                  />
                ) : (
                  indicatorPosition === "trailing" && (
                    <PlusMinusGlyph
                      isOpen={isOpen}
                      animated={animated}
                      className={glyphColor}
                    />
                  )
                )}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel
              keepMounted
              className={animated ? "yui-accordion-panel" : undefined}
            >
              <p className={panelClasses}>{item.content}</p>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

function ChevronGlyph({
  isOpen,
  animated,
  className,
}: {
  isOpen: boolean;
  animated: boolean;
  className: string;
}) {
  if (!animated) {
    return (
      <AltArrowDownIcon
        className={merge("fs:0 w:4 h:4", isOpen ? "ro:36" : "ro:0", className)}
        aria-hidden
      />
    );
  }

  return (
    <span className={`d:f ${TURN} ${isOpen ? "ro:36" : "ro:0"}`}>
      <AltArrowDownIcon
        className={merge("fs:0 w:4 h:4", className)}
        aria-hidden
      />
    </span>
  );
}

function PlusMinusGlyph({
  isOpen,
  animated,
  className,
}: {
  isOpen: boolean;
  animated: boolean;
  className: string;
}) {
  const glyphClasses = merge("fs:0 w:4 h:4", className);
  const icon = isOpen ? (
    <MinusIcon className={glyphClasses} aria-hidden />
  ) : (
    <AddIcon className={glyphClasses} aria-hidden />
  );

  if (!animated) {
    return icon;
  }

  return (
    <span className={`d:f ${TURN} ${isOpen ? "ro:18" : "ro:0"}`}>{icon}</span>
  );
}
