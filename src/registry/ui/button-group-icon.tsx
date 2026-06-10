import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import { Bold, Italic, Underline } from "iconoir-react";

export default function ButtonGroupIcon() {
  return (
    <div className="d-f o-h bc-silver-2 br-md bw-1">
      <Button className="d-f ai-c jc-c w-10 h-10 bg-white c-slate-10 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3">
        <Bold className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" className="w-px bg-silver-3" />
      <Button className="d-f ai-c jc-c w-10 h-10 bg-white c-slate-10 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3">
        <Italic className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" className="w-px bg-silver-3" />
      <Button className="d-f ai-c jc-c w-10 h-10 bg-white c-slate-10 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3">
        <Underline className="w-4 h-4" />
      </Button>
    </div>
  );
}
