import { Button } from "@base-ui/react/button";
import { PlusIcon } from "@phosphor-icons/react";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="d-f b-0 ai-c jc-c w-8 h-8 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-2 bw-1 bs-o-xs tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        <PlusIcon size={16} weight="bold" />
      </Button>
      <Button className="d-f b-0 ai-c jc-c w-10 h-10 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-2 bw-1 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        <PlusIcon size={20} weight="bold" />
      </Button>
      <Button className="d-f b-0 ai-c jc-c w-12 h-12 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-2 bw-1 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        <PlusIcon size={24} weight="bold" />
      </Button>
    </div>
  );
}
