"use client";

import { Accordion } from "@base-ui/react/accordion";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { type HTMLMotionProps, motion } from "motion/react";
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
              <Accordion.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full py-4 px-0 bg-transparent br-1 ta-l c-p fv:os-s fv:ow-2 fv:oo-1 fv:oc-indigo-6">
                <span className="c-slate-8 fs-sm fw-500">{item.title}</span>
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
                      className="fs-0 c-slate-6"
                      aria-hidden
                    />
                  ) : (
                    <PlusIcon
                      size={16}
                      weight="bold"
                      className="fs-0 c-slate-6"
                      aria-hidden
                    />
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
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
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
