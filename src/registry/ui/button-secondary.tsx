import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="b-0 px-2 py-1 bg-white bc-silver-2 c-slate-10 br-2 bw-1 fw-600 fs-xs bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Button sm
      </Button>
      <Button className="b-0 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-2 bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Button md
      </Button>
      <Button className="b-0 px-4 py-3 bg-white bc-silver-2 c-slate-10 br-2 bw-1 fw-600 fs-lg bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Button lg
      </Button>
    </div>
  );
}
