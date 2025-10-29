import {
  CursorArrowIcon,
  CursorTextIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  InfoCircledIcon,
  RulerSquareIcon,
  SizeIcon,
  WidthIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";

type IconName =
  | "ruler_square"
  | "cursor_arrow"
  | "info"
  | "warning"
  | "size"
  | "width"
  | "heart"
  | "cursor_text";

interface NoteProps {
  icon: IconName;
  children: ReactNode;
}

const iconComponents: Record<IconName, React.ComponentType> = {
  ruler_square: RulerSquareIcon,
  cursor_arrow: CursorArrowIcon,
  info: InfoCircledIcon,
  warning: ExclamationTriangleIcon,
  size: SizeIcon,
  width: WidthIcon,
  heart: HeartIcon,
  cursor_text: CursorTextIcon,
};

export default function Note({ icon, children }: NoteProps) {
  const IconComponent = iconComponents[icon];

  return (
    <div className="ai-c d-f g-2 mb-4">
      <span
        className="ai-c d-f h-fc fs-0 p-1 rad-1 b-1"
        style={{
          backgroundColor: "rgba(190, 198, 242, 0.1)",
          borderColor: "rgba(190, 198, 242, 0.3)",
          color: "#bec6f2",
          flexShrink: 0,
        }}
      >
        <IconComponent />
      </span>
      <span className="tc-white/80">{children}</span>
    </div>
  );
}
