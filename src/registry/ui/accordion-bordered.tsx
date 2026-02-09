"use client";

import { Accordion } from "@base-ui/react/accordion";
import { CaretDownIcon } from "@phosphor-icons/react";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export default function ExampleAccordion() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Accordion.Root
      className="d-f fd-c g-2 w-full max-w-96"
      value={value}
      onValueChange={setValue}
    >
      {items.map((item) => {
        const isOpen = value.includes(item.value);
        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            className="bw-1 bc-silver-3 br-2 bg-white"
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="d-f w-full ai-c jc-sb g-3 py-3 px-4 bg-transparent b-0 c-p ta-l br-1 fv:os-s fv:ow-2 fv:oo-1 fv:oc-indigo-6">
                <span className="fs-sm fw-500 c-slate-8">{item.title}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  <CaretDownIcon
                    size={16}
                    weight="bold"
                    className="c-slate-6 fs-0"
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
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="d-b o-h"
                />
              )}
            >
              <p className="m-0 px-4 pb-3 fs-sm c-slate-6 lh-4">
                {item.content}
              </p>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

const items = [
  {
    value: "account",
    title: "How do I create an account?",
    content:
      "Click the 'Sign Up' button in the top right corner. Enter your email, create a password, and verify your email address.",
  },
  {
    value: "security",
    title: "Is my data secure?",
    content:
      "Yes. We use industry-standard encryption, regular security audits, and comply with GDPR and SOC 2 standards.",
  },
  {
    value: "export",
    title: "Can I export my data?",
    content:
      "Absolutely. Export your data anytime in CSV, JSON, or PDF format from your account settings.",
  },
];
