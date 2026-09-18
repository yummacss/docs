import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle" | "circle";

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
  circle: "br-9999",
};

type Orientation = "horizontal" | "vertical";

const FOCUS = "fv:os-s fv:ow-3 fv:oo-0 fv:oc-silver-3/60 fv:bc-silver-5";

export interface SeparatorProps {
  icon?: ReactNode;
  onIconClick?: () => void;
  label?: ReactNode;
  iconShape?: Shape;
  orientation?: Orientation;
  className?: string;
  focus?: boolean | string;
}

export default function SeparatorBase({
  icon,
  onIconClick,
  label,
  iconShape = "rounded",
  orientation = "horizontal",
  className,
  focus = true,
}: SeparatorProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const vertical = orientation === "vertical";

  const rule = vertical ? "w-px h-100% as-s" : "h-px w-100%";

  if (!icon && !label) {
    return (
      <Separator
        orientation={orientation}
        className={merge(rule, "bg-silver-2", className)}
      />
    );
  }

  const buttonClasses = merge(
    outline,
    "d-if ai-c jc-c w-8 h-8 bg-white bc-silver-2 c-slate-10 bw-1 tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50",
    SHAPES[iconShape],
  );

  const half = `fg-1 bg-silver-2 ${vertical ? "w-px" : "h-px"}`;

  return (
    <div
      className={merge(
        `d-f ai-c g-2 ${vertical ? "fd-c h-100% as-s" : "w-100%"}`,
        className,
      )}
    >
      <Separator orientation={orientation} className={half} />
      {icon ? (
        <Button className={buttonClasses} onClick={onIconClick}>
          {icon}
        </Button>
      ) : (
        <span className="fs:0 c:slate-6 fs:xs fw:500 tt:u ls:3">{label}</span>
      )}
      <Separator orientation={orientation} className={half} />
    </div>
  );
}
