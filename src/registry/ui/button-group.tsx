"use client";

import { Button } from "@base-ui/react/button";

export default function ButtonGroup() {
  return (
    <div className="d-f">
      <Button className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 btlr-md bblr-md bw-1 bs-o-xs fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        One
      </Button>
      <Button className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 bxw-0 bw-1 bs-o-xs fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Two
      </Button>
      <Button className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 btrr-md bbrr-md bw-1 bs-o-xs fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Three
      </Button>
    </div>
  );
}