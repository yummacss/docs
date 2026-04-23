"use client";

import { ChevronRight, Ellipsis, House } from "@gravity-ui/icons";

export default function BreadcrumbEllipsis() {
  return (
    <nav aria-label="Breadcrumb" className="d-f ai-c g-2">
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10">
        <House className="w-5 h-5" />
        <span className="fs-sm fw-400">Dashboard</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <span className="d-f ai-c g-2 c-slate-6">
        <Ellipsis className="w-5 h-5" />
      </span>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10">
        <span className="fs-sm fw-400">Components</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <span className="c-indigo fs-sm fw-500" aria-current="page">
        Badge
      </span>
    </nav>
  );
}
