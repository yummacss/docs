import { ThumbsDown, ThumbsUp } from "iconoir-react";
import Button from "./button";
import Separator from "./separator";

export default function ButtonGroupPill() {
  return (
    <div className="d-f ai-c g-0 p-1 w-fc bg-white bc-silver-2 bw-1 br-9999">
      <Button variant="ghost" size="md" shape="pill" iconOnly>
        <ThumbsUp className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" className="my-1 mx-1" />
      <Button variant="ghost" size="md" shape="pill" iconOnly>
        <ThumbsDown className="w-4 h-4" />
      </Button>
    </div>
  );
}
