import { Button } from "@base-ui/react/button";
import { DownloadIcon } from "@phosphor-icons/react";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="d-f ai-c g-2 bg-indigo c-white br-2 px-2 py-1 fw-600 fs-sm bs-o-xs bw-1 bc-indigo-7 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0">
        <DownloadIcon size={14} weight="bold" />
        Button sm
      </Button>
      <Button className="d-f ai-c g-2 bg-indigo c-white br-2 px-3 py-2 fw-600 bs-o-md bw-1 bc-indigo-7 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0">
        <DownloadIcon size={16} weight="bold" />
        Button md
      </Button>
      <Button className="d-f ai-c g-2 bg-indigo c-white br-2 px-4 py-3 fw-600 fs-lg bs-o-md bw-1 bc-indigo-7 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0">
        <DownloadIcon size={18} weight="bold" />
        Button lg
      </Button>
    </div>
  );
}
