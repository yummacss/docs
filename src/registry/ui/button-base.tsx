import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="b-0 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-2 bw-1 fw-600 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Save changes
      </Button>
      <Button className="b-0 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-2 bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Export data
      </Button>
      <Button className="b-0 px-3 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-2 bw-1 fw-600 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-red-6">
        Delete file
      </Button>
    </div>
  );
}
