"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { CreditCardIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function DialogPayment() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="bg-white c-slate-10 br-2 px-3 py-2 fw-600 bs-o-xs bw-1 bc-silver-2 us-none tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0" />
        }
      >
        Add Payment Method
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
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                }
                className="w-96 br-2 bg-white c-slate-12 bs-o-lg bw-1 bc-silver-2 o-h"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <AlertDialog.Title className="fs-sm fw-600 m-0">
                    Payment Details
                  </AlertDialog.Title>
                  <AlertDialog.Close
                    render={
                      <Button className="d-f ai-c jc-c w-7 h-7 br-2 bg-transparent b-0 c-p c-slate-6 h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    <XIcon size={16} weight="bold" aria-hidden />
                  </AlertDialog.Close>
                </div>
                <div className="bbw-1 bc-silver-2" />
                <div className="d-f ai-c g-3 px-4 py-3 bg-indigo-1/50">
                  <span className="d-f ai-c jc-c w-10 h-10 fs-0 br-2 bg-white bs-o-xs bw-1 bc-silver-2 c-indigo">
                    <CreditCardIcon size={20} weight="bold" />
                  </span>
                  <div>
                    <h3 className="m-0 mb-1 fs-sm fw-600 c-slate-10">
                      Add payment method
                    </h3>
                    <p className="m-0 fs-xs c-slate-8 lh-4">
                      Enter your card details to continue
                    </p>
                  </div>
                </div>
                <div className="bbw-1 bc-silver-2" />
                <form className="px-4 py-5 d-f fd-c g-4">
                  <AlertDialog.Description className="fs-sm c-slate-7 m-0 lh-4">
                    Your payment information is encrypted and secure.
                  </AlertDialog.Description>

                  <div className="d-f fd-c g-1">
                    <label
                      htmlFor="cardNumber"
                      className="fs-xs fw-600 c-slate-10"
                    >
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="bg-white c-slate-12 br-2 px-3 py-2 fs-sm bw-1 bc-silver-3 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ol-n"
                    />
                  </div>

                  <div className="d-g gtc-2 g-3">
                    <div className="d-f fd-c g-1">
                      <label
                        htmlFor="expiry"
                        className="fs-xs fw-600 c-slate-10"
                      >
                        Expiry
                      </label>
                      <input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="bg-white c-slate-12 br-2 px-3 py-2 fs-sm bw-1 bc-silver-3 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ol-n"
                      />
                    </div>

                    <div className="d-f fd-c g-1">
                      <label htmlFor="cvv" className="fs-xs fw-600 c-slate-10">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="bg-white c-slate-12 br-2 px-3 py-2 fs-sm bw-1 bc-silver-3 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ol-n"
                      />
                    </div>
                  </div>

                  <div className="d-f fd-c g-1">
                    <label htmlFor="name" className="fs-xs fw-600 c-slate-10">
                      Cardholder Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="bg-white c-slate-12 br-2 px-3 py-2 fs-sm bw-1 bc-silver-3 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ol-n"
                    />
                  </div>
                </form>
                <div className="d-g gtc-2 g-3 px-4 py-3">
                  <AlertDialog.Close
                    render={
                      <Button className="bg-white c-slate-10 br-2 px-3 py-2 fw-600 bs-o-xs bw-1 bc-silver-2 us-none tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0" />
                    }
                  >
                    Cancel
                  </AlertDialog.Close>
                  <AlertDialog.Close
                    render={
                      <Button className="bg-indigo c-white br-2 px-3 py-2 fw-600 bs-o-md bw-1 bc-indigo-7 fv:oc-indigo-6 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:ow-2 fv:oo-2 c-p b-0" />
                    }
                  >
                    Add Card
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
