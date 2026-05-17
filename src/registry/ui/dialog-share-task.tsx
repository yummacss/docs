"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { CaretsExpandVertical, Check, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DialogShareTask() {
  const [open, setOpen] = useState(false);
  const [permOpen, setPermOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Share task
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
                className="o-h w-96 bg-silver-1 bc-silver-2 c-slate-12 br-xl bw-1 bs-o-xs"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1">
                  <Dialog.Title className="c-slate-8 fs-md fw-500">
                    Share task
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
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Team member</label>
                    <Field.Control
                      render={<input />}
                      placeholder="Search by name or email..."
                      aria-label="Team member"
                      className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Permission level</label>
                    <Select.Root
                      defaultValue="can-view"
                      open={permOpen}
                      onOpenChange={setPermOpen}
                    >
                      <Select.Trigger
                        className={`d-f ai-c jc-sb h-10 w-100% bw-1 bc-silver-3 br-md bg-white px-3 c-slate-10 us-none c-p fv:oo--1 fv:oc-indigo-5 ${
                          permOpen ? "bg-silver-1/50" : "bg-transparent"
                        }`}
                      >
                        <Select.Value>
                          {(value) =>
                            value
                              ? permissions.find((p) => p.value === value)?.label
                              : "Select permission..."
                          }
                        </Select.Value>
                        <Select.Icon className="d-f c-slate-8">
                          <CaretsExpandVertical className="w-4 h-4" />
                        </Select.Icon>
                      </Select.Trigger>
                      <AnimatePresence>
                        {permOpen && (
                          <Select.Portal>
                            <Select.Positioner
                              sideOffset={8}
                              alignItemWithTrigger={false}
                              className="zi-10 p-0 ow-0 us-none"
                            >
                              <Select.Popup
                                render={
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                  />
                                }
                                className="py-1 w-88 bg-white bc-silver-2 bw-1 br-xl bs-o-xs"
                              >
                                <Select.List className="p-r o-auto">
                                  {permissions.map(({ label, value }) => (
                                    <Select.Item
                                      key={value}
                                      value={value}
                                      className={(state) =>
                                        `d-f ai-c g-2 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                                      }
                                    >
                                      <Select.ItemIndicator className="d-f ai-c">
                                        <Check className="w-4 h-4" />
                                      </Select.ItemIndicator>
                                      <Select.ItemText>{label}</Select.ItemText>
                                    </Select.Item>
                                  ))}
                                </Select.List>
                              </Select.Popup>
                            </Select.Positioner>
                          </Select.Portal>
                        )}
                      </AnimatePresence>
                    </Select.Root>
                  </div>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Note (optional)</label>
                    <Field.Control
                      render={<textarea />}
                      placeholder="Add a note about this task..."
                      aria-label="Share note"
                      className="h-20 w-100% pt-3 pl-3 bg-white bc-silver-3 c-slate-10 br-md bw-1 fs-md r-none fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
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
                    Share
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

const permissions = [
  { label: "Can view", value: "can-view" },
  { label: "Can edit", value: "can-edit" },
  { label: "Can manage", value: "can-manage" },
];
