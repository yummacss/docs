"use client";

import { ChevronRight, LayoutDashboard } from "iconoir-react";

export default function BreadcrumbIconLeading() {
  return (
    <nav aria-label="Breadcrumb" className="d-f ai-c g-2">
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <LayoutDashboard className="w-5 h-5" />
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-sm fw-400">Projects</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-sm fw-400">Team</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <span className="c-indigo fs-sm fw-500" aria-current="page">
        Board
      </span>
    </nav>
  );
}
