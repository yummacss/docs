import { Accordion } from "@base-ui/react/accordion";
import { CaretDownIcon } from "@phosphor-icons/react";

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

export default function AccordionBasic() {
  return (
    <Accordion.Root className="d-f fd-c g-2" defaultValue={["get-started"]}>
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="p-4 c-p d-f jc-sb ai-c w-full bw-1 bc-silver-4 fw-600 br-0 bg-white h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2">
              <span className="ff-s c-slate fs-md">{item.title}</span>
              <CaretDownIcon
                size={16}
                className="c-slate-8 tr-tf accordion-icon"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="of-h c-slate fs-sm lh-4 brw-1 bbw-1 blw-1 bc-silver-4 bg-white accordion-panel">
            <div className="p-4">
              <p className="c-slate-6 m-0">{item.content}</p>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
      <style>{`
        .accordion-icon {
          transition: transform 150ms ease-out;
        }
        [data-panel-open] .accordion-icon {
          transform: rotate(180deg);
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
