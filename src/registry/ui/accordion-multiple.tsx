"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export default function AccordionMultiple() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Accordion.Root
      className="d-f fd-c w-full max-w-96"
      value={value}
      onValueChange={setValue}
      multiple
    >
      {faqs.map((item, index) => {
        const isOpen = value.includes(item.value);
        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            className={index === faqs.length - 1 ? "" : "bbw-1 bc-silver-3"}
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full py-4 px-0 bg-transparent br-sm ta-l c-p fv:ow-2 fv:oo-1 fv:oc-indigo-6">
                <span className="c-slate-8 fs-sm fw-500">{item.title}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  <ChevronDown className="fs-0 w-4 h-4 c-slate-6" aria-hidden />
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
    value: "suspend",
    title: "How do I suspend a team member?",
    content:
      "Go to Team Settings > Members, select a user, and choose Suspend. Their access is frozen and they cannot log in during suspension.",
  },
  {
    value: "remove",
    title: "How do I remove a member from the workspace?",
    content:
      "Click the member's menu and select Remove. You can choose to keep or remove their content from the workspace.",
  },
  {
    value: "logs",
    title: "Where can I review moderation actions?",
    content:
      "All actions are logged in Settings > Audit Log. Filter by action type to review suspensions, removals, and permission changes.",
  },
];
