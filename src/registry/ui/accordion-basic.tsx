import { Accordion } from "@base-ui/react/accordion";
import { PlusIcon } from "@phosphor-icons/react";

export default function ExampleAccordion() {
  return (
    <Accordion.Root
      className="d-f w-96 fd-c jc-c c-slate"
      defaultValue={["get-started"]}
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          className="bbw-1 bc-silver-4"
        >
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="p-r d-f w-full ai-b jc-sb g-4 bg-silver-1 py-2 pr-1 pl-3 ta-l fw-500 h:bg-silver-2 fv:zi-1 fv:os-s fv:ow-2 fv:oc-blue-8 c-p b-0">
              {item.title}
              <PlusIcon
                size={12}
                className="mr-2 c-slate fs-0 accordion-icon"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="o-h fs-md c-slate-6 accordion-panel">
            <div className="p-3">{item.content}</div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
      <style>{`
        .accordion-icon {
          transition: transform 150ms ease-out;
        }
        [data-panel-open] .accordion-icon {
          transform: scale(1.1) rotate(45deg);
        }
        .accordion-panel {
          height: var(--accordion-panel-height);
          transition: height 150ms ease-out;
        }
        .accordion-panel[data-starting-style],
        .accordion-panel[data-ending-style] {
          height: 0;
        }
      `}</style>
    </Accordion.Root>
  );
}

const items = [
  {
    value: "what-is",
    title: "What is Yumma UI?",
    content:
      "Yumma UI is a library of high-quality unstyled React components for design systems and web apps.",
  },
  {
    value: "get-started",
    title: "How do I get started?",
    content:
      "Head to the \"Introduction\" guide in the docs. If you've used unstyled libraries before, you'll feel at home.",
  },
  {
    value: "use-project",
    title: "Can I use it for my project?",
    content: "Of course! Yumma UI is free and open source.",
  },
];
