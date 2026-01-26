import { Button } from "@base-ui/react/button";

export default function CtaSectionBasic() {
  return (
    <div className="py-6 px-6 d-f ai-c jc-sb fw-w g-4">
      <h2 className="fs-3xl fw-600 c-slate-10 m-0">Ready to get started?</h2>
      <div className="d-f g-3">
        <Button className="d-f h-10 ai-c jc-c bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-sm fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
          Get started
        </Button>
        <Button className="d-f h-10 ai-c jc-c bw-1 bc-silver-4 br-1 bg-white px-4 fs-sm fw-500 c-slate us-none h:bg-silver-1 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
          Learn more
        </Button>
      </div>
    </div>
  );
}
