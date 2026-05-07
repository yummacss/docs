"use client";

import { Button } from "@base-ui/react/button";
import { Plus } from "@gravity-ui/icons";

export default function ButtonIconOnlyCircular() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <Button className="d-if ai-c g-2 w-10 h-10 bg-indigo h:bg-indigo-8 h:bg-indigo-1/50 bc-indigo-7 c-white br-pill bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        <Plus className="w-4 h-4" />
      </Button>
      <Button className="d-if ai-c g-2 w-10 h-10 bg-white bc-silver-2 c-slate-10 br-pill bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        <Plus className="w-4 h-4" />
      </Button>
      <Button className="d-if ai-c g-2 w-10 h-10 bg-silver-1 c-slate-7 br-pill fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-2 h:bg-red-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}