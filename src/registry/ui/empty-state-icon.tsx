import { FolderMinus } from "iconoir-react";

export default function EmptyStateIcon() {
  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8">
      <div className="d-f ai-c jc-c w-10 h-10 bc-silver-3 c-indigo br-md bw-1 bs-o-xs">
        <FolderMinus className="w-5 h-5" />
      </div>
      <div className="d-f fd-c ai-c g-1 ta-c">
        <span className="c-slate-10 fs-md fw-500">No projects yet</span>
        <span className="c-slate-6 fs-sm">
          Create your first project to get started.
        </span>
      </div>
    </div>
  );
}
