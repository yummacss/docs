import {
  CursorArrowIcon,
  CursorTextIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  InfoCircledIcon,
  QuestionMarkCircledIcon,
  RulerSquareIcon,
  SizeIcon,
  WidthIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";

type IconName =
  | "cursor_arrow"
  | "cursor_text"
  | "heart"
  | "info"
  | "question_mark_circled"
  | "ruler_square"
  | "size"
  | "warning"
  | "width";

interface NoteProps {
  icon: IconName;
  children: ReactNode;
}

const iconComponents: Record<IconName, React.ComponentType> = {
  cursor_arrow: CursorArrowIcon,
  cursor_text: CursorTextIcon,
  heart: HeartIcon,
  info: InfoCircledIcon,
  question_mark_circled: QuestionMarkCircledIcon,
  ruler_square: RulerSquareIcon,
  size: SizeIcon,
  warning: ExclamationTriangleIcon,
  width: WidthIcon,
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
