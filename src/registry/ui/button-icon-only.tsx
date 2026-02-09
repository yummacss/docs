import { Button } from "@base-ui/react/button";
import { PlusIcon } from "@phosphor-icons/react";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="d-f ai-c jc-c d-8 bg-indigo c-white br-2 bsh-xs bw-1 bc-indigo-7 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0">
        <PlusIcon size={16} weight="bold" />
      </Button>
      <Button className="d-f ai-c jc-c d-10 bg-indigo c-white br-2 bsh-md bw-1 bc-indigo-7 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0">
        <PlusIcon size={20} weight="bold" />
      </Button>
      <Button className="d-f ai-c jc-c d-12 bg-indigo c-white br-2 bsh-md bw-1 bc-indigo-7 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0">
        <PlusIcon size={24} weight="bold" />
      </Button>
    </div>
  );
}
