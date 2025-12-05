import {
  Mouse,
  TextCursorInput,
  TriangleAlert,
  Heart,
  Info,
  CircleQuestionMark,
  AtSign,
  Scaling,
  RulerDimensionLine,
} from "lucide-react";
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
  cursor_arrow: Mouse,
  cursor_text: TextCursorInput,
  heart: Heart,
  info: Info,
  question_mark_circled: CircleQuestionMark,
  ruler_square: AtSign,
  size: Scaling,
  warning: TriangleAlert,
  width: RulerDimensionLine,
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
