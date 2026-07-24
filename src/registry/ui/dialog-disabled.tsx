import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";

export default function DialogDisabled() {
  return (
    <Dialog.Root disabled>
      <Dialog.Trigger
        render={
          <Button className="bg-white px-3 py-2 bc-silver-2 c-slate-4 br-lg bw-1 fw-500 o-50 us-none c-na" />
        }
      >
        Request access
      </Dialog.Trigger>
    </Dialog.Root>
  );
}
