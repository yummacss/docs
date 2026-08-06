import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import type { ReactNode } from "react";

type Shape = "rounded" | "square" | "squircle" | "circle";

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
  circle: "br-9999",
};

export interface SeparatorProps {
  /** Renders as a clickable button in the middle, sized & shaped to match. */
  icon?: ReactNode;
  onIconClick?: () => void;
  /** Renders as plain text in the middle. Ignored if `icon` is set. */
  label?: ReactNode;
  /** Only visible alongside `icon`. */
  shape?: Shape;
  className?: string;
}

export default function SeparatorBase({
  icon,
  onIconClick,
  label,
  shape = "rounded",
  className,
}: SeparatorProps) {
  if (!icon && !label) {
    return (
      <Separator
        className={["h-px w-100% bg-silver-2", className]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  const buttonClasses = [
    "d-if ai-c jc-c w-8 h-8 bg-white bc-silver-2 c-slate-10 bw-1 tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5",
    SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={["d-f ai-c g-2 w-100%", className].filter(Boolean).join(" ")}
    >
      <Separator className="fg-1 h-px bg-silver-2" />
      {icon ? (
        <Button className={buttonClasses} onClick={onIconClick}>
          {icon}
        </Button>
      ) : (
        <span className="c-slate-6 fs-xs fw-500 tt-u ls-3">{label}</span>
      )}
      <Separator className="fg-1 h-px bg-silver-2" />
    </div>
  );
}
