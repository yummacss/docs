"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const roles = [
  { name: "Editor", description: "Can edit tasks and comment" },
  { name: "Viewer", description: "Read-only access to tasks" },
];

export default function DialogNested() {
  const [open, setOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Project settings
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
                    initial={{ opacity: 0, scale: 0.95, y: 0 }}
                    animate={
                      nestedOpen
                        ? { opacity: 1, scale: 0.95, y: 55 }
                        : { opacity: 1, scale: 1, y: 0 }
                    }
                    exit={{ opacity: 0, scale: 0.95, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                }
                className={`o-h ${nestedOpen ? "w-90" : "w-96"} bg-silver-1 bc-silver-2 c-slate-12 br-xl bw-1 bs-o-xs`}
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1">
                  <Dialog.Title className="c-slate-8 fs-md fw-500">
                    Project settings
                  </Dialog.Title>
                  <Dialog.Close
                    render={
                      <Button className="d-f ai-c jc-c w-7 h-7 c-slate-6 bw-0 br-md h:bg-silver-2 fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
                    }
                  >
                    <Xmark aria-hidden className="w-4 h-4" />
                  </Dialog.Close>
                </div>
                <div className="d-f fd-c g-4 px-4 py-5 bg-white bc-silver-2 btr-lg btw-1">
                  <div className="d-f fd-c g-1">
                    <span className="c-slate-10 fs-sm fw-500">
                      Website Redesign
                    </span>
                    <span className="c-slate-6 fs-xs">
                      Access level for Sarah
                    </span>
                  </div>
                  <Dialog.Root open={nestedOpen} onOpenChange={setNestedOpen}>
                    <Dialog.Trigger
                      render={
                        <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
                      }
                    >
                      Change role
                    </Dialog.Trigger>
                    <AnimatePresence>
                      {nestedOpen && (
                        <Dialog.Portal>
                          <div className="d-f p-f i-0 ai-c jc-c">
                            <Dialog.Popup
                              render={
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeOut",
                                  }}
                                />
                              }
                              className="o-h w-96 bg-silver-1 bc-silver-2 c-slate-12 br-xl bw-1 bs-o-xs"
                              style={{ maxWidth: "90vw" }}
                            >
                              <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1">
                                <Dialog.Title className="c-slate-8 fs-md fw-500">
                                  Change role
                                </Dialog.Title>
                                <Dialog.Close
                                  render={
                                    <Button className="d-f ai-c jc-c w-7 h-7 c-slate-6 bw-0 br-md h:bg-silver-2 fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
                                  }
                                >
                                  <Xmark aria-hidden className="w-4 h-4" />
                                </Dialog.Close>
                              </div>
                              <div className="d-f fd-c g-3 px-4 py-5 bg-white bc-silver-2 btr-lg btw-1">
                                {roles.map((role) => (
                                  <div key={role.name} className="d-f fd-c g-1">
                                    <span className="c-slate-10 fs-sm fw-500">
                                      {role.name}
                                    </span>
                                    <span className="c-slate-6 fs-xs">
                                      {role.description}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="d-g gtc-2 g-3 px-4 py-4 bg-white">
                                <Dialog.Close
                                  render={
                                    <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
                                  }
                                >
                                  Cancel
                                </Dialog.Close>
                                <Dialog.Close
                                  render={
                                    <Button className="px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oc-indigo-5 fv:ow-2 fv:oo-2" />
                                  }
                                >
                                  Apply
                                </Dialog.Close>
                              </div>
                            </Dialog.Popup>
                          </div>
                        </Dialog.Portal>
                      )}
                    </AnimatePresence>
                  </Dialog.Root>
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
