"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { ArrowSeparateVertical, Check, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DialogSendInvite() {
  const [open, setOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Send invite
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
                className="o-h p-r w-96 bg-white bc-silver-2 c-slate-12 br-xxl bw-1 bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <Dialog.Close
                  render={
                    <Button className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-md h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5" />
                  }
                >
                  <Xmark aria-hidden className="w-5 h-5" />
                </Dialog.Close>
                <div className="d-f fd-c g-4 px-4 py-5 bg-white">
                  <Dialog.Title className="c-slate-10 fs-md fw-500">
                    Send invite
                  </Dialog.Title>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">
                      Email address
                    </label>
                    <Field.Control
                      render={<input type="email" />}
                      placeholder="colleague@company.com"
                      aria-label="Email address"
                      className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Role</label>
                    <Select.Root
                      defaultValue="viewer"
                      open={roleOpen}
                      onOpenChange={setRoleOpen}
                    >
                      <Select.Trigger
                        className={`d-f ai-c jc-sb h-10 w-100% bw-1 bc-silver-3 br-md bg-white px-3 c-slate-10 fs-md us-none c-p fv:oo--1 fv:oc-indigo-5 ${
                          roleOpen ? "bg-silver-1/50" : "bg-transparent"
                        }`}
                      >
                        <Select.Value>
                          {(value) =>
                            value
                              ? roles.find((r) => r.value === value)?.label
                              : "Select role..."
                          }
                        </Select.Value>
                        <Select.Icon className="d-f c-slate-8">
                          <ArrowSeparateVertical className="w-4 h-4" />
                        </Select.Icon>
                      </Select.Trigger>
                      <AnimatePresence>
                        {roleOpen && (
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
                                    transition={{
                                      duration: 0.15,
                                      ease: "easeOut",
                                    }}
                                  />
                                }
                                className="py-1 w-88 bg-white bc-silver-2 bw-1 br-lg bs-o-xs"
                              >
                                <Select.List className="p-r o-auto">
                                  {roles.map(({ label, value }) => (
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
                    <label className="c-slate-10 fs-sm fw-500">
                      Message (optional)
                    </label>
                    <Field.Control
                      render={<textarea />}
                      placeholder="Add a personal note to your invitation..."
                      aria-label="Invitation message"
                      className="h-20 w-100% pt-3 pl-3 bg-white bc-silver-3 c-slate-10 br-md bw-1 fs-md r-none fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
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
                    Send invite
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

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];
