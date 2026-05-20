"use client";

import { ChevronRight } from "lucide-react";

export default function BreadcrumbSquircle() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="d-f ai-c g-2 px-3 py-2 bg-white bc-silver-2 br-xxl cs-s bw-1 bs-o-xs"
    >
      <a href="#" className="c-slate-6 h:c-slate-10">
        <span className="fs-sm fw-400">Home</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="c-slate-6 h:c-slate-10">
        <span className="fs-sm fw-400">Projects</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="c-slate-6 h:c-slate-10">
        <span className="fs-sm fw-400">Team</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <span className="c-indigo fs-sm fw-500" aria-current="page">
        Board
      </span>
    </nav>
  );
}
