import { Avatar } from "@base-ui/react/avatar";
import { CheckCircle, User } from "iconoir-react";

type Size = "sm" | "md" | "lg";
type Shape = "circle" | "square" | "squircle";
type Status = "none" | "online" | "offline" | "busy";

// Plain lookups rather than cva: a copied component should not drag a class
// utility into your package.json to do what an object literal already does.
const ROOT = "d-if o-h ai-c jc-c bg-silver-1 bc-white bw-1 va-m us-none";

const SIZES: Record<Size, string> = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-14 h-14",
};

const INITIAL_SIZES: Record<Size, string> = {
  sm: "fs-xs",
  md: "fs-md",
  lg: "fs-lg",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-7 h-7",
};

// The badge tracks the avatar so it stays legible, but stops growing at md: a
// status dot large enough to read is already large enough at every size above.
const BADGE_SIZES: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-4 h-4",
};

const SHAPES: Record<Shape, string> = {
  circle: "br-9999",
  square: "br-0",
  squircle: "br-xxl cs-s",
};

const STATUSES: Record<Exclude<Status, "none">, string> = {
  online: "bg-green-6",
  offline: "bg-slate-4",
  busy: "bg-red-6",
};

export interface AvatarProps {
  src?: string;
  /** Alt text, and the source of the initials shown when there is no image. */
  name?: string;
  size?: Size;
  shape?: Shape;
  /** A presence dot, bottom right. */
  status?: Status;
  /** A verification check, top right, so it never collides with `status`. */
  verified?: boolean;
  className?: string;
}

export default function AvatarBase({
  src,
  name,
  size = "md",
  shape = "circle",
  status = "none",
  verified = false,
  className,
}: AvatarProps) {
  const classes = [ROOT, SIZES[size], SHAPES[shape], className]
    .filter(Boolean)
    .join(" ");

  return (
    // The root clips its children, so the badges have to sit outside it.
    <span className="d-if p-r va-m">
      <Avatar.Root className={classes}>
        {src && (
          <Avatar.Image
            src={src}
            alt={name ?? ""}
            className="of-c w-100% h-100%"
          />
        )}
        <Avatar.Fallback
          className={`d-f ai-c jc-c w-100% h-100% c-slate-9 fw-500 ${INITIAL_SIZES[size]}`}
        >
          {name ? initials(name) : <User className={ICON_SIZES[size]} />}
        </Avatar.Fallback>
      </Avatar.Root>

      {status !== "none" && (
        <span
          role="img"
          aria-label={status}
          className={`p-a b-0 r-0 bc-white br-9999 bw-2 ${BADGE_SIZES[size]} ${STATUSES[status]}`}
        />
      )}

      {verified && (
        <span
          role="img"
          aria-label="Verified"
          className={`d-f p-a t-0 r-0 ai-c jc-c bg-white bc-white br-9999 bw-1 ${BADGE_SIZES[size]}`}
        >
          <CheckCircle className="w-100% h-100% c-indigo" />
        </span>
      )}
    </span>
  );
}

/** "Ada Lovelace" -> "AL". Two letters at most; more stops fitting. */
function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
