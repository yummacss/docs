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
import { useState } from "react";

export default function OnboardingStatic() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  const { icon: Icon, title, description } = items[page];
  const isFirst = page === 0;
  const isLast = page === items.length - 1;

  const goNext = () => {
    if (!isLast) setPage(page + 1);
  };

  const goPrev = () => {
    if (!isFirst) setPage(page - 1);
  };

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setPage(0);
      }}
    >
      <AlertDialog.Trigger
        render={
          <Button className="bg-white px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Start your journey
      </AlertDialog.Trigger>
      {open && (
        <AlertDialog.Portal keepMounted>
          <AlertDialog.Backdrop className="p-f i-0 min-h-dvh bg-black/5 bf-b-xs" />
          <div className="d-f p-f i-0 ai-c jc-c">
            <AlertDialog.Popup
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
                      className="d-f ai-c jc-c w-8 h-8 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  )}
                  {isLast ? (
                    <AlertDialog.Close
                      render={
                        <Button className="d-f ai-c jc-c w-8 h-8 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 bs-o-xs tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5" />
                      }
                    >
                      <Check className="w-4 h-4" />
                    </AlertDialog.Close>
                  ) : (
                    <Button
                      onClick={goNext}
                      className="d-f ai-c jc-c w-8 h-8 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 bs-o-xs tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="px-8 pt-4 pb-10">
                <div className="d-f fd-c ai-c g-3 jc-c h-48 ta-c">
                  <div className="d-ib p-r">
                    <div className="p-a l--3 h-12 w-12 bg-white/70 bc-silver-2 bw-1 br-xl ro--3 tty-1" />
                    <div className="p-a r--3 h-12 w-12 bg-white/70 bc-silver-2 bw-1 br-xl ro-3 tty-1" />
                    <div className="d-f p-r ai-c jc-c h-14 w-14 bg-white bc-silver-2 bw-1 br-xl">
                      <Icon className="w-6 h-6 c-black" />
                    </div>
                  </div>
                  <span className="c-slate-10 fs-md fw-500">{title}</span>
                  <p className="m-0 c-slate-6 fs-sm lh-4">{description}</p>
                </div>
              </div>
            </AlertDialog.Popup>
          </div>
        </AlertDialog.Portal>
      )}
    </AlertDialog.Root>
  );
}

const items = [
  {
    value: "welcome",
    icon: PeaceHand,
    title: "Welcome to the team",
    description:
      "Great to have you on board! Have a look at your projects, work with your team and make your ideas real.",
  },
  {
    value: "team",
    icon: Community,
    title: "Connect with your team",
    description:
      "Browse member directories, join channels, and see what everyone's working on in real time.",
  },
  {
    value: "launch",
    icon: BoxIso,
    title: "Launch your first project",
    description:
      "Create a board, assign tasks, and set milestones. Everything you need to ship faster.",
  },
  {
    value: "ready",
    icon: SparksSolid,
    title: "You're ready to go!",
    description:
      "Your workspace is all set. Start collaborating with your team and make your ideas real.",
  },
];
