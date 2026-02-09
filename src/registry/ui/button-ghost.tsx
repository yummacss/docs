import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="bg-transparent c-slate-10 br-2 px-2 py-1 fw-600 fs-sm bw-0 us-none tp-c tdu-150 ttf-io h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p">
        Button sm
      </Button>
      <Button className="bg-transparent c-slate-10 br-2 px-3 py-2 fw-600 bw-0 us-none tp-c tdu-150 ttf-io h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p">
        Button md
      </Button>
      <Button className="bg-transparent c-slate-10 br-2 px-4 py-3 fw-600 fs-lg bw-0 us-none tp-c tdu-150 ttf-io h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p">
        Button lg
      </Button>
    </div>
  );
}
