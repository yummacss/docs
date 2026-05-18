"use client";

import { Button } from "@base-ui/react/button";

export default function ButtonGroup() {
  return (
    <div className="d-f">
      <Button className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 btlr-md bblr-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3">
        To Do
      </Button>
      <Button className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 bxw-0 bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3">
        In Progress
      </Button>
      <Button className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 btrr-md bbrr-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3">
        Done
      </Button>
    </div>
  );
}
