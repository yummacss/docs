import * as Icons from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

const icons = {
  arrows_horizontal: Icons.ArrowsHorizontalIcon,
  arrows_vertical: Icons.ArrowsVerticalIcon,
  cursor_click: Icons.CursorClickIcon,
  cursor_text: Icons.CursorTextIcon,
  cursor: Icons.CursorIcon,
  hand_pointing: Icons.HandPointingIcon,
  hand_swipe_right: Icons.HandSwipeRightIcon,
  hand_tap: Icons.HandTapIcon,
  heart: Icons.HeartIcon,
  info: Icons.InfoIcon,
  keyboard: Icons.KeyboardIcon,
  mouse_left_click: Icons.MouseLeftClickIcon,
  mouse_right_click: Icons.MouseRightClickIcon,
  mouse_scroll: Icons.MouseScrollIcon,
  size: Icons.ResizeIcon,
  warning: Icons.WarningIcon,
  width: Icons.RulerIcon,
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
      <span
        className="d-f ai-c fs-0 p-1 bw-1 br-1 bg-charcoal bc-navy"
        style={{
          color: "#9aa6ef",
        }}
      >
        <Icon size={20} weight="duotone" />
      </span>
      <span className="c-white/80">{children}</span>
    </div>
  );
}
