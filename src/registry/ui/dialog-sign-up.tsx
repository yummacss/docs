"use client";

import { Button } from "@base-ui/react/button";
import { Checkbox } from "@base-ui/react/checkbox";
import { Dialog } from "@base-ui/react/dialog";
import { Field } from "@base-ui/react/field";
import { Check, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DialogSignUp() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Sign up
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
                className="o-h w-80 bg-silver-1 bc-silver-2 c-slate-12 br-xl bw-1 bs-o-xs"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1">
                  <Dialog.Title className="c-slate-8 fs-md fw-500">
                    Create account
                  </Dialog.Title>
                  <Dialog.Close
                    render={
                      <Button className="d-f ai-c jc-c w-7 h-7 c-slate-6 bw-0 br-md h:bg-silver-2 fv:oo-2 fv:oc-indigo-5" />
                    }
                  >
                    <Xmark aria-hidden className="w-4 h-4" />
                  </Dialog.Close>
                </div>
                <div className="d-f fd-c g-4 px-4 py-5 bg-white bc-silver-2 btr-lg btw-1">
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Full name</label>
                    <Field.Control
                      render={<input />}
                      placeholder="John Smith"
                      aria-label="Full name"
                      className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Email</label>
                    <Field.Control
                      render={<input type="email" />}
                      placeholder="you@company.com"
                      aria-label="Email"
                      className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
                  <div className="d-g g-3 sm:gtc-2">
                    <div className="d-f fd-c g-2">
                      <label className="c-slate-10 fs-sm fw-500">
                        Password
                      </label>
                      <Field.Control
                        render={<input type="password" />}
                        placeholder="••••••••"
                        aria-label="Password"
                        className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                      />
                    </div>
                    <div className="d-f fd-c g-2">
                      <label className="c-slate-10 fs-sm fw-500">Confirm</label>
                      <Field.Control
                        render={<input type="password" />}
                        placeholder="••••••••"
                        aria-label="Confirm password"
                        className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                      />
                    </div>
                  </div>
                  <label className="d-f ai-c g-2 c-slate-8 fs-sm us-none">
                    <Checkbox.Root
                      className={(state) =>
                        `d-f w-4 h-4 ai-c jc-c br-sm fv:oo-1 fv:oc-indigo-5 ${
                          state.checked
                            ? "bg-indigo"
                            : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
                        }`
                      }
                    >
                      <Checkbox.Indicator className="d-f c-white">
                        <Check className="w-3 h-3" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    I agree to the{" "}
                    <a href="#" className="c-indigo td-none h:td-u">
                      Terms of Service
                    </a>
                  </label>
                </div>
                <div className="d-g gtc-2 g-3 px-4 py-4 bg-white">
                  <Dialog.Close
                    render={
                      <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
                    }
                  >
                    Cancel
                  </Dialog.Close>
                  <Dialog.Close
                    render={
                      <Button className="px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oc-indigo-5 fv:oo-2" />
                    }
                  >
                    Create account
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
