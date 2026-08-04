import { CloudUpload } from "iconoir-react";
import type { ReactNode } from "react";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Border = "dashed" | "solid";

// Plain lookups rather than cva: a copied component should not drag a class
// utility into your package.json to do what an object literal already does.
const ZONE = "d-f fd-c ai-c g-3 w-100 bg-white";

const SHAPES: Record<Shape, string> = {
  rounded: "br-xxl",
  square: "br-0",
  squircle: "br-3xl cs-s",
};

// A dashed edge is the drop-zone convention & needs the extra width to read as
// one. A solid edge is a heavier, more permanent-looking box, so it stays thin.
const BORDERS: Record<Border, string> = {
  dashed: "bw-2 bs-d",
  solid: "bw-1",
};

// The shadow is on the icon tile rather than the zone: a drop target with a
// drop shadow reads as a card you cannot drop into.
const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

export interface FileUploadProps {
  /** The clickable part of the prompt, before "or drag and drop". */
  label?: string;
  /** The quieter line under it, for what this zone accepts. */
  hint?: string;
  /** A line outside the zone, for formats and limits. */
  description?: string;
  icon?: ReactNode;
  shape?: Shape;
  shadow?: Shadow;
  border?: Border;
  /** Turns the zone red. Pair it with `description` saying what went wrong. */
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function FileUploadBase({
  label = "Upload files",
  hint = "Drag and drop files here",
  description,
  icon,
  shape = "rounded",
  shadow = "none",
  border = "dashed",
  error = false,
  disabled = false,
  className,
}: FileUploadProps) {
  const zone = [
    ZONE,
    SHAPES[shape],
    BORDERS[border],
    error ? "bc-red-5" : "bc-silver-2",
    disabled ? "bg-silver-1/50 o-60 c-na" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={zone}>
      <div className="d-f fd-c ai-c g-2 p-8 ta-c">
        <div
          className={`d-f ai-c jc-c w-10 h-10 br-lg bw-1 ${SHADOWS[shadow]} ${
            error ? "bg-red-1/50 bc-red-5" : "bg-white bc-silver-2"
          }`}
        >
          {icon ?? (
            <CloudUpload
              className={`w-5 h-5 ${error ? "c-red-5" : "c-slate-6"}`}
            />
          )}
        </div>
        <div className="d-f fd-c ai-c g-1">
          <span className={`fs-sm fw-500 ${error ? "c-red-5" : "c-slate-10"}`}>
            <a className="c-indigo td-none c-p">{label}</a> or drag and drop
          </span>
          <span className={`fs-xs fw-400 ${error ? "c-red-5" : "c-slate-6"}`}>
            {hint}
          </span>
        </div>
      </div>

      {description && (
        <p className="w-100% m-0 pb-6 c-slate-6 fs-xs ta-c">{description}</p>
      )}
    </section>
  );
}
