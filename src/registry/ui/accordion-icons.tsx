"use client";

import { Accordion } from "@base-ui/react/accordion";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export default function ExampleAccordion() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Accordion.Root
      className="d-f fd-c w-full max-w-96"
      value={value}
      onValueChange={setValue}
    >
      {items.map((item, index) => {
        const isOpen = value.includes(item.value);
        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            className={index === items.length - 1 ? "" : "bbw-1 bc-silver-3"}
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="d-f w-full ai-c jc-sb g-3 py-4 px-0 bg-transparent b-0 c-p ta-l br-1 fv:os-s fv:ow-2 fv:oo-1 fv:oc-indigo-6">
                <span className="fs-sm fw-500 c-slate-8">{item.title}</span>
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  {isOpen ? (
                    <MinusIcon
                      size={16}
                      weight="bold"
                      className="c-slate-6 fs-0"
                      aria-hidden
                    />
                  ) : (
                    <PlusIcon
                      size={16}
                      weight="bold"
                      className="c-slate-6 fs-0"
                      aria-hidden
                    />
                  )}
                </motion.span>
              </Accordion.Trigger>
            </Accordion.Header>
            <AnimatePresence initial={false}>
              {isOpen && (
                <Accordion.Panel
                  keepMounted
                  render={(props) => (
                    <motion.div
                      {...(props as HTMLMotionProps<"div">)}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="o-h"
                    />
                  )}
                >
                  <p className="m-0 pb-4 fs-sm c-slate-6 lh-4">
                    {item.content}
                  </p>
                </Accordion.Panel>
              )}
            </AnimatePresence>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

const items = [
  {
    value: "customization",
    title: "Can I customize the design?",
    content:
      "Yes! Use our theme editor to customize colors, fonts, spacing, and more. Or add custom CSS for complete control.",
  },
  {
    value: "integrations",
    title: "What integrations are available?",
    content:
      "We integrate with Slack, GitHub, Figma, Notion, Zapier, and 100+ other tools via our API and webhooks.",
  },
  {
    value: "support",
    title: "How can I get help?",
    content:
      "Access our help center, live chat support, or email us. Enterprise plans include dedicated account managers.",
  },
];
