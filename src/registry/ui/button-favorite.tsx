import { StarSolid } from "iconoir-react";
import Button from "./button";

export default function ButtonStar() {
  return (
    <Button variant="ghost">
      <StarSolid className="w-4 h-4 c-yellow-5" />
      24
    </Button>
  );
}
