import { Button } from "@base-ui/react/button";
import { TrashIcon } from "@phosphor-icons/react";

export default function ButtonDestructive() {
  return (
    <Button className="ai-c d-f jc-c g-2 px-3 py-2 br-0 fs-md fw-600 lh-1 bg-red c-white h:bg-red-7 f:oc-red-2 f:os-s f:ow-2">
      <TrashIcon size={16} aria-hidden="true" />
      <span>Delete</span>
    </Button>
  );
}
