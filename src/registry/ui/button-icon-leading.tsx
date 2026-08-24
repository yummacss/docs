import { UserPlus } from "iconoir-react";
import Button from "./button";

export default function ButtonIconLeading() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <Button variant="primary" icon={<UserPlus className="w-4 h-4" />}>
        Add member
      </Button>
      <Button variant="secondary" icon={<UserPlus className="w-4 h-4" />}>
        Add member
      </Button>
      <Button variant="subtle" icon={<UserPlus className="w-4 h-4" />}>
        Add member
      </Button>
    </div>
  );
}
