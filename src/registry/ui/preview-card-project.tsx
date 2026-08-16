import PreviewCard from "./preview-card";

export default function PreviewCardProject() {
  return (
    <p className="m-0 c-slate-10 fs-sm">
      View{" "}
      <PreviewCard trigger="Acme Website">
        <div className="d-f fd-c g-1">
          <span className="c-slate-10 fs-md fw-500">Acme Website</span>
        </div>
        <p className="m-0 c-slate-8 fs-xs lh-4">
          Main company website redesign with modern UI components.
        </p>
        <div className="d-f ai-c g-2">
          <span className="c-slate-6 fs-xs">8 team members</span>
          <span className="c-slate-4 fs-xs">·</span>
          <span className="c-slate-6 fs-xs">12 tasks</span>
        </div>
      </PreviewCard>{" "}
      project details.
    </p>
  );
}
