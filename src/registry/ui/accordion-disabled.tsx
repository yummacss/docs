"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown, Lock } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export default function AccordionDisabled() {
  const [value, setValue] = React.useState<string[]>(["starter"]);

  return (
    <Accordion.Root
      className="d-f fd-c w-full max-w-96"
      value={value}
      onValueChange={setValue}
    >
      {faqs.map((item, index) => {
        const isOpen = value.includes(item.value);
        const isDisabled = item.disabled;
        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            disabled={isDisabled}
            className={index === faqs.length - 1 ? "" : "bbw-1 bc-silver-3"}
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger
                className={`d-f b-0 ai-c jc-sb g-3 w-full py-4 px-0 bg-transparent br-sm ta-l ${
                  isDisabled ? "pe-none" : "c-p fv:ow-2 fv:oo-1 fv:oc-indigo-6"
                }`}
              >
                <div className="d-f ai-c g-3">
                  <span
                    className={`fs-sm fw-500 ${
                      isOpen ? "c-indigo-6" : isDisabled ? "c-slate-4" : "c-slate-8"
                    }`}
                  >
                    {item.title}
                  </span>
                  {isDisabled && (
                    <Lock className="w-3 h-3 c-slate-2" aria-hidden />
                  )}
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  <ChevronDown
                    className={`fs-0 w-4 h-4 ${
                      isOpen ? "c-indigo-5" : isDisabled ? "c-slate-2" : "c-slate-6"
                    }`}
                    aria-hidden
                  />
                </motion.span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel
              keepMounted
              render={(props) => (
                <motion.div
                  {...(props as HTMLMotionProps<"div">)}
                  initial={false}
                  animate={
                    isOpen
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="d-b o-h"
                />
              )}
            >
              <p className="m-0 pb-4 c-slate-6 fs-sm lh-4">
                {item.content}
              </p>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

const faqs = [
  {
    value: "starter",
    title: "Starter Plan",
    content:
      "Perfect for small teams getting started. Includes 5 projects, 10GB storage, and email support. All core features included.",
    disabled: false,
  },
  {
    value: "professional",
    title: "Professional Plan",
    content:
      "Advanced analytics, unlimited projects, priority support, and custom integrations. Perfect for growing teams.",
    disabled: false,
  },
  {
    value: "enterprise",
    title: "Enterprise Plan",
    content:
      "Dedicated account manager, SSO, SLA guarantee, and custom contracts. Contact sales for pricing details.",
    disabled: true,
  },
];