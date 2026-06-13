"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DialogNested() {
  const [open, setOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<
    (typeof teamMembers)[number] | null
  >(null);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="bg-white px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Team settings
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
              className="p-f i-0 min-h-dvh bg-black/5 bf-b-xs"
            />
            <div className="d-f p-f i-0 ai-c jc-c">
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 0 }}
                    animate={
                      memberToRemove
                        ? { opacity: 1, scale: 0.95, y: 60 }
                        : { opacity: 1, scale: 1, y: 0 }
                    }
                    exit={{ opacity: 0, scale: 0.95, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                }
                className={`o-h p-r ${memberToRemove ? "w-90" : "w-96"} bg-white bc-silver-2 c-slate-12 br-xxl bw-1 bs-o-lg`}
                style={{ maxWidth: "90vw" }}
              >
                <Dialog.Close
                  render={
                    <Button className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-9999 h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5" />
                  }
                >
                  <Xmark aria-hidden className="w-5 h-5" />
                </Dialog.Close>
                <div className="d-f fd-c g-3 px-4 py-5 bg-white">
                  <Dialog.Title className="pb-2 c-slate-10 fs-md fw-500">
                    Team settings
                  </Dialog.Title>
                  {teamMembers.map((member) => (
                    <div
                      key={`${member.name}-${member.role}`}
                      className="d-f ai-c g-3"
                    >
                      <Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 bc-white br-9999 bw-1 va-m us-none">
                        <Avatar.Image
                          src={member.avatar}
                          alt={member.name}
                          className="of-c w-100% h-100%"
                        />
                        <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
                          {member.name[0]}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <div className="d-f fd-c fg-1">
                        <span className="c-slate-10 fs-sm fw-500">
                          {member.name}
                        </span>
                        <span className="c-slate-6 fs-xs">{member.role}</span>
                      </div>
                      <Dialog.Root
                        open={memberToRemove?.name === member.name}
                        onOpenChange={(nextOpen) => {
                          if (!nextOpen) setMemberToRemove(null);
                        }}
                      >
                        <Dialog.Trigger
                          onClick={() => setMemberToRemove(member)}
                          render={
                            <Button className="px-2 py-1 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fs-xs fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-red-6" />
                          }
                        >
                          Remove
                        </Dialog.Trigger>
                        <AnimatePresence>
                          {memberToRemove?.name === member.name && (
                            <Dialog.Portal>
                              <div className="d-f p-f i-0 ai-c jc-c">
                                <Dialog.Popup
                                  render={
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.95 }}
                                      transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                      }}
                                    />
                                  }
                                  className="o-h p-r w-96 bg-white bc-silver-2 c-slate-12 br-xxl bw-1 bs-o-lg"
                                  style={{ maxWidth: "90vw" }}
                                >
                                  <Dialog.Close
                                    render={
                                      <Button className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-9999 h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5" />
                                    }
                                  >
                                    <Xmark aria-hidden className="w-5 h-5" />
                                  </Dialog.Close>
                                  <div className="d-f fd-c ai-c g-3 px-4 py-5 bg-white">
                                    <div className="d-if p-r">
                                      <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bc-white br-9999 bw-1 va-m us-none">
                                        <Avatar.Image
                                          src={memberToRemove.avatar}
                                          alt={memberToRemove.name}
                                          className="of-c w-100% h-100%"
                                        />
                                        <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-sm">
                                          {memberToRemove.name[0]}
                                        </Avatar.Fallback>
                                      </Avatar.Root>
                                      <div className="d-f p-a b-0 r-0 ai-c jc-c w-4 h-4 bg-white br-9999">
                                        <Xmark className="w-3 h-3 c-red" />
                                      </div>
                                    </div>
                                    <div className="d-f fd-c ta-c">
                                      <span className="c-slate-10 fs-sm fw-500">
                                        {memberToRemove.name}
                                      </span>
                                      <span className="c-slate-6 fs-xs">
                                        {memberToRemove.role}
                                      </span>
                                    </div>
                                    <Dialog.Title className="c-slate-10 fs-md fw-500">
                                      Remove {memberToRemove.name}?
                                    </Dialog.Title>
                                    <span className="c-slate-7 fs-sm lh-4 ta-c">
                                      This member will lose access to the
                                      Engineering board and all associated
                                      tasks.
                                    </span>
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
                                        <Button className="px-3 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-red-6" />
                                      }
                                    >
                                      Remove
                                    </Dialog.Close>
                                  </div>
                                </Dialog.Popup>
                              </div>
                            </Dialog.Portal>
                          )}
                        </AnimatePresence>
                      </Dialog.Root>
                    </div>
                  ))}
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

const teamMembers = [
  {
    name: "John",
    role: "Editor",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
  },
  {
    name: "Melanie",
    role: "Admin",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
  {
    name: "Noah",
    role: "Viewer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
  },
];
