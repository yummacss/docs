"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Field } from "@base-ui/react/field";
import { Input } from "@base-ui/react/input";
import { CreditCard, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function DialogPayment() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
        }
      >
        Add Payment Method
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
                className="o-h w-96 bg-white bc-silver-2 c-slate-12 br-xl bw-1 bs-o-xs"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <Dialog.Title className="m-0 c-slate-8 fs-md fw-500">
                    Payment Details
                  </Dialog.Title>
                  <Dialog.Close
                    render={
                      <Button className="d-f b-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-6 br-md h:bg-silver-2 fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    <Xmark aria-hidden className="w-4 h-4" />
                  </Dialog.Close>
                </div>
                <div className="bc-silver-3 bbw-1" />
                <div className="d-f ai-c g-3 px-4 py-3 bg-silver-1/50">
                  <span className="d-f ai-c jc-c fs-0 w-10 h-10 bg-white bc-silver-3 c-slate-7 br-md bw-1">
                    <CreditCard className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="m-0 mb-1 c-slate-8 fs-sm fw-500">
                      Add payment method
                    </h3>
                    <p className="m-0 c-slate-6 fs-xs lh-4">
                      Add your card information.
                    </p>
                  </div>
                </div>
                <div className="bc-silver-3 bbw-1" />
                <form className="d-f fd-c g-4 px-4 py-5">
                  <Field.Root className="d-f fd-c g-2">
                    <Field.Label className="c-slate-7 fs-sm fw-500">
                      Card Number
                    </Field.Label>
                    <Input
                      id="cardNumber"
                      className="w-full px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 os-none fs-md fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                      placeholder="1234 5678 9012 3456"
                    />
                  </Field.Root>

                  <div className="d-g gtc-2 g-3">
                    <Field.Root className="d-f fd-c g-1">
                      <Field.Label className="c-slate-7 fs-sm fw-500">
                        Expiry
                      </Field.Label>
                      <Input
                        className="w-full px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 os-none fs-md fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                        placeholder="MM/YY"
                      />
                    </Field.Root>

                    <Field.Root className="d-f fd-c g-1">
                      <Field.Label className="c-slate-7 fs-sm fw-500">
                        CVV
                      </Field.Label>
                      <Input
                        className="w-full px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 os-none fs-md fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                        placeholder="123"
                      />
                    </Field.Root>
                  </div>

                  <Field.Root className="d-f fd-c g-1">
                    <Field.Label className="c-slate-7 fs-sm fw-500">
                      Cardholder Name
                    </Field.Label>
                    <Input
                      className="w-full px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 os-none fs-md fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                      placeholder="John Doe"
                    />
                  </Field.Root>
                </form>
                <div className="d-g gtc-2 g-3 px-4 py-4">
                  <Dialog.Close
                    render={
                      <Button className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    Cancel
                  </Dialog.Close>
                  <Dialog.Close
                    render={
                      <Button className="px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oc-indigo-6 fv:ow-2 fv:oo-2" />
                    }
                  >
                    Add Card
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
