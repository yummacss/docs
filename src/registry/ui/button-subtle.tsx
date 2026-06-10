import { Button } from "@base-ui/react/button";
import { Plus } from "iconoir-react";

export default function ButtonSubtle() {
  return (
    <Button className="d-if ai-c g-2 px-3 py-2 bg-silver-1 c-slate-7 br-md fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-2 h:bg-red-1/50 fv:oo-2 fv:oc-indigo-3">
      <Plus className="w-4 h-4" />
      New task
    </Button>
  );
}
