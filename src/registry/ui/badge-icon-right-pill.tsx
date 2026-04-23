"use client";

import { Flame } from "@gravity-ui/icons";

export default function BadgeIconRightPill() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-pill bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">Hot Deal</span>
        <Flame className="w-3 h-3 c-slate-10" />
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-orange-1 br-pill bw-0">
        <span className="c-orange-7 fs-xs fw-500 us-none">Hot Deal</span>
        <Flame className="w-3 h-3 c-orange-7" />
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-orange c-white br-pill bw-0">
        <span className="fs-xs fw-500 us-none">Hot Deal</span>
        <Flame className="w-3 h-3" />
      </div>
    </div>
  );
}