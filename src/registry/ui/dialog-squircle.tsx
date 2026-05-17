"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DialogSquircle() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 bw-1 br-xxl cs-s fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Request access
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
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              }
              className="p-f i-0 min-h-dvh bg-black/20 bf-b-xs"
            />
            <div className="d-f p-f i-0 ai-c jc-c">
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                }
                className="o-h w-96 bg-silver-1 bc-silver-2 c-slate-12 bw-1 br-3xl cs-s bs-o-xs"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1">
                  <Dialog.Title className="c-slate-8 fs-md fw-500">
                    Invitation request
                  </Dialog.Title>
                  <Dialog.Close
                    render={
                      <Button className="d-f ai-c jc-c w-7 h-7 c-slate-6 bw-0 br-xxl cs-s h:bg-silver-2 fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
                    }
                  >
                    <Xmark aria-hidden className="w-4 h-4" />
                  </Dialog.Close>
                </div>
                <div className="d-f fd-c ai-c jc-c g-3 px-4 py-5 bg-white bc-silver-2 btr-xxl btw-1">
                  <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bc-white br-9999 bw-1 va-m us-none">
                    <Avatar.Image
                      src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
                      alt="Sarah"
                      className="of-c w-100% h-100%"
                    />
                    <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-md">
                      S
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div className="d-f fd-c ta-c">
                    <span className="c-slate-10 fs-md fw-500">Sarah</span>
                    <span className="c-slate-6 fs-sm">sarah@yummaui.com</span>
                  </div>
                </div>
                <div className="px-4 py-3 bg-white">
                  <Dialog.Description className="c-slate-7 fs-sm lh-4 ta-c">
                    Your{" "}
                    <a href="#" className="c-indigo fw-500">
                      Sales Site
                    </a>{" "}
                    project now has a pending collaboration request from Sarah.
                  </Dialog.Description>
                </div>
                <div className="d-g gtc-2 g-3 px-4 py-4 bg-white">
                  <Dialog.Close
                    render={
                      <Button className="px-3 py-2 bc-silver-2 c-slate-10 bw-1 br-xxl cs-s fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
                    }
                  >
                    Cancel
                  </Dialog.Close>
                  <Dialog.Close
                    render={
                      <Button className="px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white bw-1 br-xxl cs-s fw-500 tp-c tdu-150 ttf-io us-none fv:oc-indigo-5 fv:ow-2 fv:oo-2" />
                    }
                  >
                    Confirm
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
