import {
  ArrowsHorizontalIcon,
  ArrowsVerticalIcon,
  CursorClickIcon,
  CursorIcon,
  CursorTextIcon,
  HandPointingIcon,
  HandSwipeRightIcon,
  HeartStraightIcon,
  InfoIcon,
  MouseScrollIcon,
  ResizeIcon,
  RulerIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type IconName =
  | "arrows_horizontal"
  | "arrows_vertical"
  | "cursor_click"
  | "cursor_text"
  | "cursor"
  | "hand_pointing"
  | "hand_swipe_right"
  | "heart"
  | "info"
  | "mouse_scroll"
  | "size"
  | "width";

interface NoteProps {
  icon: IconName;
  children: ReactNode;
}

const iconData: Record<IconName, any> = {
  arrows_horizontal: ArrowsHorizontalIcon,
  arrows_vertical: ArrowsVerticalIcon,
  cursor_click: CursorClickIcon,
  cursor_text: CursorTextIcon,
  cursor: CursorIcon,
  hand_pointing: HandPointingIcon,
  hand_swipe_right: HandSwipeRightIcon,
  heart: HeartStraightIcon,
  info: InfoIcon,
  mouse_scroll: MouseScrollIcon,
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
