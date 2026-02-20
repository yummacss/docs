import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="bg-red c-white br-2 px-2 py-1 fw-600 fs-sm bs-o-xs bw-1 bc-red-7 us-none tp-c tdu-150 ttf-io h:bg-red-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-red-6 c-p b-0">
        Button sm
      </Button>
      <Button className="bg-red c-white br-2 px-3 py-2 fw-600 bs-o-md bw-1 bc-red-7 us-none tp-c tdu-150 ttf-io h:bg-red-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-red-6 c-p b-0">
        Button md
      </Button>
      <Button className="bg-red c-white br-2 px-4 py-3 fw-600 fs-lg bs-o-md bw-1 bc-red-7 us-none tp-c tdu-150 ttf-io h:bg-red-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-red-6 c-p b-0">
        Button lg
      </Button>
    </div>
  );
}
