"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Get updates
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
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
            <div className="d-f p-f i-0 ai-c jc-c">
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="o-h w-96 bg-white bc-silver-2 c-slate-12 br-md bw-1 bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <Dialog.Title className="m-0 fs-sm fw-600">
                    Subscribe to updates
                  </Dialog.Title>
                  <Dialog.Close className="d-f b-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-6 br-md c-p h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
                    <Xmark aria-hidden className="w-4 h-4" />
                  </Dialog.Close>
                </div>
                <div className="bc-silver-2 bbw-1" />
                <div className="px-4 py-5">
                  <Dialog.Description className="m-0 mb-4 c-slate-7 fs-sm lh-4">
                    Stay informed with our latest news and product updates
                    delivered directly to your inbox.
                  </Dialog.Description>
                  <ul className="d-f fd-c g-2 m-0 p-0 c-slate-8 fs-md">
                    <li className="d-f ai-c g-2">
                      <span className="w-2 h-2 bg-indigo br-pill" />
                      Weekly product highlights
                    </li>
                    <li className="d-f ai-c g-2">
                      <span className="w-2 h-2 bg-indigo br-pill" />
                      New feature announcements
                    </li>
                    <li className="d-f ai-c g-2">
                      <span className="w-2 h-2 bg-indigo br-pill" />
                      Exclusive early access
                    </li>
                  </ul>
                </div>
                <div className="d-f ai-c g-3 px-4 py-3">
                  <Dialog.Close className="px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-600 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
                    Subscribe
                  </Dialog.Close>
                  <Dialog.Close className="px-3 py-2 bg-transparent c-slate-10 br-md fw-600 tp-c tdu-150 ttf-io us-none c-p h:c-slate-12 h:bg-silver-1/55 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
                    Maybe later
                  </Dialog.Close>
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
