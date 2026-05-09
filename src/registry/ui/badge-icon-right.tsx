"use client";

import { StarFill } from "@gravity-ui/icons";

export default function BadgeIconRight() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-sm bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">High Priority</span>
        <StarFill className="w-3 h-3 c-yellow-7" />
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-yellow-1 br-sm bw-0">
        <span className="c-yellow-7 fs-xs fw-500 us-none">High Priority</span>
        <StarFill className="w-3 h-3 c-yellow-7" />
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-yellow c-white br-sm bw-0">
        <span className="fs-xs fw-500 us-none">High Priority</span>
        <StarFill className="w-3 h-3" />
      </div>
    </div>
  );
}
