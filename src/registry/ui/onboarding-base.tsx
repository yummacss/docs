"use client";

import { Button } from "@base-ui/react/button";
import { ArrowLeft, ArrowRight, Check, Rocket, UsersRound, LayoutGrid } from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    title: "Create a project",
    description: "Set up your first project, define goals, and invite context for your team to start working.",
    Icon: Rocket,
  },
  {
    title: "Invite your team",
    description: "Add members, assign roles, and set permissions so everyone has the right access.",
    Icon: UsersRound,
  },
  {
    title: "Set up your board",
    description: "Create columns, add tasks, and configure workflows that match your team's process.",
    Icon: LayoutGrid,
  },
];

export default function OnboardingBase() {
  const [step, setStep] = useState(0);

  const isLast = step === STEPS.length - 1;

  return (
    <div className="d-f fd-c ai-c jc-c g-6 p-8 h-56">
      <div className="d-f g-3">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`d-f ai-c jc-c w-8 h-8 br-9999 fs-xs fw-500 ${
              i <= step
                ? "bg-indigo c-white"
                : "bg-silver-1 c-slate-6"
            }`}
          >
            {i < step ? <Check className="w-4 h-4" /> : i + 1}
          </div>
        ))}
      </div>
      <div className="d-f fd-c ai-c g-2 ta-c">
        {(() => {
          const { Icon, title, description } = STEPS[step];
          return (
            <>
              <div className="d-f ai-c jc-c w-10 h-10 bc-silver-3 c-indigo br-lg bw-1 bs-o-xs">
                <Icon className="w-5 h-5" />
              </div>
              <span className="c-slate-10 fs-md fw-500">{title}</span>
              <span className="c-slate-6 fs-sm">{description}</span>
            </>
          );
        })()}
      </div>
      <div className="d-f g-3">
        {step > 0 && (
          <Button
            onClick={() => setStep(step - 1)}
            className="d-if ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        <Button
          onClick={() => isLast ? setStep(0) : setStep(step + 1)}
          className="d-if ai-c g-2 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5"
        >
          {isLast ? "Get started" : "Next"}
          {!isLast && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
