"use client";

import { Button } from "@base-ui/react/button";
import { Xmark } from "@gravity-ui/icons";

export default function BadgeDismissiblePill() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-pill bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">Label</span>
        <Button
          render={<button className="d-f ai-c jc-c w-4 h-4 bg-transparent c-slate-6 h:bg-silver-2 br-pill fv:ow-2 fv:oo-2 fv:oc-indigo-6" />}
          className="p-0"
        >
          <Xmark className="w-3 h-3 c-slate-6" />
        </Button>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo-1 bc-indigo-2 br-pill bw-1">
        <span className="c-indigo-7 fs-xs fw-500 us-none">Label</span>
        <Button
          render={<button className="d-f ai-c jc-c w-4 h-4 bg-transparent c-indigo-7 h:bg-indigo-2 br-pill fv:ow-2 fv:oo-2 fv:oc-indigo-6" />}
          className="p-0"
        >
          <Xmark className="w-3 h-3 c-indigo-7" />
        </Button>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo c-white br-pill bw-0">
        <span className="fs-xs fw-500 us-none">Label</span>
        <Button
          render={<button className="d-f ai-c jc-c w-4 h-4 bg-transparent c-white h:bg-indigo-8 br-pill fv:ow-2 fv:oo-2 fv:oc-white/50" />}
          className="p-0"
        >
          <Xmark className="w-3 h-3 c-white" />
        </Button>
      </div>
    </div>
  );
}