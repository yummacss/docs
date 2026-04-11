import { Button } from "@base-ui/react/button";
import { Plus } from "@gravity-ui/icons";

export default function ButtonIconOnly() {
  return (
    <Button className="d-if ai-c jc-c w-10 h-10 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
      <Plus className="w-5 h-5" />
    </Button>
  );
}
