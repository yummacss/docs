"use client";

import { Separator } from "@base-ui/react";
import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Field } from "@base-ui/react/field";
import { Pencil, X } from "lucide-react";
import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DialogEditProfile() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={(props) => (
          <motion.button
            type="button"
            {...(props as HTMLMotionProps<"button">)}
            className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5"
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Edit profile
          </motion.button>
        )}
      />
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
                className="o-h p-r w-96 bg-white bc-silver-2 c-slate-12 br-xxl bw-1 bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <Dialog.Close
                  render={(props) => (
                    <motion.button
                      type="button"
                      {...(props as HTMLMotionProps<"button">)}
                      className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-md h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5"
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <X aria-hidden className="w-5 h-5" />
                    </motion.button>
                  )}
                />
                <div className="d-f fd-c g-5 px-4 py-5 bg-white">
                  <Dialog.Title className="c-slate-10 fs-md fw-500">
                    Edit profile
                  </Dialog.Title>
                  <div className="d-f ai-c g-4">
                    <div className="p-r">
                      <Avatar.Root className="d-if o-h ai-c jc-c w-16 h-16 bg-silver-1 bc-white br-9999 bw-1 va-m us-none">
                        <Avatar.Image
                          src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
                          alt="Sarah"
                          className="of-c w-100% h-100%"
                        />
                      </Avatar.Root>
                      <Button
                        render={(props) => (
                          <motion.button
                            type="button"
                            {...(props as HTMLMotionProps<"button">)}
                            className="d-f p-a b-0 r-0 ai-c jc-c w-5 h-5 p-0 bg-white bc-silver-3 br-9999 bw-1 us-none fv:oo-1 fv:oc-indigo-5"
                            aria-label="Edit profile picture"
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            <Pencil className="fs-0 w-3 h-3 c-slate-6" />
                          </motion.button>
                        )}
                      />
                    </div>
                    <div className="d-f fd-c">
                      <span className="c-slate-10 fs-lg fw-500">Sarah</span>
                      <span className="c-slate-6 fs-sm">@sarah</span>
                    </div>
                  </div>
                  <div className="d-g g-3 sm:gtc-2">
                    <div className="d-f fd-c g-2">
                      <label className="c-slate-10 fs-sm fw-500">
                        First name
                      </label>
                      <Field.Control
                        render={<input />}
                        defaultValue="Sarah"
                        aria-label="First name"
                        className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                      />
                    </div>
                    <div className="d-f fd-c g-2">
                      <label className="c-slate-10 fs-sm fw-500">
                        Last name
                      </label>
                      <Field.Control
                        render={<input />}
                        aria-label="Last name"
                        className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                      />
                    </div>
                  </div>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Username</label>
                    <Field.Control
                      render={<input />}
                      defaultValue="sarah"
                      aria-label="Username"
                      className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Email</label>
                    <div className="d-f ox-h ai-c min-w-0 w-100%">
                      <Field.Control
                        render={<input />}
                        defaultValue="sarah"
                        aria-label="Email"
                        className="fg-1 h-10 min-w-0 pl-3 bg-white bc-silver-3 c-slate-10 byw-1 blw-1 blr-md fs-md fv:oo--1 fv:oc-indigo-5"
                      />
                      <Separator className="fs-0 w-px h-10 bg-silver-3" />
                      <div className="d-f fs-0 ai-c jc-c px-3 h-10 bg-white bc-silver-3 c-slate-6 byw-1 brw-1 brr-md fs-md">
                        @yummaui.com
                      </div>
                    </div>
                  </div>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Bio</label>
                    <Field.Control
                      render={<textarea />}
                      defaultValue="Lead developer working on the Sales Site and Dashboard projects."
                      aria-label="Bio"
                      className="h-20 w-100% pt-3 pl-3 bg-white bc-silver-3 c-slate-10 br-md bw-1 fs-md r-none fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
                </div>
                <div className="d-g gtc-2 g-3 px-4 py-4 bg-white">
                  <Dialog.Close
                    render={(props) => (
                      <motion.button
                        type="button"
                        {...(props as HTMLMotionProps<"button">)}
                        className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5"
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        Cancel
                      </motion.button>
                    )}
                  />
                  <Dialog.Close
                    render={(props) => (
                      <motion.button
                        type="button"
                        {...(props as HTMLMotionProps<"button">)}
                        className="px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oc-indigo-5 fv:oo-2"
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        Save changes
                      </motion.button>
                    )}
                  />
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
