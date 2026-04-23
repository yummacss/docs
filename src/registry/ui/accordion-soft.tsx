"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

export default function AccordionSoft() {
  const [value, setValue] = useState<string[]>([]);

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
            className={`br-md ${isOpen ? "bg-indigo-1" : "bg-indigo-1 h:bg-indigo-2"}`}
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full py-3 px-4 bg-transparent br-sm ta-l c-p fv:ow-2 fv:oo-1 fv:oc-indigo-6">
                <span className="fs-sm fw-500 c-indigo-7">
                  {item.title}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  <ChevronDown
                    className="w-4 h-4 fs-0 c-indigo-5"
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
              <p className="m-0 px-4 pb-3 c-indigo-9 fs-sm lh-4">
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
    value: "email",
    title: "How do I configure email notifications?",
    content:
      "Go to Settings > Notifications and toggle email alerts. Choose when to receive them: immediately, daily digest, or weekly summary.",
  },
  {
    value: "slack",
    title: "Can I receive notifications in Slack?",
    content:
      "Yes, install the Slack integration in Settings > Integrations. Map workspace events to specific Slack channels.",
  },
  {
    value: "appearance",
    title: "How do I customize the workspace theme?",
    content:
      "Navigate to Settings > Appearance to choose between Light, Dark, or System. You can also add a custom logo and brand colors.",
  },
];