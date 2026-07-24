import { Button } from "@base-ui/react/button";

export default function ButtonLg() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="d-if ai-c px-4 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-lg bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-3">
        Label
      </Button>
      <Button className="d-if ai-c px-4 py-2 bg-white bc-silver-3 c-slate-10 br-lg bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1 fv:oo-2 fv:oc-indigo-3">
        Label
      </Button>
      <Button className="d-if ai-c px-4 py-2 bg-slate-1 c-slate-10 br-lg bw-0 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-2 fv:oo-2 fv:oc-indigo-3">
        Label
      </Button>
      <Button className="d-if ai-c px-4 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-lg bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-red-5">
        Label
      </Button>
    </div>
  );
}
