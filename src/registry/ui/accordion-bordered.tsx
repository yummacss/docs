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
              <Accordion.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full py-3 px-4 bg-transparent br-sm ta-l c-p fv:os-s fv:ow-2 fv:oo-1 fv:oc-indigo-6">
                <span className="c-slate-8 fs-sm fw-500">{item.title}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  <ChevronDown className="w-4 h-4 fs-0 c-slate-6" aria-hidden />
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
