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
    <ol className="p-r ml-4 bc-white/10 blw-1">
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
        className="d-f p-a l--3 ai-c jc-c w-6 h-6 bw-1 br-1"
        style={{
          borderColor: "#323652",
          backgroundColor: "#21243f",
        }}
      >
        <span className="c-white fs-xs">{stepNumber}</span>
      </div>
      <div className="d-f ai-c mb-2">
        <p className="c-white">{title}</p>
      </div>
      <div className="c-white/80 my-5">{children}</div>
    </li>
  );
}

export default Stepper;
