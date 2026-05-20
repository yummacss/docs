"use client";

import { Bookmark } from "lucide-react";

export default function BadgeIconPill() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-9999 bw-1 bs-o-xs">
        <Bookmark className="w-3 h-3 c-slate-10" />
        <span className="c-slate-10 fs-xs fw-500 us-none">Saved</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo-1 br-9999 bw-0">
        <Bookmark className="w-3 h-3 c-indigo-7" />
        <span className="c-indigo-7 fs-xs fw-500 us-none">Saved</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo c-white br-9999 bw-0">
        <Bookmark className="w-3 h-3" />
        <span className="fs-xs fw-500 us-none">Saved</span>
      </div>
    </div>
  );
}
