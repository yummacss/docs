import * as Icons from "@gravity-ui/icons";
import type { ReactNode } from "react";

const icons = {
  arrows_horizontal: Icons.ArrowsExpandHorizontal,
  arrows_vertical: Icons.ArrowsExpandVertical,
  cursor_click: Icons.HandPointUp,
  cursor_text: Icons.FontCursor,
  cursor: Icons.HandPointUp,
  hand_pointing: Icons.HandPointUp,
  hand_swipe_right: Icons.FontCursor,
  hand_tap: Icons.HandPointUp,
  heart: Icons.Heart,
  info: Icons.CircleInfo,
  keyboard: Icons.Keyboard,
  mouse_left_click: Icons.HandPointUp,
  mouse_right_click: Icons.HandPointUp,
  mouse_scroll: Icons.HandPointUp,
  size: Icons.HandOk,
  warning: Icons.TriangleExclamation,
  width: Icons.ArrowsExpandHorizontal,
} as const;

type IconName = keyof typeof icons;

interface Props {
  icon: IconName;
  children: ReactNode;
}

export default function Hint({ icon, children }: Props) {
  const Icon = icons[icon];

  return (
    <div className="d-f ai-c g-2 mb-4">
      <span className="d-f ai-c fs-0 p-1 bc-navy bg-charcoal c-periwinkle bw-1">
        <Icon className="w-5 h-5" />
      </span>
      <span className="c-white/80">{children}</span>
    </div>
  );
}
