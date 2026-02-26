"use client";

import { Accordion } from "@base-ui/react/accordion";
import { CaretDownIcon } from "@phosphor-icons/react";
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
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="d-f"
                >
                  <CaretDownIcon
                    size={16}
                    weight="bold"
                    className="fs-0 c-slate-6"
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
                  className="o-h pb-4 c-slate-6 fs-sm lh-4"
                />
              )}
            >
              {item.content}
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

const items = [
  {
    value: "shipping",
    title: "What are the shipping options?",
    content:
      "We offer free standard shipping on all orders over $50. Express and next-day delivery are available at checkout for an additional fee.",
  },
  {
    value: "returns",
    title: "How do returns work?",
    content:
      "You have 30 days from delivery to return any unused item. Simply initiate a return through your account dashboard and print the prepaid label.",
  },
  {
    value: "payment",
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. Installment plans are available through Klarna for orders over $100.",
  },
];
