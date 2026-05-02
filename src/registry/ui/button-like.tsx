"use client";

import { Button } from "@base-ui/react/button";
import { HeartFill } from "@gravity-ui/icons";

export default function ButtonLike() {
  return (
    <Button className="d-if ai-c g-2 px-3 py-2 bg-transparent c-slate-10 br-md bw-0 fw-500 tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-indigo-5">
      <HeartFill className="w-4 h-4 c-red" />
      142
    </Button>
  );
}
