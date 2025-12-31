import type { Icon } from "@phosphor-icons/react";
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
  MouseLeftClickIcon,
  MouseRightClickIcon,
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
  | "mouse_left_click"
  | "mouse_right_click"
  | "mouse_scroll"
  | "size"
  | "width";

interface NoteProps {
  icon: IconName;
  children: ReactNode;
}

const iconData: Record<IconName, Icon> = {
  arrows_horizontal: ArrowsHorizontalIcon,
  arrows_vertical: ArrowsVerticalIcon,
  cursor_click: CursorClickIcon,
  cursor_text: CursorTextIcon,
  cursor: CursorIcon,
  hand_pointing: HandPointingIcon,
  hand_swipe_right: HandSwipeRightIcon,
  heart: HeartStraightIcon,
  info: InfoIcon,
  mouse_left_click: MouseLeftClickIcon,
  mouse_right_click: MouseRightClickIcon,
  mouse_scroll: MouseScrollIcon,
  size: ResizeIcon,
  width: RulerIcon,
};

export default function Note({ icon, children }: NoteProps) {
  const Icon = iconData[icon];

  return (
    <div className="ai-c d-f g-2 mb-4">
      <span
        className="ai-c d-f fs-0 p-1 bw-1"
        style={{
          backgroundColor: "#21243f",
          borderColor: "#31365e",
          color: "#9aa6ef",
        }}
      >
        <Icon size={24} weight="duotone" />
      </span>
      <span className="c-white/80">{children}</span>
    </div>
  );
}
