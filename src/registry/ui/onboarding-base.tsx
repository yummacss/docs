"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Tabs } from "@base-ui/react/tabs";
import {
  ArrowLeft,
  ArrowRight,
  PartyPopper,
  Rocket,
  UsersRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PAGES = [
  {
    value: "welcome",
    icon: PartyPopper,
    title: "Welcome to the team",
    description:
      "Great to have you on board! Get stuck into your projects, work with your team and make your ideas real.",
  },
  {
    value: "team",
    icon: UsersRound,
    title: "Connect with your team",
    description:
      "Browse member directories, join channels, and see what everyone's working on in real time.",
  },
  {
    value: "launch",
    icon: Rocket,
    title: "Launch your first project",
    description:
      "Create a board, assign tasks, and set milestones. Everything you need to ship faster.",
  },
];

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
};

export default function OnboardingBase() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleTabChange = (value: string) => {
    const idx = PAGES.findIndex((p) => p.value === value);
    setDirection(idx > page ? 1 : -1);
    setPage(idx);
  };

  const goNext = () => {
    if (page < PAGES.length - 1) {
      setDirection(1);
      setPage(page + 1);
    }
  };

  const goPrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage(page - 1);
    }
  };

  const { icon: Icon, title, description } = PAGES[page];
  const isFirst = page === 0;
  const isLast = page === PAGES.length - 1;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setPage(0);
      }}
    >
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Start your journey
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
                className="o-h w-96 bg-white bc-silver-2 c-slate-12 br-xxl bw-1 bs-o-lg p-r"
                style={{ maxWidth: "90vw" }}
              >
                <Dialog.Close
                  render={
                    <Button className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 c-slate-6 bw-0 br-md h:bg-silver-2 fv:oo-2 fv:oc-indigo-5" />
                  }
                >
                  <X aria-hidden className="w-4 h-4" />
                </Dialog.Close>
                <div className="px-8 pt-10 pb-6">
                  <div className="d-f fd-c ai-c jc-c ta-c h-48 o-h">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={page}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="d-f fd-c ai-c g-3"
                      >
                        <div className="d-f ai-c jc-c w-12 h-12 bg-indigo-1/50 c-indigo br-100%">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="c-slate-10 fs-md fw-500">{title}</span>
                        <p className="c-slate-6 fs-sm lh-4 m-0">
                          {description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="d-f ai-c jc-c g-4 pb-8">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={isFirst}
                    className={`d-f ai-c jc-c w-8 h-8 bw-0 br-md us-none fv:oo--1 fv:oc-indigo-5 ${
                      isFirst
                        ? "c-slate-3"
                        : "c-slate-6 h:bg-silver-1 h:c-slate-10 c-p"
                    }`}
                    aria-label="Previous"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <Tabs.Root
                    value={PAGES[page].value}
                    onValueChange={handleTabChange}
                  >
                    <Tabs.List className="d-f g-2 jc-c">
                      {PAGES.map(({ value }) => (
                        <Tabs.Tab
                          key={value}
                          value={value}
                          className={(state) =>
                            `d-f ai-c jc-c w-4 h-4 br-100% bw-0 us-none c-p fv:oo--1 fv:oc-indigo-5 ${
                              state.active ? "bg-indigo" : "bg-silver-2"
                            }`
                          }
                        />
                      ))}
                    </Tabs.List>
                  </Tabs.Root>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={isLast}
                    className={`d-f ai-c jc-c w-8 h-8 bw-0 br-md us-none fv:oo--1 fv:oc-indigo-5 ${
                      isLast
                        ? "c-slate-3"
                        : "c-slate-6 h:bg-silver-1 h:c-slate-10 c-p"
                    }`}
                    aria-label="Next"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
