"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Lock, NavArrowDown } from "iconoir-react";
import { type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

export default function AccordionDisabled() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Accordion.Root
      className="d-f fd-c w-100% max-w-96"
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
                className={`d-f bw-0 ai-c jc-sb g-3 w-100% py-4 px-0 bg-transparent br-sm ta-l ${
                  isDisabled ? "c-na o-50" : "c-p"
                }`}
              >
                <div className="d-f ai-c g-3">
                  <span
                    className={`fs-sm fw-500 ${
                      isDisabled ? "c-slate-4/50" : "c-slate-8"
                    }`}
                  >
                    {item.title}
                  </span>
                  {isDisabled && (
                    <Lock className="w-3 h-3 c-slate-4/50" aria-hidden />
                  )}
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  <NavArrowDown
                    className={`fs-0 w-4 h-4 ${
                      isDisabled ? "c-slate-4/50" : "c-slate-6"
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
              <p className="m-0 pb-4 c-slate-6 fs-sm lh-4">{item.content}</p>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

const faqs = [
  {
    value: "access",
    title: "How do I control team access?",
    content:
      "Go to Team Settings to manage roles. Assign Admin, Member, or Viewer roles. You can also set project-specific permissions for each team member.",
    disabled: true,
  },
  {
    value: "notifications",
    title: "How do I customize notifications?",
    content:
      "Visit Settings > Notifications. Choose what triggers email or in-app alerts. Filter by project, mention, or task status updates.",
    disabled: true,
  },
  {
    value: "sprints",
    title: "How do I manage sprints?",
    content:
      "Create sprints from the Sprint page. Assign tasks from the backlog to the current sprint. Track progress with the burndown chart.",
    disabled: true,
  },
];
