import { UserPlus } from "iconoir-react";
import Button from "./button";

export default function ButtonIconLeading() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <Button variant="primary">
        <UserPlus className="w-4 h-4" />
        Add member
      </Button>
      <Button variant="secondary">
        <UserPlus className="w-4 h-4" />
        Add member
      </Button>
      <Button variant="subtle">
        <UserPlus className="w-4 h-4" />
        Add member
      </Button>
    </div>
  );
}
