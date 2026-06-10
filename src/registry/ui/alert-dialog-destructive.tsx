"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { Archive, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AlertDialogDestructive() {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="bg-white d-if ai-c g-2 px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5">
            <Archive className="w-4 h-4" aria-hidden />
            Archive project
          </Button>
        }
      >
        Archive project
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
              className="p-f i-0 min-h-dvh bg-black/5 bf-b-xs"
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
                    <Button className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-9999 h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5" />
                  }
                >
                  <Xmark aria-hidden className="w-5 h-5" />
                </AlertDialog.Close>
                <div className="d-f fd-c ai-c g-3 pt-10 pb-6 px-4 bg-white">
                  <span className="d-f ai-c jc-c w-12 h-12 bg-silver-2 c-slate-7 br-9999">
                    <Archive className="w-6 h-6" />
                  </span>
                  <AlertDialog.Title className="c-slate-10 fs-md fw-500">
                    Archive project?
                  </AlertDialog.Title>
                  <AlertDialog.Description className="m-0 c-slate-6 fs-sm lh-4 ta-c">
                    This project will be archived. Team members can still view
                    it but won&apos;t be able to make changes. You can unarchive
                    it at any time.
                  </AlertDialog.Description>
                </div>
                <div className="d-f jc-c g-3 px-4 pb-4 bg-white">
                  <AlertDialog.Close
                    render={
                      <Button className="px-4 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
                    }
                  >
                    Cancel
                  </AlertDialog.Close>
                  <AlertDialog.Close
                    render={
                      <Button className="px-6 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oc-red-6 fv:oo-2" />
                    }
                  >
                    Archive
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
