"use client";

import { Sparkles } from "lucide-react";

export default function BadgeIconRightDot() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-sm bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">New</span>
        <Sparkles fill="currentColor" className="w-3 h-3 c-sky-6" />
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-sky-1 br-sm bw-0">
        <span className="c-sky-7 fs-xs fw-500 us-none">New</span>
        <Sparkles fill="currentColor" className="w-3 h-3 c-sky-7" />
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-sky c-white br-sm bw-0">
        <span className="fs-xs fw-500 us-none">New</span>
        <Sparkles fill="currentColor" className="w-3 h-3" />
      </div>
    </div>
  );
}
