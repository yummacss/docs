import { Collapsible } from "@base-ui/react/collapsible";
import { Lock } from "iconoir-react";

export default function CollapsibleDisabled() {
  return (
    <Collapsible.Root disabled className="d-f fd-c w-72 c-slate-10 o-50">
      <Collapsible.Trigger className="d-f ai-c jc-sb g-3 w-100% py-3 px-3 bg-white bc-silver-3 bbw-1 ta-l c-na">
        <span className="c-slate-6 fs-sm fw-500">Sprint 1 - Q1 2025</span>
        <Lock className="w-3 h-3 c-slate-5" />
      </Collapsible.Trigger>

      <Collapsible.Panel className="d-b o-h h-auto">
        <div className="d-f fd-c g-3 px-3 py-3">
          {milestones.map((milestone) => (
            <div key={milestone.name} className="d-f ai-c jc-sb">
              <div className="d-f fd-c g-0">
                <span className="c-slate-6 fs-sm">{milestone.name}</span>
                <span className="c-slate-5 fs-xs">{milestone.date}</span>
              </div>
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const milestones = [
  { name: "Backlog refinement", date: "Mar 5" },
  { name: "Feature freeze", date: "Mar 10" },
  { name: "QA review", date: "Mar 12" },
  { name: "Production release", date: "Mar 14" },
];
