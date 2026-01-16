import { Button } from "@base-ui/react/button";

export default function CtaSectionColored() {
  return (
    <div className="py-6 px-6 d-f ai-c jc-sb fw-w g-4 bg-indigo-8">
      <h2 className="ff-s fs-3xl fw-600 c-white m-0">Start for free today!</h2>
      <div className="d-f g-3">
        <Button className="d-f h-10 ai-c jc-c br-1 bg-white px-4 fs-sm fw-500 c-indigo-8 us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-white">
          Start free trial
        </Button>
        <Button className="d-f h-10 ai-c jc-c bw-1 bc-white/30 br-1 bg-transparent px-4 fs-sm fw-500 c-white us-none h:bg-white/10 fv:os-s fv:ow-2 fv:oo--1 fv:oc-white/30">
          Pricings
        </Button>
      </div>
    </div>
  );
}
