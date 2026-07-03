"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import {
  ArrowLeft,
  ArrowRight,
  BoxIso,
  Check,
  Community,
  PeaceHand,
  SparksSolid,
} from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function OnboardingChecklist() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [checked, setChecked] = useState<Record<string, Set<string>>>({});

  const { icon: Icon, title, description, tasks } = items[page];
  const isFirst = page === 0;
  const isLast = page === items.length - 1;

  const done = checked[items[page].value]?.size ?? 0;
  const total = tasks?.length ?? 0;
  const allDone = done >= total;

  const goNext = () => {
    if (!isLast) setPage(page + 1);
  };

  const goPrev = () => {
    if (!isFirst) setPage(page - 1);
  };

  const toggleTask = (taskId: string) => {
    setChecked((prev) => {
      const next = new Set(prev[items[page].value] ?? []);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return { ...prev, [items[page].value]: next };
    });
  };

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setPage(0);
          setChecked({});
        }
      }}
    >
      <AlertDialog.Trigger
        render={
          <Button className="bg-white px-3 py-2 bc-silver-2 c-slate-10 br-lg bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Start your journey
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
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              }
              className="p-f i-0 min-h-dvh bg-black/5 bf-b-xs"
            />
            <div className="d-f p-f i-0 ai-c jc-c">
              <AlertDialog.Popup
                render={
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                      layout: { duration: 0.25, ease: "easeOut" },
                    }}
                  />
                }
                className="o-h p-r w-96 bg-white bc-silver-2 c-slate-12 br-xxl bw-1 bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <div className="d-f ai-c jc-sb px-8 pt-5">
                  <span className="c-slate-5 fs-xs">
                    {page + 1} / {items.length}
                  </span>
                  <div className="d-f g-2">
                    {!isFirst && (
                      <Button
                        onClick={goPrev}
                        className="d-f ai-c jc-c w-8 h-8 bg-white bc-silver-2 c-slate-10 br-lg bw-1 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    )}
                    {isLast ? (
                      <AlertDialog.Close
                        render={
                          <Button className="d-f ai-c jc-c w-8 h-8 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-lg bw-1 bs-o-xs tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5" />
                        }
                      >
                        <Check className="w-4 h-4" />
                      </AlertDialog.Close>
                    ) : (
                      <Button
                        onClick={goNext}
                        disabled={!allDone}
                        className={`d-f ai-c jc-c w-8 h-8 br-lg bw-1 bs-o-xs tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5 ${
                          allDone
                            ? "bg-indigo h:bg-indigo-8 bc-indigo-7 c-white"
                            : "bg-silver-1 bc-silver-2 c-slate-4"
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="px-8 pt-4 pb-10">
                  <div className="d-f o-h fd-c ai-c ta-c">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={page}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="d-f fd-c ai-c g-3"
                      >
                        <div className="d-ib p-r">
                          <div className="p-a l--3 h-12 w-12 bg-white/70 bc-silver-2 bw-1 br-xl ro--3 tty-1" />
                          <div className="p-a r--3 h-12 w-12 bg-white/70 bc-silver-2 bw-1 br-xl ro-3 tty-1" />
                          <div className="d-f p-r ai-c jc-c h-14 w-14 bg-white bc-silver-2 bw-1 br-xl">
                            <Icon className="w-6 h-6 c-black" />
                          </div>
                        </div>
                        <span className="c-slate-10 fs-md fw-500">{title}</span>
                        <p className="m-0 c-slate-6 fs-sm lh-4">
                          {description}
                        </p>
                        {tasks && tasks.length > 0 && (
                          <div className="d-f fd-c g-2 w-100% pt-2 ta-l">
                            {tasks.map((task) => {
                              const isChecked =
                                checked[items[page].value]?.has(task.id) ??
                                false;
                              return (
                                <button
                                  key={task.id}
                                  type="button"
                                  onClick={() => toggleTask(task.id)}
                                  className={`d-f ai-c g-2 px-3 py-2 w-100% br-lg bw-0 fs-sm ta-l us-none c-p fv:oo-2 fv:oc-indigo-5 ${
                                    isChecked
                                      ? "bg-green-1/30"
                                      : "bg-silver-1/50"
                                  }`}
                                >
                                  <div
                                    className={`d-f ai-c jc-c w-4 h-4 br-sm bw-1 fs-0 ${
                                      isChecked
                                        ? "bg-green bc-green-5 c-white bw-0"
                                        : "bc-silver-3"
                                    }`}
                                  >
                                    {isChecked && <Check className="w-3 h-3" />}
                                  </div>
                                  <span
                                    className={
                                      isChecked ? "c-green-7" : "c-slate-10"
                                    }
                                  >
                                    {task.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </AlertDialog.Popup>
            </div>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}

interface OnboardingItem {
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tasks?: { id: string; label: string }[];
}

const items: OnboardingItem[] = [
  {
    value: "welcome",
    icon: PeaceHand,
    title: "Welcome to the team",
    description:
      "Great to have you on board! Complete a few setup steps to get started.",
    tasks: [
      { id: "profile", label: "Set up your profile" },
      { id: "preferences", label: "Configure workspace preferences" },
    ],
  },
  {
    value: "team",
    icon: Community,
    title: "Connect with your team",
    description: "Invite your colleagues and start collaborating right away.",
    tasks: [
      { id: "invite", label: "Invite team members" },
      { id: "channels", label: "Join project channels" },
      { id: "role", label: "Assign team roles" },
    ],
  },
  {
    value: "launch",
    icon: BoxIso,
    title: "Launch your first project",
    description:
      "Create a board, assign tasks, and set milestones. Everything you need to ship faster.",
    tasks: [
      { id: "board", label: "Create a project board" },
      { id: "milestone", label: "Set a milestone" },
    ],
  },
  {
    value: "ready",
    icon: SparksSolid,
    title: "You're ready to go!",
    description:
      "Your workspace is all set. Start collaborating with your team and make your ideas real.",
    tasks: [],
  },
];
