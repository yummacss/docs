"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Avatar } from "@base-ui/react/avatar";
import { motion } from "motion/react";
import { type ReactNode, useEffect, useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";

export interface AutocompleteItem {
  label: string;
  description?: string;
  avatar?: string;
  icon?: ReactNode;
}

export interface AutocompleteGroup {
  group: string;
  items: AutocompleteItem[];
}

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const INPUT = "bg:white bc:silver-3 c:slate-10 bw:1 fs:md";

const SIZES: Record<Size, string> = {
  sm: "h:8 w:56",
  md: "h:10 w:64",
  lg: "h:12 w:72",
};

const AUTOCOMPLETE_MOTION = `
  .yui-autocomplete-pop {
    transition: opacity 150ms ease-out, scale 150ms ease-out;
  }
  .yui-autocomplete-pop[data-starting-style],
  .yui-autocomplete-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-autocomplete-pop { transition: none; }
  }
`;

const ITEM_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:lg cs:s",
};

const POPUP_SIZES: Record<Size, string> = {
  sm: "w:56",
  md: "w:64",
  lg: "w:72",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "br:0",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i:md",
  outset: "bs-o:sm",
};

const ICON_PADDING: Record<IconSide, string> = {
  leading: "pl:10 pr:4",
  trailing: "pl:4 pr:10",
};

export interface AutocompleteProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /**
   * What to search. `label` is matched and shown; `description` and `avatar`
   * are optional. The shape is fixed rather than generic because you own the
   * file: data that does not fit is an edit to the item body, not an API.
   */
  items: AutocompleteItem[] | AutocompleteGroup[];
  /**
   * Field label above the input. Leave it out and the input is described by its
   * placeholder alone.
   */
  label?: ReactNode;
  /**
   * A line under the input, for what the field expects rather than a
   * restatement of the label.
   */
  description?: string;
  /** Placeholder text. */
  placeholder?: string;
  /**
   * Height and width of the input. The popup matches it, or it reads as a
   * different control.
   */
  size?: Size;
  /**
   * Corner radius, applied to the input and the popup together. `squircle` uses
   * `corner-shape`.
   */
  shape?: Shape;
  /**
   * Depth on the input. `inset` reads as a well, `outset` as a raised control.
   */
  shadow?: Shadow;
  /**
   * Any icon. It is positioned over the input and the text is padded around it,
   * so pass the glyph and nothing else.
   */
  icon?: ReactNode;
  /** Which end `icon` sits at. */
  iconPosition?: IconSide;
  /** Blocks interaction and dims the field. */
  disabled?: boolean;
  /**
   * Replaces the results with a loading row, for an async source. The fetching
   * itself is yours; this is only the state.
   */
  loading?: boolean;
  /**
   * Highlights the first match as you type, so Enter takes it without an arrow
   * key first.
   */
  autoHighlight?: boolean;
  /** Cap on how many matches are listed. `0` lists them all. */
  limit?: number;
  /**
   * Fades the popup in and out. Turn it off for a static popup, or when the
   * user has asked for reduced motion.
   */
  animated?: boolean;
  /** Shown when nothing matches. */
  emptyMessage?: string;
  /** Called with the text as it is typed. */
  onQueryChange?: (value: string) => void;
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

function isGroupEntry(
  entry: AutocompleteItem | AutocompleteGroup,
): entry is AutocompleteGroup {
  return "items" in entry;
}

function renderItem(item: AutocompleteItem, shape: Shape) {
  return (
    <Autocomplete.Item
      key={item.label}
      value={item.label}
      render={(props, state) => (
        <div
          {...props}
          className={`d:f ai:c g:3 py:2 px:3 mx:1 c:slate-10 ${ITEM_SHAPES[shape]} fs:sm us:none c:p ${
            state.highlighted ? "bg:silver-2/50" : "bg:transparent"
          }`}
        >
          {item.icon ? (
            <span className="d:f fs:0 ai:c jc:c w:6 h:6 c:slate-5">
              {item.icon}
            </span>
          ) : (
            item.avatar && (
              <Avatar.Root className="fs:0 w:6 h:6 bc:white br:9999 bw:1">
                <Avatar.Image
                  src={item.avatar}
                  alt=""
                  className="of:c w:100% h:100% br:9999"
                />
                <Avatar.Fallback className="d:f ai:c jc:c w:100% h:100% bg:silver-2 c:slate-8 fs:xs">
                  {item.label[0]}
                </Avatar.Fallback>
              </Avatar.Root>
            )
          )}
          <div className="d:f fd:c min-w:0">
            <span className="o:h fw:500 to:e ws:nw">{item.label}</span>
            {item.description && (
              <span className="c:slate-6 fs:xs">{item.description}</span>
            )}
          </div>
        </div>
      )}
    />
  );
}

