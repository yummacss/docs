import { Bold, Italic, Underline } from "iconoir-react";
import Button from "./button";
import Separator from "./separator";

export default function ButtonGroupIcon() {
  return (
    <div className="d-f o-h bc-silver-2 br-lg bw-1">
      <Button variant="ghost" size="lg" shape="square" iconOnly>
        <Bold className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" />
      <Button variant="ghost" size="lg" shape="square" iconOnly>
        <Italic className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" />
      <Button variant="ghost" size="lg" shape="square" iconOnly>
        <Underline className="w-4 h-4" />
      </Button>
    </div>
  );
}
