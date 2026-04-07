"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "@gravity-ui/icons";
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
      {faqs.map((item, index) => {
        const isOpen = value.includes(item.value);
        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            className={`blw-2 pl-4 ${isOpen ? "blc-indigo-5" : "blc-silver-3"} ${index === faqs.length - 1 ? "" : "mb-3"}`}
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full py-2 px-0 bg-transparent br-sm ta-l c-p fv:os-s fv:ow-2 fv:oo-1 fv:oc-indigo-6">
                <span
                  className={`fs-sm fw-500 ${isOpen ? "c-indigo-6" : "c-slate-8"}`}
                >
                  {item.title}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  <ChevronDown
                    className={`w-4 h-4 fs-0 ${isOpen ? "c-indigo-5" : "c-slate-6"}`}
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
              <p className="m-0 pt-1 pb-2 c-slate-6 fs-sm lh-4">
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
