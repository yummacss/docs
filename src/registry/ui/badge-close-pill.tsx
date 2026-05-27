"use client";

import { Button } from "@base-ui/react/button";
import { X } from "iconoir-react";

export default function BadgeClosePill() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-9999 bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">Blocked</span>
        <Button className="d-f ai-c jc-c w-4 h-4 p-0 bg-transparent c-slate-6 br-9999 h:bg-silver-2 fv:oo-2 fv:oc-indigo-5">
          <X className="w-3 h-3 c-slate-6" />
        </Button>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo-1 br-9999 bw-0">
        <span className="c-indigo-7 fs-xs fw-500 us-none">Blocked</span>
        <Button className="d-f ai-c jc-c w-4 h-4 p-0 bg-transparent c-slate-6 br-9999 h:bg-indigo-2 fv:oo-2 fv:oc-indigo-5">
          <X className="w-3 h-3 c-indigo-7" />
        </Button>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo c-white br-9999 bw-0">
        <span className="fs-xs fw-500 us-none">Blocked</span>
        <Button className="d-f ai-c jc-c w-4 h-4 p-0 bg-transparent c-slate-6 br-9999 h:bg-indigo-8 fv:oo-2 fv:oc-indigo-5">
          <X className="w-3 h-3 c-white" />
        </Button>
      </div>
    </div>
  );
}
