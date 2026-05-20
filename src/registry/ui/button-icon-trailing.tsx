import { Button } from "@base-ui/react/button";
import { UserRound } from "lucide-react";

export default function ButtonIconTrailing() {
  return (
    <Button className="d-if ai-c g-2 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-3">
      Add member
      <UserRound className="w-4 h-4" />
    </Button>
  );
}
