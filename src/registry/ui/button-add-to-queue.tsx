"use client";

import { Button } from "@base-ui/react/button";
import { BarsPlay } from "@gravity-ui/icons";

export default function ButtonAddToQueue() {
  return (
    <Button className="d-if ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
      <BarsPlay className="w-4 h-4" />
      Add to Queue
    </Button>
  );
}