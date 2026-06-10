export default function BreadcrumbSlash() {
  return (
    <nav aria-label="Breadcrumb" className="d-f ai-c g-2">
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-sm fw-400">Home</span>
      </a>
      <span className="c-slate-4" aria-hidden="true">
        /
      </span>
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-sm fw-400">Projects</span>
      </a>
      <span className="c-slate-4" aria-hidden="true">
        /
      </span>
      <a href="#" className="c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
        <span className="fs-sm fw-400">Team</span>
      </a>
      <span className="c-slate-4" aria-hidden="true">
        /
      </span>
      <span className="fs-sm fw-500 c-indigo" aria-current="page">
        Board
      </span>
    </nav>
  );
}
