import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";

export default function ButtonGroup() {
  return (
    <div className="d-f br-lg o-h bw-1 bc-silver-2">
      <Button
        className="d-f ai-c px-3 py-2 bg-white c-slate-10 fw-500 fs-sm tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3 jc-c"
        style={{ flex: 1 }}
      >
        Day
      </Button>
      <Separator orientation="vertical" className=" w-px bg-silver-3" />
      <Button
        className="d-f ai-c px-3 py-2 bg-white c-slate-10 fw-500 fs-sm tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3 jc-c"
        style={{ flex: 1 }}
      >
        Month
      </Button>
      <Separator orientation="vertical" className=" w-px bg-silver-3" />
      <Button
        className="d-f ai-c px-3 py-2 bg-white c-slate-10 fw-500 fs-sm tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3 jc-c"
        style={{ flex: 1 }}
      >
        Year
      </Button>
    </div>
  );
}
