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
    value: "returns",
    title: "What is your return policy?",
    content:
      "You can return most items within 30 days of delivery. Items must be unused and in original packaging. Start a return from your order history.",
  },
  {
    value: "shipping",
    title: "How long does shipping take?",
    content:
      "Standard shipping takes 5-7 business days. Express shipping is 2-3 days. Free shipping is available on orders over $50.",
  },
  {
    value: "payment",
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. You can also save your payment methods for faster checkout.",
  },
];
