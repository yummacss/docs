"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { CreditCard, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function DialogPayment() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="b-0 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
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
            <div className="d-f p-f i-0 ai-c jc-c">
              <AlertDialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                }
                className="o-h w-96 bg-white bc-silver-2 c-slate-12 br-md bw-1 bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <AlertDialog.Title className="m-0 fs-md fw-600">
                    Payment Details
                  </AlertDialog.Title>
                  <AlertDialog.Close
                    render={
                      <Button className="d-f b-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-6 br-md h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    <Xmark aria-hidden className="w-4 h-4" />
                  </AlertDialog.Close>
                </div>
                <div className="bc-silver-2 bbw-1" />
                <div className="d-f ai-c g-3 px-4 py-3 bg-indigo-1/50">
                  <span className="d-f ai-c jc-c fs-0 w-10 h-10 bg-white bc-silver-2 c-indigo br-md bw-1 bs-o-xs">
                    <CreditCard className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="m-0 mb-1 c-slate-10 fs-md fw-600">
                      Add payment method
                    </h3>
                    <p className="m-0 c-slate-8 fs-xs lh-4">
                      Enter your card details to continue
                    </p>
                  </div>
                </div>
                <div className="bc-silver-2 bbw-1" />
                <form className="d-f fd-c g-4 px-4 py-5">
                  <AlertDialog.Description className="m-0 c-slate-7 fs-md lh-4">
                    Your payment information is encrypted and secure.
                  </AlertDialog.Description>

                  <div className="d-f fd-c g-1">
                    <label
                      htmlFor="cardNumber"
                      className="c-slate-10 fs-xs fw-600"
                    >
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 os-none fs-md fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                    />
                  </div>

                  <div className="d-g gtc-2 g-3">
                    <div className="d-f fd-c g-1">
                      <label
                        htmlFor="expiry"
                        className="c-slate-10 fs-xs fw-600"
                      >
                        Expiry
                      </label>
                      <input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 os-none fs-md fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                      />
                    </div>

                    <div className="d-f fd-c g-1">
                      <label htmlFor="cvv" className="c-slate-10 fs-xs fw-600">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 os-none fs-md fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                      />
                    </div>
                  </div>

                  <div className="d-f fd-c g-1">
                    <label htmlFor="name" className="c-slate-10 fs-xs fw-600">
                      Cardholder Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 os-none fs-md fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                    />
                  </div>
                </form>
                <div className="d-g gtc-2 g-3 px-4 py-3">
                  <AlertDialog.Close
                    render={
                      <Button className="b-0 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    Cancel
                  </AlertDialog.Close>
                  <AlertDialog.Close
                    render={
                      <Button className="b-0 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-600 bs-o-md tp-c tdu-150 ttf-io us-none fv:oc-indigo-6 fv:ow-2 fv:oo-2" />
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
