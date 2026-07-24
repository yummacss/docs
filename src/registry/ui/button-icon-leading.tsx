import { Button } from "@base-ui/react/button";
import { UserPlus } from "iconoir-react";

export default function ButtonIconLeading() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <Button className="d-if ai-c g-2 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-lg bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-3">
        <UserPlus className="w-4 h-4" />
        Add member
      </Button>
      <Button className="d-if ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3">
        <UserPlus className="w-4 h-4" />
        Add member
      </Button>
      <Button className="d-if ai-c g-2 px-3 py-2 bg-silver-1 c-slate-7 br-lg fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-2 fv:oo-2 fv:oc-indigo-3">
        <UserPlus className="w-4 h-4" />
        Add member
      </Button>
    </div>
  );
}
