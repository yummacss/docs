"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "iconoir-react";
import { useState } from "react";

export default function AccordionStatic() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Accordion.Root
      className="d-f fd-c w-100% max-w-96"
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
              <Accordion.Trigger className="d-f ai-c jc-sb g-3 w-100% py-4 px-0 bg-transparent bw-0 br-sm ta-l c-p fv:oo-1 fv:oc-indigo-5">
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
    value: "access",
    title: "How do I control team access?",
    content:
      "Go to Team Settings to manage roles. Assign Admin, Member, or Viewer roles. You can also set project-specific permissions for each team member.",
  },
  {
    value: "notifications",
    title: "How do I customize notifications?",
    content:
      "Visit Settings > Notifications. Choose what triggers email or in-app alerts. Filter by project, mention, or task status updates.",
  },
  {
    value: "sprints",
    title: "How do I manage sprints?",
    content:
      "Create sprints from the Sprint page. Assign tasks from the backlog to the current sprint. Track progress with the burndown chart.",
  },
];
