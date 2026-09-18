import { Children, type ReactNode } from "react";
import { merge } from "yummacss/merge";
import Separator from "./separator";

type Shape = "rounded" | "square" | "squircle" | "pill";

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "br:0",
  squircle: "br:xxl cs:s",
  pill: "p:1 br:9999",
};

const BASE = "d:f ai:c o:h w:fc bg:white bc:silver-2 bw:1";

export interface ButtonGroupProps {
  /** Merged with the group's own classes, so a utility you pass wins. */
  className?: string;
  /** The buttons, spaced and rounded as one control. */
  children: ReactNode;
  /**
   * Corner radius of the group. `pill` also insets the buttons, so a pill
   * `Button` inside sits clear of the border.
   */
  shape?: Shape;
  /**
   * Draws a rule between each pair of buttons. Turn it off when the buttons
   * already carry their own edges.
   */
  separated?: boolean;
  /** Buttons share the full width instead of sizing to their labels. */
  stretch?: boolean;
}

/**
 * A row of related buttons sharing one border, in four shapes, with optional
 * rules between them.
 */
export default function ButtonGroup({
  className,
  children,
  shape = "square",
  separated = true,
  stretch = false,
}: ButtonGroupProps) {
  const items = Children.toArray(children);

  return (
    <div className={merge(BASE, SHAPES[shape], stretch && "w:100%", className)}>
      {items.map((child, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: position is the identity here
        <div key={index} className={stretch ? "d:f fg:1" : "d:f"}>
          {index > 0 && separated && (
            <Separator
              orientation="vertical"
              className={shape === "pill" ? "mx:1 my:1" : undefined}
            />
          )}
          {child}
        </div>
      ))}
    </div>
  );
}
