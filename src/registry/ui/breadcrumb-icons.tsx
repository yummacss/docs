"use client";

import { Bell, Folder, LayoutDashboard, UsersRound } from "lucide-react";

export default function BreadcrumbIcons() {
  return (
    <nav aria-label="Breadcrumb" className="d-f ai-c g-2">
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <LayoutDashboard className="w-5 h-5" />
        <span className="fs-sm fw-400">Overview</span>
      </a>
      <span className="c-slate-4" aria-hidden="true">
        /
      </span>
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <UsersRound className="w-5 h-5" />
        <span className="fs-sm fw-400">Members</span>
      </a>
      <span className="c-slate-4" aria-hidden="true">
        /
      </span>
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <Folder className="w-5 h-5" />
        <span className="fs-sm fw-400">Files</span>
      </a>
      <span className="c-slate-4" aria-hidden="true">
        /
      </span>
      <a href="#" className="d-f ai-c g-2 c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <Bell className="w-5 h-5" />
        <span className="fs-sm fw-400">Notifications</span>
      </a>
    </nav>
  );
}
