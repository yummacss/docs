import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="px-2 py-1 bg-transparent bc-indigo c-indigo br-2 bw-1 fw-600 fs-sm tp-c tdu-150 ttf-io us-none c-p h:bg-indigo-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Button sm
      </Button>
      <Button className="px-3 py-2 bg-transparent bc-indigo c-indigo br-2 bw-1 fw-600 tp-c tdu-150 ttf-io us-none c-p h:bg-indigo-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Button md
      </Button>
      <Button className="px-4 py-3 bg-transparent bc-indigo c-indigo br-2 bw-1 fw-600 fs-lg tp-c tdu-150 ttf-io us-none c-p h:bg-indigo-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Button lg
      </Button>
    </div>
  );
}
