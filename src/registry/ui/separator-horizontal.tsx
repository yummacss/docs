import { Separator } from "@base-ui/react/separator";

export default function SeparatorHorizontal() {
  return (
    <div className="d-f fd-c g-3 w-full">
      <div className="d-f fd-c g-2">
        <span className="c-slate-10 fs-sm fw-500">Project Details</span>
        <span className="c-slate-8 fs-xs">
          Configure your project settings and team access.
        </span>
      </div>
      <Separator className="h-px w-full bg-silver-2" />
      <div className="d-f fd-c g-2">
        <span className="c-slate-10 fs-sm fw-500">Team Members</span>
        <span className="c-slate-8 fs-xs">
          Manage who has access to this project.
        </span>
      </div>
    </div>
  );
}
