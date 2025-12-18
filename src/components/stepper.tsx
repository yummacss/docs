"use client";

import React from "react";

interface StepperProps {
  children: React.ReactNode;
}

interface StepProps {
  children: React.ReactNode;
  title?: string;
}

// interface for injected props
interface InjectedStepProps {
  stepNumber?: number;
  isLast?: boolean;
}

export function Stepper({ children }: StepperProps) {
  const childArray = React.Children.toArray(children);

  return (
    <ol className="p-r ml-4 bl-1" style={{ borderColor: "#31365e" }}>
      {childArray.map((child, i) => {
        if (React.isValidElement<StepProps & InjectedStepProps>(child)) {
          return React.cloneElement(child, {
            stepNumber: i + 1,
            isLast: i === childArray.length - 1,
          });
        }
        return child;
      })}
    </ol>
  );
}

export function Step({
  children,
  title,
  stepNumber,
  isLast,
}: StepProps & InjectedStepProps) {
  return (
    <li className={isLast ? "ml-8" : "mb-10 ml-8"}>
      <div
        className="p-a d-f h-8 w-8 ai-c jc-c b-1 rad-9"
        style={{
          borderColor: "#323652",
          backgroundColor: "#21243f",
          left: "-1rem",
        }}
      >
        <span className="fs-sm fw-500 tc-white fw-600">{stepNumber}</span>
      </div>
      <div className="mb-2 d-f ai-c">
        <h3 className="fw-500 tc-white">{title}</h3>
      </div>
      <div className="tc-white/80 my-5">{children}</div>
    </li>
  );
}

export default Stepper;
