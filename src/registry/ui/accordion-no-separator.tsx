"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

export default function AccordionNoSeparator() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Accordion.Root
      className="d-f fd-c w-full max-w-96"
      value={value}
      onValueChange={setValue}
    >
      {faqs.map((item) => {
        const isOpen = value.includes(item.value);
        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            className={isOpen ? "" : ""}
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full py-3 px-0 bg-transparent br-sm ta-l c-p fv:ow-2 fv:oo-1 fv:oc-indigo-6">
                <span className="fs-sm fw-500 c-slate-8">{item.title}</span>
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
    value: "specs",
    title: "Product Specifications",
    content:
      "Display: 6.7-inch AMOLED, 120Hz refresh rate. Processor: Octa-core 3.2GHz. RAM: 12GB LPDDR5. Storage: 256GB UFS 4.0. Battery: 5000mAh with 65W fast charging.",
  },
  {
    value: "shipping",
    title: "Shipping Information",
    content:
      "Free standard shipping on all orders. Express delivery in 2-3 business days for $9.99. International shipping available to 40+ countries. Order processing within 24 hours.",
  },
  {
    value: "warranty",
    title: "Warranty & Returns",
    content:
      "2-year manufacturer warranty included. 30-day hassle-free returns. Extended warranty available at checkout. Worldwide service center support.",
  },
];
