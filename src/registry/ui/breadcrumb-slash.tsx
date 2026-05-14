"use client";

import { Folder } from "@gravity-ui/icons";

export default function BreadcrumbSlash() {
  return (
    <nav aria-label="Breadcrumb" className="d-f ai-c g-2">
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10">
        <Folder className="w-5 h-5" />
        <span className="fs-sm fw-400">Settings</span>
      </a>
      <span className="c-slate-4" aria-hidden="true">
        /
      </span>
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10">
        <span className="fs-sm fw-400">Projects</span>
      </a>
      <span className="c-slate-4" aria-hidden="true">
        /
      </span>
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10">
        <span className="fs-sm fw-400">Sprints</span>
      </a>
      <span className="c-slate-4" aria-hidden="true">
        /
      </span>
      <span className="fs-sm fw-500 c-indigo" aria-current="page">
        Sprint 1
      </span>
    </nav>
  );
}
