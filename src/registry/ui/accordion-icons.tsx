"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Minus, Plus } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export default function AccordionIcons() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Accordion.Root
      className="d-f fd-c w-full max-w-96"
      value={value}
      onValueChange={setValue}
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
    value: "integrations",
    title: "How do I add third-party integrations?",
    content:
      "Go to Settings > Integrations to browse available apps. Click Install and authorize the connection in your workspace.",
  },
  {
    value: "webhooks",
    title: "How do I set up outgoing webhooks?",
    content:
      "Navigate to Settings > Webhooks to create custom endpoints. Configure events like task created, status changed, or comment added.",
  },
  {
    value: "api",
    title: "Can I build custom API integrations?",
    content:
      "Yes, generate an API key in Settings > API. Use REST or GraphQL endpoints to read, create, and update resources programmatically.",
  },
];
