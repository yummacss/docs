"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { UserRoundX, X } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AlertDialogConfirmation() {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="d-if ai-c px-3 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-red-6" />
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
                className="o-h p-r w-96 bg-white bc-silver-2 c-slate-12 br-xxl bw-1 bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <AlertDialog.Close
                  render={
                    <Button className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-md h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5" />
                  }
                >
                  <X aria-hidden className="w-5 h-5" />
                </AlertDialog.Close>
                <div className="d-f fd-c ai-c g-3 pt-10 pb-6 px-4 bg-white">
                  <span className="d-f ai-c jc-c w-12 h-12 bg-red-1/50 c-red br-100%">
                    <UserRoundX className="w-6 h-6" />
                  </span>
                  <AlertDialog.Title className="c-slate-10 fs-md fw-500">
                    Delete account?
                  </AlertDialog.Title>
                  <AlertDialog.Description className="m-0 c-slate-6 fs-sm lh-4 ta-c">
                    This action cannot be undone. This will{" "}
                    <span className="c-slate-9 fw-600">permanently delete</span>{" "}
                    your data from our servers.
                  </AlertDialog.Description>
                </div>
                <div className="d-f jc-c px-4 pb-4 bg-white">
                  <AlertDialog.Close
                    render={
                      <Button className="px-6 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oc-red-6 fv:oo-2" />
                    }
                  >
                    Confirm deletion
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
