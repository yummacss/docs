import { Button } from "@base-ui/react/button";
import { DownloadIcon } from "@phosphor-icons/react";

export default function ExampleButton() {
  return (
    <Button className="d-f b-0 ai-c g-2 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-600 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
      <DownloadIcon size={16} weight="bold" />
      Download file
    </Button>
  );
}
