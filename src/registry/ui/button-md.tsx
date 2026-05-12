import { Button } from "@base-ui/react/button";

export default function ButtonMd() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="d-if ai-c px-3 py-1 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-sm bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        Label
      </Button>
      <Button className="d-if ai-c px-3 py-1 bg-white bc-silver-3 c-slate-10 br-sm bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        Label
      </Button>
      <Button className="d-if ai-c px-3 py-1 bg-slate-1 c-slate-10 br-sm bw-0 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-2 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        Label
      </Button>
      <Button className="d-if ai-c px-3 py-1 bg-red h:bg-red-8 bc-red-7 c-white br-sm bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-red-5">
        Label
      </Button>
    </div>
  );
}
