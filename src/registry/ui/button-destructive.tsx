import { Button } from "@base-ui/react/button";
import { TrashIcon } from "@phosphor-icons/react";

export default function ButtonDestructive() {
  return (
    <Button className="d-f ai-c jc-c g-2 px-3 py-2 br-0 bg-red fs-md fw-600 lh-1 c-white h:bg-red-7 f:os-s f:ow-2 f:oc-red-2">
      <TrashIcon size={16} aria-hidden="true" />
      <span>Delete</span>
    </Button>
  );
}
