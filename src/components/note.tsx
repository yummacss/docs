import {
  Alert02Icon,
  AlertCircleIcon,
  ArrowExpand01Icon,
  AtIcon,
  HeartCheckIcon,
  HelpCircleIcon,
  Mouse14Icon,
  RulerIcon,
  TypeCursorIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";

type IconName = "cursor_arrow" | "cursor_text" | "heart" | "info" | "question_mark_circled" | "ruler_square" | "size" | "warning" | "width";

interface NoteProps {
  icon: IconName;
  children: ReactNode;
}

const iconData: Record<IconName, any> = {
  cursor_arrow: Mouse14Icon,
  cursor_text: TypeCursorIcon,
  heart: HeartCheckIcon,
  info: AlertCircleIcon,
  question_mark_circled: HelpCircleIcon,
  ruler_square: AtIcon,
  size: ArrowExpand01Icon,
  warning: Alert02Icon,
  width: RulerIcon,
};

export default function Note({ icon, children }: NoteProps) {
  const iconDataForIcon = iconData[icon];

  return (
    <div className="ai-c d-f g-2 mb-4">
      <span
        className="ai-c d-f fs-0 p-1 b-1"
        style={{
          backgroundColor: "#21243f",
          borderColor: "#31365e",
          color: "#9aa6ef",
        }}
      >
        <HugeiconsIcon icon={iconDataForIcon} />
      </span>
      <span className="tc-white/80">{children}</span>
    </div>
  );
}
