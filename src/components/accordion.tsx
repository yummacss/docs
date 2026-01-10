"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import type * as React from "react";

interface AccordionProps
  extends React.ComponentProps<typeof BaseAccordion.Root> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Accordion({
  children,
  className = "",
  style,
  ...props
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={`d-f fd-c w-full ${className}`}
      style={style}
      {...props}
    >
      {children}
    </BaseAccordion.Root>
  );
}

interface AccordionItemProps
  extends React.ComponentProps<typeof BaseAccordion.Item> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function AccordionItem({
  children,
  className = "",
  style,
  ...props
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={`bbw-1 bc-white/10 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </BaseAccordion.Item>
  );
}

interface AccordionTriggerProps
  extends React.ComponentProps<typeof BaseAccordion.Trigger> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function AccordionTrigger({
  children,
  className = "",
  style,
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="m-0">
      <BaseAccordion.Trigger
        className={`d-f ai-c jc-sb w-full g-4 py-3 px-4 bw-0 m-0 ta-l c-white fw-500 fs-sm c-p h:bg-white/5 us-none ${className}`}
        style={{
          background: "none",
          fontFamily: "inherit",
          outline: "none",
          ...style,
        }}
        {...props}
      >
        <span className="f-1 ff-s fs-md fw-600">{children}</span>
        <PlusIcon
          size={16}
          weight="bold"
          className="c-white/60 fs-0 accordion-icon"
        />
      </BaseAccordion.Trigger>
      <style jsx global>{`
        [data-panel-open] .accordion-icon {
          transform: rotate(45deg);
          color: white;
        }
      `}</style>
    </BaseAccordion.Header>
  );
}

interface AccordionPanelProps
  extends React.ComponentProps<typeof BaseAccordion.Panel> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function AccordionPanel({
  children,
  className = "",
  style,
  ...props
}: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={`o-h c-white/70 fs-sm lh-4 ${className}`}
      style={{
        height: "var(--accordion-panel-height)",
        ...style,
      }}
      {...props}
    >
      <div className="px-4 pb-4">{children}</div>
    </BaseAccordion.Panel>
  );
}
