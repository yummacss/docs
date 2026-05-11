"use client";

import { ShieldCheck } from "@gravity-ui/icons";

export default function BadgeLg() {
  return (
    <div className="d-f ai-c g-3">
      <div className="d-f ai-c g-1 px-3 py-1 bg-white bc-silver-2 br-sm bw-1 bs-o-xs">
        <span className="c-slate-10 fs-md fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-3 py-1 bg-indigo-1 br-sm">
        <ShieldCheck className="w-4 h-4 c-indigo-7" />
        <span className="c-indigo-7 fs-md fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-3 py-1 bg-indigo c-white br-sm">
        <ShieldCheck className="w-4 h-4" />
        <span className="fs-md fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-3 py-1 bg-red-1 br-sm">
        <span className="w-2 h-2 bg-red-7 br-full" />
        <span className="c-red-7 fs-md fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-3 py-1 bg-red c-white br-sm">
        <span className="w-2 h-2 bg-white br-full" />
        <span className="fs-md fw-500 us-none">Label</span>
      </div>
    </div>
  );
}
