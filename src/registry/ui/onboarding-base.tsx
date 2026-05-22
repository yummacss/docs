"use client";

import { Progress } from "@base-ui/react/progress";
import { Tabs } from "@base-ui/react/tabs";
import { ArrowLeft, ArrowRight, LayoutGrid, Rocket, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const STEPS = [
  { value: "plan", label: "Plan", Icon: Rocket, title: "Create a project", description: "Set up your first project, define goals, and invite context for your team to start working." },
  { value: "build", label: "Build", Icon: LayoutGrid, title: "Set up your board", description: "Create columns, add tasks, and configure workflows that match your team's process." },
  { value: "launch", label: "Launch", Icon: UsersRound, title: "Invite your team", description: "Add members, assign roles, and set permissions so everyone has the right access." },
];

const stepIndex = (v: string) => STEPS.findIndex((s) => s.value === v);

export default function OnboardingBase() {
  const [step, setStep] = useState(STEPS[0].value);

  const idx = stepIndex(step);
  const progress = ((idx + 1) / STEPS.length) * 100;
  const isLast = idx === STEPS.length - 1;

  return (
    <Tabs.Root value={step} onValueChange={setStep} className="d-f fd-c g-6 p-8 h-56">
      <Progress.Root className="d-f fd-c g-2 w-100%" value={progress}>
        <Progress.Track className="o-h h-1.5 bg-silver-2 br-9999">
          <Progress.Indicator
            render={
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            }
            className="h-100% bg-indigo br-9999"
          />
        </Progress.Track>
      </Progress.Root>
      <Tabs.List className="d-f g-3 jc-c">
        {STEPS.map(({ value, label, Icon }) => (
          <Tabs.Tab
            key={value}
            value={value}
            disabled={stepIndex(value) > idx + 1}
            className={`d-f ai-c g-2 px-3 py-2 bg-transparent us-none c-p fv:oo--1 fv:oc-indigo-5 br-md fs-sm fw-500 ${
              step === value
                ? "c-indigo"
                : "c-slate-6 h:c-slate-10"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {STEPS.map(({ value, title, description }) => (
        <Tabs.Panel key={value} value={value} className="d-f fd-c ai-c g-2 ta-c">
          <span className="c-slate-10 fs-md fw-500">{title}</span>
          <span className="c-slate-6 fs-sm">{description}</span>
        </Tabs.Panel>
      ))}
      <div className="d-f g-3 jc-c">
        {idx > 0 && (
          <button
            type="button"
            onClick={() => setStep(STEPS[idx - 1].value)}
            className="d-if ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <button
          type="button"
          onClick={() => isLast ? setStep(STEPS[0].value) : setStep(STEPS[idx + 1].value)}
          className="d-if ai-c g-2 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5"
        >
          {isLast ? "Get started" : "Next"}
          {!isLast && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </Tabs.Root>
  );
}
