"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { type ReactNode, useId } from "react";
import { merge } from "yummacss/merge";
import Checkbox from "./checkbox";

export interface CheckboxGroupProps {
  className?: string;
  children: ReactNode;
  label?: ReactNode;
  parentLabel?: ReactNode;
  allValues?: string[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  name?: string;
}

export default function CheckboxGroupBase({
  className,
  children,
  label,
  parentLabel,
  allValues,
  value,
  defaultValue,
  onValueChange,
  disabled,
  name,
}: CheckboxGroupProps) {
  const labelId = useId();

  return (
    <CheckboxGroup
      aria-labelledby={label ? labelId : undefined}
      aria-label={
        !label && typeof parentLabel === "string" ? parentLabel : undefined
      }
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      allValues={allValues}
      disabled={disabled}
      className={merge("d:f fd:c g:2 c:slate-10", className)}
    >
      {label && (
        <div className="fs:xs fw:600 c:slate-5 us:none" id={labelId}>
          {label}
        </div>
      )}
      {parentLabel && <Checkbox name={name} parent label={parentLabel} />}
      <div className={merge("d:f fd:c g:2", parentLabel ? "ml:6" : undefined)}>
        {children}
      </div>
    </CheckboxGroup>
  );
}
