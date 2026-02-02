"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleAlertDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger className="bg-white c-slate-10 br-2 px-3 py-2 fw-600 bsh-xs bw-1 bc-silver-2 us-none tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0">
        Remove member
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
                  transition={{ duration: 0.15 }}
                />
              }
              className="p-f i-0 min-h-dvh bg-black/20"
            />
            <div className="p-f i-0 d-f ai-c jc-c">
              <AlertDialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="w-96 br-2 bg-white c-slate-12 bsh-lg bw-1 bc-silver-2 o-h"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <AlertDialog.Title className="fs-sm fw-600 m-0">
                    Are you sure?
                  </AlertDialog.Title>
                  <AlertDialog.Close className="d-f ai-c jc-c d-7 br-2 bg-transparent b-0 c-p c-slate-6 h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
                    <XIcon size={16} weight="bold" aria-hidden />
                  </AlertDialog.Close>
                </div>
                <div className="bbw-1 bc-silver-2" />
                <div className="px-4 py-5">
                  <AlertDialog.Description className="fs-sm c-slate-7 m-0 lh-4">
                    This will permanently remove the team member and revoke
                    their access to all projects.
                  </AlertDialog.Description>
                </div>
                <div className="d-f ai-c g-3 px-4 py-3">
                  <AlertDialog.Close className="bg-red c-white br-2 px-3 py-2 fw-600 bsh-md bw-1 bc-red-7 fv:oc-red-6 us-none tp-c tdu-150 ttf-io h:bg-red-8 fv:ow-2 fv:oo-2 c-p b-0">
                    Remove
                  </AlertDialog.Close>
                  <AlertDialog.Close className="c-slate-10 br-2 px-3 py-2 fw-600 us-none bg-transparent b-0 c-p tp-c tdu-150 ttf-io h:c-slate-12 h:bg-silver-1/55 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
                    Cancel
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
