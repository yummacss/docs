import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import { ThumbsDown, ThumbsUp } from "iconoir-react";

export default function ButtonGroupPill() {
  return (
    <div className="d-f ai-c g-0 p-1 w-fc bg-white bc-silver-2 bw-1 br-9999">
      <Button className="d-f ai-c jc-c w-8 h-8 p-0 bg-transparent c-slate-10 bw-0 br-9999 c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5">
        <ThumbsUp className="w-4 h-4" />
      </Button>
      <Separator
        orientation="vertical"
        className="my-1 mx-1 h-5 w-px bg-silver-3"
      />
      <Button className="d-f ai-c jc-c w-8 h-8 p-0 bg-transparent c-slate-10 bw-0 br-9999 c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5">
        <ThumbsDown className="w-4 h-4" />
      </Button>
    </div>
  );
}
