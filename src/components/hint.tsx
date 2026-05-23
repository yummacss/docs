"use client";

import {
  ArrowsHorizontalIcon,
  ArrowsVerticalIcon,
  CursorTextIcon,
  ExclamationMarkIcon,
  HeartStraightIcon,
  InfoIcon,
  KeyboardIcon,
  MouseLeftClickIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

const icons = {
  arrows_horizontal: ArrowsHorizontalIcon,
  arrows_vertical: ArrowsVerticalIcon,
  cursor_click: MouseLeftClickIcon,
  cursor_text: CursorTextIcon,
  cursor: MouseLeftClickIcon,
  hand_pointing: MouseLeftClickIcon,
  hand_swipe_right: CursorTextIcon,
  hand_tap: MouseLeftClickIcon,
  heart: HeartStraightIcon,
  info: InfoIcon,
  keyboard: KeyboardIcon,
  mouse_left_click: MouseLeftClickIcon,
  mouse_right_click: MouseLeftClickIcon,
  mouse_scroll: MouseLeftClickIcon,
  size: ThumbsUpIcon,
  warning: ExclamationMarkIcon,
  width: ArrowsHorizontalIcon,
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
      <span className="d-f ai-c fs-0 p-1 bc-clay bg-midnight c-periwinkle bw-1">
        <Icon className="w-5 h-5" />
      </span>
      <span className="c-white/80">{children}</span>
    </div>
  );
}
