"use client";

import { Button } from "@base-ui/react/button";
import {
  ArrowsExpandHorizontal,
  ArrowDownToLine,
  FolderPlus,
} from "@gravity-ui/icons";

export default function ButtonGroupIcon() {
  return (
    <div className="d-f">
      <Button className="d-if ai-c jc-c w-10 h-10 bg-white bc-silver-2 c-slate-10 btlr-md bblr-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        <FolderPlus className="w-4 h-4" />
      </Button>
      <Button className="d-if ai-c jc-c w-10 h-10 bg-white bc-silver-2 c-slate-10 bxw-0 bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        <ArrowDownToLine className="w-4 h-4" />
      </Button>
      <Button className="d-if ai-c jc-c w-10 h-10 bg-white bc-silver-2 c-slate-10 btrr-md bbrr-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        <ArrowsExpandHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
}
