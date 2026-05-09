import { Button } from "@base-ui/react/button";
import { Persons } from "@gravity-ui/icons";

export default function ButtonIcon() {
  return (
    <Button className="d-if ai-c g-2 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:ow-2 fv:oo-2 fv:oc-indigo-5">
      <Persons className="w-4 h-4" />
      Create project
    </Button>
  );
}
