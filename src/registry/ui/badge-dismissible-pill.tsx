"use client";

import { Button } from "@base-ui/react/button";
import { Xmark } from "@gravity-ui/icons";

export default function BadgeDismissiblePill() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-pill bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">Trending</span>
        <Button className="d-f ai-c jc-c w-4 h-4 p-0 bg-transparent c-slate-6 br-pill h:bg-silver-2 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          <Xmark className="w-3 h-3 c-slate-6" />
        </Button>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo-1 br-pill bw-0">
        <span className="c-indigo-7 fs-xs fw-500 us-none">Trending</span>
        <Button className="d-f ai-c jc-c w-4 h-4 p-0 bg-transparent c-slate-6 br-pill h:bg-indigo-2 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          <Xmark className="w-3 h-3 c-indigo-7" />
        </Button>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo c-white br-pill bw-0">
        <span className="fs-xs fw-500 us-none">Trending</span>
        <Button className="d-f ai-c jc-c w-4 h-4 p-0 bg-transparent c-slate-6 br-pill h:bg-indigo-8 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          <Xmark className="w-3 h-3 c-white" />
        </Button>
      </div>
    </div>
  );
}
