"use client";

import { Button } from "@base-ui/react/button";
import { Persons, Plus } from "@gravity-ui/icons";

export default function EmptyStateBase() {
  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8">
      <div className="d-f ai-c jc-c w-10 h-10 bc-silver-3 c-indigo br-lg bw-1 bs-o-xs">
        <Persons className="w-5 h-5" />
      </div>
      <div className="d-f fd-c ai-c g-1 ta-c">
        <span className="c-slate-10 fs-md fw-500">No members found</span>
        <span className="c-slate-6 fs-sm">
          Invite team members to collaborate on projects.
        </span>
      </div>
      <div className="d-f g-3">
        <Button className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
          Learn more
        </Button>
        <Button className="d-if ai-c g-2 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-indigo-5">
          <Plus className="w-4 h-4" />
          Invite users
        </Button>
      </div>
    </div>
  );
}