import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="px-0 py-0 bg-transparent c-indigo h:c-indigo-8 br-0 bw-0 fw-600 fs-xs td-u tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Button sm
      </Button>
      <Button className="px-0 py-0 bg-transparent c-indigo h:c-indigo-8 br-0 bw-0 fw-600 fs-md td-u tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Button md
      </Button>
      <Button className="px-0 py-0 bg-transparent c-indigo h:c-indigo-8 br-0 bw-0 fw-600 fs-lg td-u tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Button lg
      </Button>
    </div>
  );
}
