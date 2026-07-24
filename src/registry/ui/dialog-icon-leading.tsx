"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Mail, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DialogIconLeading() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="bg-white d-if ai-c g-2 px-3 py-2 bc-silver-2 c-slate-10 br-lg bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5">
            <Mail className="w-4 h-4" aria-hidden />
            Send invite
          </Button>
        }
      >
        Send invite
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
              className="p-f i-0 min-h-dvh bg-black/5 bf-b-xs"
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
                className="o-h p-r w-96 bg-white bc-silver-2 c-slate-12 br-xxl bw-1"
                style={{ maxWidth: "90vw" }}
              >
                <Dialog.Close
                  render={
                    <Button className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-9999 h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5" />
                  }
                >
                  <Xmark aria-hidden className="w-5 h-5" />
                </Dialog.Close>
                <div className="d-f fd-c ai-c jc-c g-3 px-4 py-5 bg-white">
                  <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bc-white br-9999 bw-1 va-m us-none">
                    <Avatar.Image
                      src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9"
                      alt="John"
                      className="of-c w-100% h-100%"
                    />
                    <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-md">
                      S
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div className="d-f fd-c ta-c">
                    <span className="c-slate-10 fs-md fw-500">John</span>
                    <span className="c-slate-6 fs-sm">john@yummaui.com</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-white">
                  <Dialog.Title className="c-slate-10 fs-md fw-500 ta-c">
                    Invitation request
                  </Dialog.Title>
                </div>
                <div className="px-4 py-3 bg-white">
                  <Dialog.Description className="c-slate-7 fs-sm lh-4 ta-c">
                    Your{" "}
                    <a href="#" className="c-indigo fw-600">
                      Sales Site
                    </a>{" "}
                    project now has a pending collaboration request from John.
                  </Dialog.Description>
                </div>
                <div className="d-g gtc-2 g-3 px-4 py-4 bg-white">
                  <Dialog.Close
                    render={
                      <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-lg bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
                    }
                  >
                    Ignore
                  </Dialog.Close>
                  <Dialog.Close
                    render={
                      <Button className="px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-lg bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oc-indigo-5 fv:oo-2" />
                    }
                  >
                    Accept
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
