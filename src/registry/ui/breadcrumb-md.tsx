import { NavArrowRight } from "iconoir-react";

export default function BreadcrumbMd() {
  return (
    <nav aria-label="Breadcrumb" className="d-f ai-c g-2">
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-sm fw-400">Dashboard</span>
      </a>
      <NavArrowRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-sm fw-400">Sprints</span>
      </a>
      <NavArrowRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-sm fw-400">Backlog</span>
      </a>
      <NavArrowRight className="w-4 h-4 c-slate-4" />
      <span className="c-indigo fs-sm fw-500" aria-current="page">
        Task #142
      </span>
    </nav>
  );
}
