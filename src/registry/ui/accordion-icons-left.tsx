"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Minus, Plus } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

export default function AccordionIconsLeft() {
  const [value, setValue] = useState<string[]>([]);

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
              <Accordion.Trigger className="d-f b-0 ai-c g-3 w-full py-4 px-0 bg-transparent br-sm ta-l c-p fv:ow-2 fv:oo-1 fv:oc-indigo-6">
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
                <span className="c-slate-8 fs-sm fw-500">{item.title}</span>
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
    value: "privacy",
    title: "Who can see my profile information?",
    content:
      "Go to Settings > Privacy to choose who sees your profile. Options are Everyone, Friends Only, or Only Me. Post visibility is set per post.",
  },
  {
    value: "reporting",
    title: "How do I report a user or post?",
    content:
      "Tap the three dots on any post or profile and select Report. Choose the reason and provide any additional details. Our team reviews all reports within 24 hours.",
  },
  {
    value: "blocking",
    title: "Can I block someone without them knowing?",
    content:
      "Yes, go to a user's profile, tap the three dots, and select Block. They won't be notified, and they won't be able to see or interact with your content.",
  },
];
