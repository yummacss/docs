import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button className="bg-indigo c-white br-2 px-3 py-2 fw-600 bsh-md bw-1 bc-indigo-7 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0">
        Save changes
      </Button>
      <Button className="bg-white c-slate-10 br-2 px-3 py-2 fw-600 bsh-xs bw-1 bc-silver-2 us-none tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0">
        Export data
      </Button>
      <Button className="bg-red c-white br-2 px-3 py-2 fw-600 bsh-md bw-1 bc-red-7 us-none tp-c tdu-150 ttf-io h:bg-red-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-red-6 c-p b-0">
        Delete file
      </Button>
    </div>
  );
}
