"use client";

import { Check } from "lucide-react";

export default function BadgeIconDot() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-sm bw-1 bs-o-xs">
        <Check className="w-3 h-3 c-green-6" />
        <span className="c-slate-10 fs-xs fw-500 us-none">Success</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-green-1 br-sm bw-0">
        <Check className="w-3 h-3 c-green-7" />
        <span className="c-green-7 fs-xs fw-500 us-none">Success</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-green c-white br-sm bw-0">
        <Check className="w-3 h-3" />
        <span className="fs-xs fw-500 us-none">Success</span>
      </div>
    </div>
  );
}
