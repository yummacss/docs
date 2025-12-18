import {
  CursorTextIcon,
  HeartStraightIcon,
  InfoIcon,
  MouseScrollIcon,
  ResizeIcon,
  RulerIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type IconName =
  | "cursor_arrow"
  | "cursor_text"
  | "heart"
  | "info"
  | "size"
  | "width";

interface NoteProps {
  icon: IconName;
  children: ReactNode;
}

const iconData: Record<IconName, any> = {
  cursor_arrow: MouseScrollIcon,
  cursor_text: CursorTextIcon,
  heart: HeartStraightIcon,
  info: InfoIcon,
  size: ResizeIcon,
  width: RulerIcon,
};

export default function Note({ icon, children }: NoteProps) {
  const Icon = iconData[icon];

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
        <Icon size={20} weight="duotone" />
      </span>
      <span className="tc-white/80">{children}</span>
    </div>
  );
}
