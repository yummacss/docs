"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { EnvelopeOpenIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleAlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState(["", "", "", ""]);
  const inputRefs = [
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="bg-white c-slate-10 br-2 px-3 py-2 fw-600 bs-o-xs bw-1 bc-silver-2 us-none tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0" />
        }
      >
        Verify Email
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
                    Verify your email
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
                    <EnvelopeOpenIcon size={20} weight="bold" />
                  </span>
                  <div>
                    <h3 className="m-0 mb-1 fs-sm fw-600 c-slate-10">
                      Verify your email
                    </h3>
                    <p className="m-0 fs-xs c-slate-8 lh-4">
                      Enter the code we sent to confirm your identity
                    </p>
                  </div>
                </div>
                <div className="bbw-1 bc-silver-2" />
                <div className="px-4 py-5">
                  <AlertDialog.Description className="fs-sm c-slate-7 m-0 mb-4 lh-4 ta-c">
                    We've sent a 4-digit code to your email
                  </AlertDialog.Description>
                  <div className="d-f g-2 jc-c">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        placeholder="0"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-14 h-14 ta-c fs-lg fw-600 br-2 bw-1 bc-silver-3 bg-white fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                      />
                    ))}
                  </div>
                  <p className="fs-xs c-slate-6 mt-3 mb-0 ta-c">
                    Didn't receive it?{" "}
                    <button
                      type="button"
                      className="c-indigo fw-600 bg-transparent b-0 c-p td-u p-0"
                    >
                      Resend code
                    </button>
                  </p>
                </div>
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
                    Verify
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
