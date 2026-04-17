"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "@gravity-ui/icons";
import * as React from "react";

export default function AccordionStatic() {
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
            className={index === faqs.length - 1 ? "" : "bbw-1 bc-silver-3"}
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full py-4 px-0 bg-transparent br-sm ta-l c-p fv:ow-2 fv:oo-1 fv:oc-indigo-6">
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

const faqs = [
  {
    value: "billing",
    title: "How does the billing cycle work?",
    content:
      "Invoices are generated on the first of each month for the previous month's usage. You have 14 days to review and payment is automatically processed on the 15th.",
  },
  {
    value: "roles",
    title: "What roles can I assign to team members?",
    content:
      "You can assign Admin, Editor, or Viewer roles. Admins can manage billing and team settings, Editors can create and edit content, and Viewers have read-only access.",
  },
  {
    value: "permissions",
    title: "Can I set custom permissions per project?",
    content:
      "Yes, go to Team Settings > Permissions to configure project-level access. You can override the default role permissions for any team member.",
  },
];
