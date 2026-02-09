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
      multiple
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
              <p className="m-0 pb-4 fs-sm c-slate-6 lh-4">{item.content}</p>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

const items = [
  {
    value: "features",
    title: "What features are included?",
    content:
      "All plans include unlimited projects, 24/7 support, advanced analytics, custom domains, and team collaboration tools.",
  },
  {
    value: "pricing",
    title: "How does pricing work?",
    content:
      "We offer monthly and annual billing. Annual plans save you 20%. You can upgrade, downgrade, or cancel anytime.",
  },
  {
    value: "trial",
    title: "Is there a free trial?",
    content:
      "Yes! Start with a 14-day free trial. No credit card required. Cancel anytime during the trial period.",
  },
];
