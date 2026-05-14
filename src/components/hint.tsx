"use client";

import * as Icons from "@phosphor-icons/react";
import type { ReactNode } from "react";

const icons = {
  arrows_horizontal: Icons.ArrowsHorizontalIcon,
  arrows_vertical: Icons.ArrowsVerticalIcon,
  cursor_click: Icons.MouseLeftClickIcon,
  cursor_text: Icons.CursorTextIcon,
  cursor: Icons.MouseLeftClickIcon,
  hand_pointing: Icons.MouseLeftClickIcon,
  hand_swipe_right: Icons.CursorTextIcon,
  hand_tap: Icons.MouseLeftClickIcon,
  heart: Icons.HeartStraightIcon,
  info: Icons.InfoIcon,
  keyboard: Icons.KeyboardIcon,
  mouse_left_click: Icons.MouseLeftClickIcon,
  mouse_right_click: Icons.MouseLeftClickIcon,
  mouse_scroll: Icons.MouseLeftClickIcon,
  size: Icons.ThumbsUpIcon,
  warning: Icons.ExclamationMarkIcon,
  width: Icons.ArrowsHorizontalIcon,
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
