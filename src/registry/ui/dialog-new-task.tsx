"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { Check, ChevronsUpDown, X } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DialogNewTask() {
  const [open, setOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [assigneeOpen, setAssigneeOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        New task
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
                  <X aria-hidden className="w-5 h-5" />
                </Dialog.Close>
                <div className="d-f fd-c g-4 px-4 py-5 bg-white">
                  <Dialog.Title className="c-slate-10 fs-md fw-500">
                    New task
                  </Dialog.Title>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Title</label>
                    <Field.Control
                      render={<input />}
                      placeholder="e.g. Redesign landing page"
                      aria-label="Task title"
                      className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">
                      Description
                    </label>
                    <Field.Control
                      render={<textarea />}
                      placeholder="Add details about this task..."
                      aria-label="Task description"
                      className="h-20 w-100% pt-3 pl-3 bg-white bc-silver-3 c-slate-10 br-md bw-1 fs-md r-none fv:oo--1 fv:oc-indigo-5"
                    />
                  </div>
                  <div className="d-f fd-c g-2">
                    <label className="c-slate-10 fs-sm fw-500">Priority</label>
                    <Select.Root
                      defaultValue="medium"
                      open={priorityOpen}
                      onOpenChange={setPriorityOpen}
                    >
                      <Select.Trigger
                        className={`d-f ai-c jc-sb h-10 w-100% bw-1 bc-silver-3 br-md bg-white px-3 c-slate-10 fs-md us-none c-p fv:oo--1 fv:oc-indigo-5 ${
                          priorityOpen ? "bg-silver-1/50" : "bg-transparent"
                        }`}
                      >
                        <Select.Value>
                          {(value) =>
                            value
                              ? priorities.find((p) => p.value === value)?.label
                              : "Select priority..."
                          }
                        </Select.Value>
                        <Select.Icon className="d-f c-slate-8">
                          <ChevronsUpDown className="w-4 h-4" />
                        </Select.Icon>
                      </Select.Trigger>
                      <AnimatePresence>
                        {priorityOpen && (
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
                                  {priorities.map(({ label, value }) => (
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
                  <div className="d-g g-3 sm:gtc-2">
                    <div className="d-f fd-c g-2">
                      <label className="c-slate-10 fs-sm fw-500">
                        Assignee
                      </label>
                      <Autocomplete.Root
                        items={teamMembers}
                        open={assigneeOpen}
                        onOpenChange={setAssigneeOpen}
                      >
                        <Autocomplete.Input
                          placeholder="Name"
                          className="h-10 w-100% pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                        />
                        <AnimatePresence>
                          {assigneeOpen && (
                            <Autocomplete.Portal keepMounted>
                              <Autocomplete.Positioner
                                className="ow-0"
                                sideOffset={8}
                              >
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{
                                    duration: 0.15,
                                    ease: "easeOut",
                                  }}
                                >
                                  <Autocomplete.Popup className="o-h w-42 bg-white bc-silver-2 c-slate-10 bw-1 br-lg bs-o-xs">
                                    <Autocomplete.List className="oy-auto max-h-48 py-1 ow-0">
                                      {(member: TeamMember) => (
                                        <Autocomplete.Item
                                          key={member.name}
                                          value={member.name}
                                          render={(props, state) => (
                                            <div
                                              {...props}
                                              className={`d-f ai-c g-2 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                                                state.highlighted
                                                  ? "bg-silver-1/50"
                                                  : "bg-transparent"
                                              }`}
                                            >
                                              <Avatar.Root className="w-6 h-6 bc-white br-9999 bw-1">
                                                <Avatar.Image
                                                  src={member.avatar}
                                                  className="of-c w-100% h-100% br-9999"
                                                />
                                                <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% bg-silver-2 c-slate-8 fs-xs">
                                                  {member.name[0]}
                                                </Avatar.Fallback>
                                              </Avatar.Root>
                                              <span className="fw-500">
                                                {member.name}
                                              </span>
                                            </div>
                                          )}
                                        />
                                      )}
                                    </Autocomplete.List>
                                    <Autocomplete.Empty className="c-slate-6 fs-sm">
                                      <div className="pt-2 pb-3 px-4 us-none">
                                        No members found.
                                      </div>
                                    </Autocomplete.Empty>
                                  </Autocomplete.Popup>
                                </motion.div>
                              </Autocomplete.Positioner>
                            </Autocomplete.Portal>
                          )}
                        </AnimatePresence>
                      </Autocomplete.Root>
                    </div>
                    <div className="d-f fd-c g-2">
                      <label className="c-slate-10 fs-sm fw-500">
                        Due date
                      </label>
                      <Field.Control
                        render={<input type="date" />}
                        aria-label="Due date"
                        className="h-10 w-100% min-w-0 pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md fv:oo--1 fv:oc-indigo-5"
                      />
                    </div>
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
                    Create task
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

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah",
    role: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9",
  },
  {
    name: "John",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2",
  },
  {
    name: "Noah",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Noah&backgroundColor=D0D1FB",
  },
  {
    name: "Riley",
    role: "Product Manager",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Riley&backgroundColor=F4C8FA",
  },
  {
    name: "Adrian",
    role: "QA Engineer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
  {
    name: "Maria",
    role: "Engineering Lead",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Maria&backgroundColor=DCCEFC",
  },
];
