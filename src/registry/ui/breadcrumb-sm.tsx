import { NavArrowRight } from "iconoir-react";

export default function BreadcrumbSm() {
  return (
    <nav aria-label="Breadcrumb" className="d-f ai-c g-2">
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-xs fw-400">Home</span>
      </a>
      <NavArrowRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-xs fw-400">Projects</span>
      </a>
      <NavArrowRight className="w-4 h-4 c-slate-4" />
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-xs fw-400">Team</span>
      </a>
      <NavArrowRight className="w-4 h-4 c-slate-4" />
      <span className="c-indigo fs-xs fw-500" aria-current="page">
        Board
      </span>
    </nav>
  );
}
