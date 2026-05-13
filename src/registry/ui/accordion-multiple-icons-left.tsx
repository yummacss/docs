"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Minus, Plus } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

export default function AccordionMultipleIconsLeft() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Accordion.Root
      className="d-f fd-c w-100% max-w-96"
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
              <Accordion.Trigger className="d-f ai-c g-3 w-100% py-4 px-0 bg-transparent bw-0 br-sm ta-l c-p fv:ow-2 fv:oo-1 fv:oc-indigo-5">
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  {isOpen ? (
                    <Minus className="fs-0 w-4 h-4 c-slate-6" aria-hidden />
                  ) : (
                    <Plus className="fs-0 w-4 h-4 c-slate-6" aria-hidden />
                  )}
                </motion.span>
                <span className="c-slate-8 fs-sm fw-500">{item.title}</span>
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
  },
  {
    value: "notifications",
    title: "How do I customize notifications?",
    content:
      "Visit Settings > Notifications. Choose what triggers email or in-app alerts. Filter by project, mention, or task status updates.",
  },
  {
    value: "sprints",
    title: "How do I manage sprints?",
    content:
      "Create sprints from the Sprint page. Assign tasks from the backlog to the current sprint. Track progress with the burndown chart.",
  },
];
