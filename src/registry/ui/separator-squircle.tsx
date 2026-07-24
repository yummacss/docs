import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import { Plus } from "iconoir-react";

export default function SeparatorSquircle() {
  return (
    <div className="d-f ai-c g-2 w-100%">
      <Separator className="fg-1 h-px bg-silver-2" />
      <Button className="d-if ai-c jc-c w-8 h-8 bg-white bc-silver-2 c-slate-10 br-xxl bw-1 cs-s tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5">
        <Plus className="w-5 h-5" />
      </Button>
      <Separator className="fg-1 h-px bg-silver-2" />
    </div>
  );
}
