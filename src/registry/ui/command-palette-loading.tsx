"use client";

import { Button } from "@base-ui/react/button";
import { Combobox } from "@base-ui/react/combobox";
import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function CommandPaletteLoading() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Search commands...
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
                className="o-h w-96 bg-white bc-silver-2 c-slate-12 br-xxl bw-1 bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f fd-c">
                  <div className="d-f ai-c g-2 px-4 py-1">
                    <div className="w-5 h-5 bg-silver-2 br-sm" />
                    <div className="h-10 fg-1 bg-transparent" />
                    <div className="w-7 h-7 bg-silver-2 br-md" />
                  </div>
                  <div className="d-f fd-c g-3 px-4 pb-3">
                    <div className="w-14 h-3 bg-silver-2 br-sm" />
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="d-f ai-c g-3">
                        <div className="w-8 h-8 bg-silver-2 br-md" />
                        <div
                          className="h-3 bg-silver-2 br-sm"
                          style={{ width: `${80 + i * 20}px` }}
                        />
                      </div>
                    ))}
                    <div className="w-100% h-px bg-silver-2" />
                    <div className="w-14 h-3 bg-silver-2 br-sm" />
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="d-f ai-c g-3">
                        <div className="w-8 h-8 bg-silver-2 br-md" />
                        <div
                          className="h-3 bg-silver-2 br-sm"
                          style={{ width: `${90 + i * 15}px` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
