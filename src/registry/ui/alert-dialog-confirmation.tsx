"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { TrashBin } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AlertDialogConfirmation() {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="d-if ai-c px-3 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-red-6" />
        }
      >
        Delete account
      </AlertDialog.Trigger>
      <AnimatePresence>
        {open && (
          <AlertDialog.Portal keepMounted>
            <AlertDialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              }
              className="p-f i-0 min-h-dvh bg-black/20 bf-b-xs"
            />
            <div className="d-f p-f i-0 ai-c jc-c">
              <AlertDialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                }
                className="o-h w-96 bg-white bc-silver-2 c-slate-12 br-xl bw-1 bs-o-xs"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <div className="d-f jc-sb ai-c w-full">
                    <AlertDialog.Title className="c-slate-8 fs-md fw-500">
                      Delete account
                    </AlertDialog.Title>
                    <div className="w-7 h-7" />
                  </div>
                </div>
                <div className="d-f ai-c jc-c g-2 p-4 bc-silver-2 btr-lg btw-1">
                  <span className="d-f ai-c jc-c w-12 h-12 bc-silver-3 c-red br-lg bw-1 bs-o-xs">
                    <TrashBin className="w-6 h-6" />
                  </span>
                </div>
                <div className="px-4 py-3">
                  <AlertDialog.Description className="c-slate-7 fs-sm lh-4 ta-c">
                    This action cannot be undone. This will{" "}
                    <span className="c-slate-9 fw-600">permanently delete</span>{" "}
                    your data from our servers.
                  </AlertDialog.Description>
                </div>
                <div className="d-g gtc-2 g-3 px-4 py-4">
                  <AlertDialog.Close
                    render={
                      <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    Cancel
                  </AlertDialog.Close>
                  <AlertDialog.Close
                    render={
                      <Button className="px-3 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oc-red-6 fv:ow-2 fv:oo-2" />
                    }
                  >
                    Confirm
                  </AlertDialog.Close>
                </div>
              </AlertDialog.Popup>
            </div>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}
