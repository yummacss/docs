"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function AlertDialogConfirmation() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
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
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              }
              className="p-f i-0 min-h-dvh bg-black/20"
            />
            <div className="d-f p-f i-0 ai-c jc-c">
              <AlertDialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                }
                className="o-h w-96 bg-white bc-silver-2 c-slate-12 br-md bw-1 bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <AlertDialog.Title className="fs-md fw-600">
                    Are you absolutely sure?
                  </AlertDialog.Title>
                  <AlertDialog.Close
                    render={
                      <Button className="d-f b-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-6 br-md h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    <Xmark aria-hidden className="w-4 h-4" />
                  </AlertDialog.Close>
                </div>
                <div className="bc-silver-2 bbw-1" />
                <div className="px-4 py-5">
                  <AlertDialog.Description className="c-slate-7 fs-sm lh-4">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialog.Description>
                </div>
                <div className="d-g gtc-2 g-3 px-4 py-3">
                  <AlertDialog.Close
                    render={
                      <Button className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    Cancel
                  </AlertDialog.Close>
                  <AlertDialog.Close
                    render={
                      <Button className="px-3 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-600 bs-o-md tp-c tdu-150 ttf-io us-none fv:oc-red-6 fv:ow-2 fv:oo-2" />
                    }
                  >
                    Delete account
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
