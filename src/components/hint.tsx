"use client";

import {
  Heart,
  InfoCircle,
  InputField,
  MacOptionKey,
  MouseButtonLeft,
  MouseButtonRight,
  MouseScrollWheel,
  OpenSelectHandGesture,
  Ruler,
  RulerCombine,
  WarningTriangle,
} from "iconoir-react";
import type { ReactNode } from "react";

const icons = {
  cursor_click: OpenSelectHandGesture,
  cursor_text: InputField,
  cursor: OpenSelectHandGesture,
  hand_pointing: OpenSelectHandGesture,
  hand_swipe_right: InputField,
  hand_tap: OpenSelectHandGesture,
  heart: Heart,
  info: InfoCircle,
  keyboard: MacOptionKey,
  mouse_left_click: MouseButtonLeft,
  mouse_right_click: MouseButtonRight,
  mouse_scroll: MouseScrollWheel,
  size: RulerCombine,
  warning: WarningTriangle,
  width: Ruler,
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
      <span className="d-f ai-c fs-0 p-1 bc-border bg-surface c-accent bw-1">
        <Icon className="w-5 h-5" />
      </span>
      <span className="c-white/80">{children}</span>
    </div>
  );
}
