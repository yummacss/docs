import {
  MicrophoneIcon,
  PenIcon,
  VideocameraIcon,
} from "@solar-icons/react/bold-duotone";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "fs:xxl",
  md: "fs:3xl",
  lg: "fs:4xl",
};

// each icon arrives in turn, so the eye reads the three words in order
const DELAYS = ["td:200", "td:350", "td:500"];

export interface InlineIconHeadingProps {
  /** Text size of the whole heading; the icons scale with it. */
  size?: Size;
  /**
   * The icons pop in one after another as the heading first renders. Turn it
   * off for a heading that is simply there, or when the user has asked for
   * reduced motion.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

function Word({
  icon,
  index,
  animated,
  children,
}: {
  icon: ReactNode;
  index: number;
  animated: boolean;
  children: ReactNode;
}) {
  return (
    <span className="ws:nw">
      <span
        aria-hidden
        className={`d:ib mr:calc(.18em) c:indigo ${
          animated
            ? `tp:a tdu:500 ttf:out-back @st:s:30 @st:o:0 @st:ro:-20 @prm:tp:none ${DELAYS[index]}`
            : ""
        }`}
      >
        {icon}
      </span>
      {children}
    </span>
  );
}

/**
 * A centered heading whose key words each carry the icon that names them: a
 * pen for written, a camera for filmed, a microphone for recorded.
 */
export default function InlineIconHeading({
  size = "md",
  animated = true,
  className,
}: InlineIconHeadingProps) {
  const icon = "w:calc(.9em) h:calc(.9em)";
  return (
    <h2
      className={merge(
        "m:0 mx:auto max-w:md ta:c tw:b c:slate-10 fw:600 lh:3",
        SIZES[size],
        className,
      )}
    >
      Everything you have{" "}
      <Word icon={<PenIcon className={icon} />} index={0} animated={animated}>
        written,
      </Word>{" "}
      <Word
        icon={<VideocameraIcon className={icon} />}
        index={1}
        animated={animated}
      >
        filmed
      </Word>{" "}
      &amp;{" "}
      <Word
        icon={<MicrophoneIcon className={icon} />}
        index={2}
        animated={animated}
      >
        recorded,
      </Word>{" "}
      kept in one folder.
    </h2>
  );
}
