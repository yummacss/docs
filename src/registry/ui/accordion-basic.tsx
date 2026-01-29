import { Accordion } from "@base-ui/react/accordion";
import { PlusIcon, XIcon } from "@phosphor-icons/react";

export default function ExampleAccordion() {
  return (
    <Accordion.Root className="d-f w-96 fd-c jc-c c-slate-12">
      {items.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          className="bbw-1 bc-silver-4"
        >
          <Accordion.Header className="m-0">
            <Accordion.Trigger
              className="p-r d-f w-full ai-b jc-sb g-4 bg-silver-1 py-2 pr-1 pl-3 ta-l fw-500 h:bg-silver-2 fv:zi-1 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 c-p b-0"
              render={(props, state) => (
                <button {...props}>
                  {item.title}
                  {state.open ? (
                    <XIcon size={12} className="mr-2 fs-0" aria-hidden="true" />
                  ) : (
                    <PlusIcon
                      size={12}
                      className="mr-2 fs-0"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )}
            />
          </Accordion.Header>
          <Accordion.Panel className="o-h fs-md c-slate-11">
            <div className="p-3">{item.content}</div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
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
