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
        className="ai-c d-f fs-0 p-1 b-1"
        style={{
          backgroundColor: "#21243f",
          borderColor: "#31365e",
          color: "#9aa6ef",
        }}
      >
        <IconComponent />
      </span>
      <span className="tc-white/80">{children}</span>
    </div>
  );
}
