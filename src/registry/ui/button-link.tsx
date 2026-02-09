import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="bg-transparent c-indigo br-0 px-0 py-0 fw-600 fs-sm bw-0 us-none tp-c tdu-150 ttf-io h:c-indigo-8 td-u fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p">
        Button sm
      </Button>
      <Button className="bg-transparent c-indigo br-0 px-0 py-0 fw-600 bw-0 us-none tp-c tdu-150 ttf-io h:c-indigo-8 td-u fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p">
        Button md
      </Button>
      <Button className="bg-transparent c-indigo br-0 px-0 py-0 fw-600 fs-lg bw-0 us-none tp-c tdu-150 ttf-io h:c-indigo-8 td-u fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p">
        Button lg
      </Button>
    </div>
  );
}
