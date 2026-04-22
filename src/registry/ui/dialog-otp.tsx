"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Envelope, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { type KeyboardEvent, useRef, useState } from "react";

export default function DialogVerification() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
        }
      >
        Verify Email
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
                  <Dialog.Title className="c-slate-8 fs-md fw-500">
                    Verification code
                  </Dialog.Title>
                  <Dialog.Close
                    render={
                      <Button className="d-f b-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-6 br-md h:bg-silver-2 fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    <Xmark aria-hidden className="w-4 h-4" />
                  </Dialog.Close>
                </div>
                <div className="bc-silver-2 bbw-1" />
                <div className="d-f ai-c jc-c g-2 p-4">
                  <span className="d-f ai-c jc-c w-12 h-12 bg-white c-indigo br-lg bw-1 bc-silver-3 bs-o-xs">
                    <Envelope className="w-6 h-6" />
                  </span>
                </div>
                <div className="px-4 py-3">
                  <Dialog.Description className="c-slate-7 fs-sm lh-4 ta-c">
                    We've sent a 4-digit code to your email
                  </Dialog.Description>
                </div>
                <div className="px-4 py-3">
                  <div className="d-f g-2 jc-c">
                    {["slot-1", "slot-2", "slot-3", "slot-4"].map(
                      (slotId, index) => (
                        <input
                          key={slotId}
                          ref={inputRefs[index]}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          placeholder="0"
                          value={code[index]}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-16 h-16 bc-silver-3 cc-slate-7 br-md bw-1 ta-c fs-4xl fw-500 fv:ow-2 fv:oo-2 fv:oc-indigo-6 p::c-silver-6"
                        />
                      ),
                    )}
                  </div>
                  <p className="mt-3 mb-0 c-slate-6 fs-xs ta-c">
                    Did you not get a code?{" "}
                    <Button
                      type="button"
                      className="p-0 bg-transparent c-indigo fw-500 td-u"
                    >
                      Click to resend.
                    </Button>
                  </p>
                </div>
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
                    Verify
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
