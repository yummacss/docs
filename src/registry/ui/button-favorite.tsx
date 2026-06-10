import { Button } from "@base-ui/react/button";
import { StarSolid } from "iconoir-react";

export default function ButtonStar() {
  return (
    <Button className="d-if ai-c g-2 px-3 py-2 bg-transparent c-slate-10 br-md bw-0 fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-3">
      <StarSolid className="w-4 h-4 c-yellow-5" />
      24
    </Button>
  );
}
