import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import { Plus } from "@gravity-ui/icons";

export default function SeparatorIconCircle() {
  return (
    <div className="d-f ai-c g-2 w-full">
      <Separator className="h-px fg-1 bg-silver-2" />
      <Button className="d-if ai-c jc-c w-8 h-8 bg-white bc-silver-2 c-slate-10 br-pill bw-1 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        <Plus className="w-5 h-5" />
      </Button>
      <Separator className="h-px fg-1 bg-silver-2" />
    </div>
  );
}
