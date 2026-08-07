import { UserPlus } from "iconoir-react";
import Button from "./button";

export default function ButtonIconTrailing() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <Button variant="primary">
        Add member
        <UserPlus className="w-4 h-4" />
      </Button>
      <Button variant="secondary">
        Add member
        <UserPlus className="w-4 h-4" />
      </Button>
      <Button variant="subtle">
        Add member
        <UserPlus className="w-4 h-4" />
      </Button>
    </div>
  );
}
