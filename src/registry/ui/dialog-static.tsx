"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Xmark } from "@gravity-ui/icons";

export default function DialogStatic() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs us-none h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
        }
      >
        Open dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="p-f i-0 min-h-dvh bg-black/20" />
        <div className="d-f p-f i-0 ai-c jc-c">
          <Dialog.Popup
            className="o-h w-96 bg-white bc-silver-2 c-slate-12 br-md bw-1 bs-o-lg"
            style={{ maxWidth: "90vw" }}
          >
            <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
              <Dialog.Title className="fs-md fw-600">Base Dialog</Dialog.Title>
              <Dialog.Close
                render={
                  <Button className="d-f b-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-6 br-md h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                }
              >
                <Xmark aria-hidden className="w-4 h-4" />
              </Dialog.Close>
            </div>
            <div className="bc-silver-2 bbw-1" />
            <div className="px-4 py-5">
              <Dialog.Description className="c-slate-7 fs-sm lh-4">
                This is a basic dialog component. You can use it to display
                content that requires user attention or interaction.
              </Dialog.Description>
            </div>
            <div className="d-g gtc-2 g-3 px-4 py-3">
              <Dialog.Close
                render={
                  <Button className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs us-none h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                }
              >
                Cancel
              </Dialog.Close>
              <Dialog.Close
                render={
                  <Button className="px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-600 bs-o-md us-none fv:oc-indigo-6 fv:ow-2 fv:oo-2" />
                }
              >
                Confirm
              </Dialog.Close>
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
