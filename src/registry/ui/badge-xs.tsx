"use client";

import { ShieldCheck } from "@gravity-ui/icons";

export default function BadgeXs() {
  return (
    <div className="d-f ai-c g-3">
      <div className="d-f ai-c g-1 px-2 py-0 bg-white bc-silver-2 br-sm bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-0 bg-indigo-1 br-sm">
        <ShieldCheck className="w-3 h-3 c-indigo-7" />
        <span className="c-indigo-7 fs-xs fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-0 bg-indigo c-white br-sm">
        <ShieldCheck className="w-3 h-3" />
        <span className="fs-xs fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-0 bg-red-1 br-sm">
        <span className="w-1 h-1 bg-red-7 br-full" />
        <span className="c-red-7 fs-xs fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-0 bg-red c-white br-sm">
        <span className="w-1 h-1 bg-white br-full" />
        <span className="fs-xs fw-500 us-none">Label</span>
      </div>
    </div>
  );
}