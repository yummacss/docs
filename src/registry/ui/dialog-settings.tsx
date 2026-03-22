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
          <Button className="b-0 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
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
            <div className="d-f p-f i-0 ai-c jc-c">
              <AlertDialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                }
                className="o-h w-96 bg-white bc-silver-2 c-slate-12 br-md bw-1 bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <AlertDialog.Title className="m-0 fs-sm fw-600">
                    Preferences
                  </AlertDialog.Title>
                  <AlertDialog.Close
                    render={
                      <Button className="d-f b-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-6 br-md c-p h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    <XIcon size={16} weight="bold" aria-hidden />
                  </AlertDialog.Close>
                </div>
                <div className="bc-silver-2 bbw-1" />
                <div className="d-f ai-c g-3 px-4 py-3 bg-indigo-1/50">
                  <span className="d-f ai-c jc-c fs-0 w-10 h-10 bg-white bc-silver-2 c-indigo br-md bw-1 bs-o-xs">
                    <GearIcon size={20} weight="bold" />
                  </span>
                  <div>
                    <h3 className="m-0 mb-1 c-slate-10 fs-sm fw-600">
                      Customize your experience
                    </h3>
                    <p className="m-0 c-slate-8 fs-xs lh-4">
                      Adjust settings to match your workflow
                    </p>
                  </div>
                </div>
                <div className="bc-silver-2 bbw-1" />
                <div className="d-f fd-c g-4 px-4 py-5">
                  <AlertDialog.Description className="m-0 c-slate-7 fs-sm lh-4">
                    Configure your application preferences below.
                  </AlertDialog.Description>

                  <div className="d-f jc-sb ai-c">
                    <div>
                      <div className="c-slate-10 fs-sm fw-600">
                        Email Notifications
                      </div>
                      <div className="mt-1 c-slate-7 fs-xs">
                        Receive updates via email
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setNotifications(!notifications)}
                      className={`p-r w-11 h-6 br-pill tp-bg tdu-200 ttf-io b-0 c-p ${
                        notifications ? "bg-indigo" : "bg-silver-3"
                      }`}
                    >
                      <span
                        className={`p-a t-1 w-4 h-4 br-pill bg-white bs-o-sm tp-l tdu-200 ttf-io ${
                          notifications ? "l-6" : "l-1"
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="d-f jc-sb ai-c">
                    <div>
                      <div className="c-slate-10 fs-sm fw-600">Auto-save</div>
                      <div className="mt-1 c-slate-7 fs-xs">
                        Automatically save your work
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setAutoSave(!autoSave)}
                      className={`p-r w-11 h-6 br-pill tp-bg tdu-200 ttf-io b-0 c-p ${
                        autoSave ? "bg-indigo" : "bg-silver-3"
                      }`}
                    >
                      <span
                        className={`p-a t-1 w-4 h-4 br-pill bg-white bs-o-sm tp-l tdu-200 ttf-io ${
                          autoSave ? "l-6" : "l-1"
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="d-f fd-c g-1">
                    <label htmlFor="theme" className="c-slate-10 fs-sm fw-600">
                      Theme
                    </label>
                    <select
                      id="theme"
                      className="px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 fs-sm c-p ol-n fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                    >
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </div>

                  <div className="d-f fd-c g-1">
                    <label
                      htmlFor="language"
                      className="c-slate-10 fs-sm fw-600"
                    >
                      Language
                    </label>
                    <select
                      id="language"
                      className="px-3 py-2 bg-white bc-silver-3 c-slate-12 br-md bw-1 fs-sm c-p ol-n fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
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
                      <Button className="b-0 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    Cancel
                  </AlertDialog.Close>
                  <AlertDialog.Close
                    render={
                      <Button className="b-0 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-600 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:oc-indigo-6 fv:ow-2 fv:oo-2" />
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
