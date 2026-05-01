"use client";

import { ChevronRight, House } from "@gravity-ui/icons";

export default function BreadcrumbBase() {
  return (
    <nav aria-label="Breadcrumb" className="d-f ai-c g-2">
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10">
        <House className="w-5 h-5" />
        <span className="fs-sm fw-400">Home</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10">
        <span className="fs-sm fw-400">Settings</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10">
        <span className="fs-sm fw-400">Billing</span>
      </a>
      <ChevronRight className="w-4 h-4 c-slate-4" />
      <span className="fs-sm fw-500 c-indigo" aria-current="page">
        Subscription
      </span>
    </nav>
  );
}
