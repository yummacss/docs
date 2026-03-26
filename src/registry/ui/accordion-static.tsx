"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "@gravity-ui/icons";
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
              <Accordion.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full py-4 px-0 bg-transparent br-sm ta-l c-p fv:os-s fv:ow-2 fv:oo-1 fv:oc-indigo-6">
                <span className="c-slate-8 fs-sm fw-500">{item.title}</span>
                <ChevronDown
                  className={`w-4 h-4 fs-0 c-slate-6 ${isOpen ? "ro-180" : "ro-0"}`}
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>
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
