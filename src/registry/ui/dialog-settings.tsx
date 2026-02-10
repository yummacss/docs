"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { GearIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function DialogSettings() {
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="bg-white c-slate-10 br-2 px-3 py-2 fw-600 bsh-xs bw-1 bc-silver-2 us-none tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0" />
        }
      >
        Preferences
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
                className="w-96 br-2 bg-white c-slate-12 bsh-lg bw-1 bc-silver-2 o-h"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <AlertDialog.Title className="fs-sm fw-600 m-0">
                    Preferences
                  </AlertDialog.Title>
                  <AlertDialog.Close
                    render={
                      <Button className="d-f ai-c jc-c d-7 br-2 bg-transparent b-0 c-p c-slate-6 h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    <XIcon size={16} weight="bold" aria-hidden />
                  </AlertDialog.Close>
                </div>
                <div className="bbw-1 bc-silver-2" />
                <div className="d-f ai-c g-3 px-4 py-3 bg-indigo-1/50">
                  <span className="d-f ai-c jc-c d-10 fs-0 br-2 bg-white bsh-xs bw-1 bc-silver-2 c-indigo">
                    <GearIcon size={20} weight="bold" />
                  </span>
                  <div>
                    <h3 className="m-0 mb-1 fs-sm fw-600 c-slate-10">
                      Customize your experience
                    </h3>
                    <p className="m-0 fs-xs c-slate-8 lh-4">
                      Adjust settings to match your workflow
                    </p>
                  </div>
                </div>
                <div className="bbw-1 bc-silver-2" />
                <div className="px-4 py-5 d-f fd-c g-4">
                  <AlertDialog.Description className="fs-sm c-slate-7 m-0 lh-4">
                    Configure your application preferences below.
                  </AlertDialog.Description>

                  <div className="d-f jc-sb ai-c">
                    <div>
                      <div className="fs-sm fw-600 c-slate-10">
                        Email Notifications
                      </div>
                      <div className="fs-xs c-slate-7 mt-1">
                        Receive updates via email
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifications(!notifications)}
                      className={`p-r w-11 h-6 br-pill tp-bg tdu-200 ttf-io b-0 c-p ${
                        notifications ? "bg-indigo" : "bg-silver-3"
                      }`}
                    >
                      <span
                        className={`p-a t-1 d-4 br-pill bg-white bsh-sm tp-l tdu-200 ttf-io ${
                          notifications ? "l-6" : "l-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="d-f jc-sb ai-c">
                    <div>
                      <div className="fs-sm fw-600 c-slate-10">Auto-save</div>
                      <div className="fs-xs c-slate-7 mt-1">
                        Automatically save your work
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoSave(!autoSave)}
                      className={`p-r w-11 h-6 br-pill tp-bg tdu-200 ttf-io b-0 c-p ${
                        autoSave ? "bg-indigo" : "bg-silver-3"
                      }`}
                    >
                      <span
                        className={`p-a t-1 d-4 br-pill bg-white bsh-sm tp-l tdu-200 ttf-io ${
                          autoSave ? "l-6" : "l-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="d-f fd-c g-1">
                    <label htmlFor="theme" className="fs-sm fw-600 c-slate-10">
                      Theme
                    </label>
                    <select
                      id="theme"
                      className="bg-white c-slate-12 br-2 px-3 py-2 fs-sm bw-1 bc-silver-3 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ol-n c-p"
                    >
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </div>

                  <div className="d-f fd-c g-1">
                    <label
                      htmlFor="language"
                      className="fs-sm fw-600 c-slate-10"
                    >
                      Language
                    </label>
                    <select
                      id="language"
                      className="bg-white c-slate-12 br-2 px-3 py-2 fs-sm bw-1 bc-silver-3 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ol-n c-p"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>
                <div className="d-g gtc-2 g-3 px-4 py-3">
                  <AlertDialog.Close
                    render={
                      <Button className="bg-white c-slate-10 br-2 px-3 py-2 fw-600 bsh-xs bw-1 bc-silver-2 us-none tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0" />
                    }
                  >
                    Cancel
                  </AlertDialog.Close>
                  <AlertDialog.Close
                    render={
                      <Button className="bg-indigo c-white br-2 px-3 py-2 fw-600 bsh-md bw-1 bc-indigo-7 fv:oc-indigo-6 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:ow-2 fv:oo-2 c-p b-0" />
                    }
                  >
                    Save Changes
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