/**
 * A text input that filters a list as you type, in three sizes, three shapes
 * and three shadows, with an optional icon and a loading state.
 */
export default function AutocompleteBase({
  items,
  label,
  description,
  placeholder = "Search",
  size = "md",
  shape = "square",
  shadow = "none",
  icon,
  iconPosition = "leading",
  disabled = false,
  loading = false,
  autoHighlight = false,
  limit = 0,
  animated = true,
  emptyMessage = "No results found.",
  onQueryChange,
  className,
  focus = true,
  container,
}: AutocompleteProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  const id = useId();

  const inputClasses = merge(
    outline,
    INPUT,
    SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    icon ? ICON_PADDING[iconPosition] : "pl:4",
    className,
  );

  const popup = (
    <Autocomplete.Popup
      className={`o:h bg:white bc:silver-2 c:slate-10 bw:1 ${POPUP_SIZES[size]} ${SHAPES[shape]} ${animated ? "yui-autocomplete-pop" : ""}`}
    >
      {loading ? (
        <div
          className="d:f py:3 px:4 ai:c g:2 c:slate-6 fs:sm us:none"
          role="status"
        >
          <motion.span
            aria-hidden
            className="d:b w:4 h:4 bc:silver-3 btc:slate-8 bw:2 br:9999"
            animate={animated ? { rotate: 360 } : undefined}
            transition={{
              duration: 0.7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          Loading
        </div>
      ) : (
        <>
          <Autocomplete.List className="oy:auto max-h:72 py:1 ow:0">
            {(entry: AutocompleteItem | AutocompleteGroup) =>
              isGroupEntry(entry) ? (
                <Autocomplete.Group key={entry.group}>
                  <Autocomplete.GroupLabel className="px:3 pt:2 pb:1 fs:xs fw:500 c:slate-5 us:none">
                    {entry.group}
                  </Autocomplete.GroupLabel>
                  {entry.items.map((entry) => renderItem(entry, shape))}
                </Autocomplete.Group>
              ) : (
                renderItem(entry, shape)
              )
            }
          </Autocomplete.List>
          <Autocomplete.Empty className="c:slate-6 fs:sm">
            <div className="pt:2 pb:3 px:4 us:none">{emptyMessage}</div>
          </Autocomplete.Empty>
        </>
      )}
    </Autocomplete.Popup>
  );

  return (
    <Autocomplete.Root
      items={items as AutocompleteItem[]}
      open={open}
      onOpenChange={setOpen}
      onValueChange={onQueryChange}
      disabled={disabled}
      autoHighlight={autoHighlight}
      limit={limit > 0 ? limit : undefined}
    >
      <div className={`d:f fd:c g:2 ${disabled ? "o:60 c:na" : ""}`}>
        {label && (
          <label htmlFor={id} className="c:slate-10 fs:sm fw:500">
            {label}
          </label>
        )}
        <div className="d:f p:r ai:c">
          {icon && (
            <span
              className={`d:f p:a ai:c c:slate-5 pe:none ${iconPosition === "leading" ? "l:3" : "r:3"}`}
            >
              {icon}
            </span>
          )}
          <style href="yumma-ui-autocomplete-motion" precedence="default">
            {AUTOCOMPLETE_MOTION}
          </style>
          <Autocomplete.Input
            id={id}
            placeholder={placeholder}
            className={inputClasses}
          />
        </div>
        {description && <p className="m:0 c:slate-6 fs:xs">{description}</p>}
      </div>
      <Autocomplete.Portal container={container} keepMounted>
        <Autocomplete.Positioner className="ow:0" sideOffset={8}>
          {popup}
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}
