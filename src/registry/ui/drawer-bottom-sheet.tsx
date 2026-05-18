"use client";

import { Button } from "@base-ui/react/button";
import { Drawer } from "@base-ui/react/drawer";
import { Check, Flag, Pencil, TrashBin, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DrawerBottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="down">
      <Drawer.Trigger
        render={
          <Button
            type="button"
            className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5"
          />
        }
      >
        Task Actions
      </Drawer.Trigger>
      <AnimatePresence>
        {open && (
          <Drawer.Portal keepMounted>
            <Drawer.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              }
              className="p-f i-0 bg-black/20 bf-b-xs"
            />
            <Drawer.Popup
              render={
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              }
              className="d-f p-f l-0 r-0 fd-c bg-white bc-silver-2 bw-0 btw-1 btlr-xl btrr-xl bs-o-lg"
            >
              <div className="d-f ai-c jc-sb px-4 py-3 bg-silver-1/50 bc-silver-2 bbw-1 btlr-xl btrr-xl">
                <Drawer.Title className="c-slate-10 fs-md fw-500">
                  Design System Audit
                </Drawer.Title>
                <Drawer.Close
                  render={
                    <Button
                      type="button"
                      className="d-f ai-c jc-c w-7 h-7 c-slate-6 bw-0 br-md h:bg-silver-2 fv:oo-2 fv:oc-indigo-5"
                    />
                  }
                >
                  <Xmark aria-hidden className="w-4 h-4" />
                </Drawer.Close>
              </div>
              <div className="d-f fd-c px-2 py-2">
                <p className="px-3 py-2 c-slate-6 fs-xs fw-500 ls-3">
                  Change Status
                </p>
                {statuses.map((s) => (
                  <Drawer.Close
                    key={s.value}
                    render={
                      <button
                        type="button"
                        className="d-f ai-c g-3 px-3 py-2 c-slate-10 br-lg fs-sm fw-500 tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5"
                      />
                    }
                  >
                    <span
                      className={`d-if w-2 h-2 br-9999 ${s.color}`}
                      aria-hidden
                    />
                    {s.label}
                  </Drawer.Close>
                ))}
                <div className="my-2 h-px w-100% bg-silver-2" />
                <p className="px-3 py-2 c-slate-6 fs-xs fw-500 ls-3">Actions</p>
                <Drawer.Close
                  render={
                    <button
                      type="button"
                      className="d-f ai-c g-3 px-3 py-2 c-slate-10 br-lg fs-sm fw-500 tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5"
                    />
                  }
                >
                  <Check className="w-4 h-4 c-slate-5" />
                  Mark as Complete
                </Drawer.Close>
                <Drawer.Close
                  render={
                    <button
                      type="button"
                      className="d-f ai-c g-3 px-3 py-2 c-slate-10 br-lg fs-sm fw-500 tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5"
                    />
                  }
                >
                  <Flag className="w-4 h-4 c-slate-5" />
                  Set Priority
                </Drawer.Close>
                <Drawer.Close
                  render={
                    <button
                      type="button"
                      className="d-f ai-c g-3 px-3 py-2 c-slate-10 br-lg fs-sm fw-500 tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5"
                    />
                  }
                >
                  <Pencil className="w-4 h-4 c-slate-5" />
                  Edit Task
                </Drawer.Close>
                <div className="my-2 h-px w-100% bg-silver-2" />
                <Drawer.Close
                  render={
                    <button
                      type="button"
                      className="d-f ai-c g-3 px-3 py-2 c-red br-lg fs-sm fw-500 tp-c tdu-150 ttf-io h:bg-red-1/50 fv:oo--1 fv:oc-red-6"
                    />
                  }
                >
                  <TrashBin className="w-4 h-4" />
                  Delete Task
                </Drawer.Close>
              </div>
              <div className="h-4" />
            </Drawer.Popup>
          </Drawer.Portal>
        )}
      </AnimatePresence>
    </Drawer.Root>
  );
}

const statuses = [
  { label: "To Do", value: "todo", color: "bg-silver-4" },
  { label: "In Progress", value: "in-progress", color: "bg-indigo" },
  { label: "Done", value: "done", color: "bg-green" },
  { label: "Blocked", value: "blocked", color: "bg-red" },
];
