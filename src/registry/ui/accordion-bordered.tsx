"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export default function AccordionBordered() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Accordion.Root
      className="d-f fd-c g-2 w-full max-w-96"
      value={value}
      onValueChange={setValue}
    >
      {faqs.map((item) => {
        const isOpen = value.includes(item.value);
        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            className="bg-white bc-silver-3 bw-1 br-md"
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full py-3 px-4 bg-transparent br-sm ta-l c-p fv:ow-2 fv:oo-1 fv:oc-indigo-6">
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
              <p className="m-0 px-4 pb-3 c-slate-6 fs-sm lh-4">
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
    value: "visibility",
    title: "Who can see my workspace activity?",
    content:
      "Go to Settings > Privacy to control visibility. You can choose between team members, workspace admins, or public access.",
  },
  {
    value: "blocking",
    title: "How do I block a member from my workspace?",
    content:
      "Open the member profile, click the three dots, and select Remove. They won't be able to rejoin without an invitation.",
  },
  {
    value: "audit",
    title: "Can I see who accessed sensitive documents?",
    content:
      "Yes, go to Settings > Audit Log to view a complete history of document access, edits, and downloads with timestamps.",
  },
];
