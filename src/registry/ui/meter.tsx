import { Meter } from "@base-ui/react/meter";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shadow = "none" | "inset" | "outset";

const INTENTS = {
  neutral: "bg:slate",
  info: "bg:blue",
  success: "bg:green",
  warning: "bg:yellow",
  danger: "bg:red",
} satisfies Record<string, string>;

type Intent = keyof typeof INTENTS;

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

export interface MeterProps {
  /** The current value. */
  value: number;
  /** Defaults to Base UI's own Meter minimum (0). */
  min?: number;
  /** Defaults to Base UI's own Meter maximum (100). */
  max?: number;
  /**
   * Text above the track, correctly wired to it via Base UI's own Meter.Label.
   */
  label: ReactNode;
  /**
   * A line under the label. Only shown alongside `icon` - without one there is
   * no header block for it to sit in.
   */
  description?: string;
  /**
   * A leading avatar. Setting this switches the header to a grouped
   * icon+label+description block & moves the value display below the track
   * instead of beside the label. It sits in a fixed 32px tile that colors the
   * glyph but does not resize it, so pass one sized to fit (`w-4 h-4`).
   */
  icon?: ReactNode;
  /**
   * What the reading means, not which hue it is. The five map to Yumma families
   * in the shipped `INTENTS` table; point one somewhere else and the type
   * follows.
   */
  intent?: Intent;
  /**
   * Wraps the meter in a padded card. `none` renders it bare, with no card at
   * all.
   */
  shadow?: Shadow;
  /** The indicator's width transition as `value` changes. */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/**
 * A labelled progress meter, in four colors, with an optional icon, description
 * and card shadow.
 */
export default function MeterBase({
  value,
  min,
  max,
  label,
  description,
  icon,
  intent = "info",
  shadow = "none",
  animated = true,
  className,
}: MeterProps) {
  const isCard = shadow !== "none";
  const hasHeader = Boolean(icon);

  const rootClasses = merge(
    "d:f fd:c w:64",
    hasHeader ? "g:3" : "g:2",
    isCard ? "p:4 bg:white bc:silver-2 bw:1" : "",
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
    className,
  );

  const indicatorClasses = merge(
    "d:b h:100%",
    INTENTS[intent],
    animated ? "tp:w tdu:500 ttf:io" : "",
  );

  return (
    <Meter.Root className={rootClasses} value={value} min={min} max={max}>
      {hasHeader ? (
        <div className="d:f ai:c g:3">
          <span className="d:f ai:c jc:c fs:0 w:8 h:8 bg:silver-1 c:slate-12">
            {icon}
          </span>
          <div className="d:f fd:c">
            <Meter.Label className="c:slate-10 fs:sm fw:500">
              {label}
            </Meter.Label>
            {description && (
              <span className="c:slate-5 fs:xs">{description}</span>
            )}
          </div>
        </div>
      ) : (
        <div className="d:f jc:sb ai:c">
          <Meter.Label className="c:slate-10 fs:sm fw:500">{label}</Meter.Label>
          <Meter.Value className="c:slate-8 fs:sm" />
        </div>
      )}

      <Meter.Track className="o:h h:2 bg:silver-2">
        <Meter.Indicator className={indicatorClasses} />
      </Meter.Track>

      {hasHeader && <Meter.Value className="d:f jc:fe c:slate-5 fs:xs" />}
    </Meter.Root>
  );
}
