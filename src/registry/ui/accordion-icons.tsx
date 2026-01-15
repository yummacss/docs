import { Accordion } from "@base-ui/react/accordion";
import { CaretDownIcon, InfoIcon } from "@phosphor-icons/react";

const items = [
  {
    value: "free",
    title: "Is Yumma CSS free?",
    content:
      "Yes, Yumma CSS is completely free and open-source. You can use it in personal and commercial projects.",
  },
  {
    value: "react",
    title: "Can I use it with React?",
    content:
      "Absolutely! Yumma CSS is framework-agnostic and works perfectly with React, Vue, Svelte, and vanilla HTML.",
  },
  {
    value: "mobile",
    title: "Is Yumma UI mobile friendly?",
    content: "Yes, Yumma UI is mobile-friendly and works great on all devices.",
  },
];

export default function AccordionIcons() {
  return (
    <Accordion.Root className="d-f fd-c g-2" defaultValue={["mobile"]}>
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="d-f w-full ai-c jc-sb bw-1 bc-silver-4 br-0 bg-white p-4 fw-600 h:bg-silver-1 f:os-s f:ow-2 f:oc-silver-1 c-p">
              <div className="d-f ai-c g-2">
                <InfoIcon size={16} className="c-slate-8" aria-hidden="true" />
                <span className="fs-md c-slate ff-s">{item.title}</span>
              </div>
              <CaretDownIcon
                size={16}
                className="c-slate-8 tr-tf accordion-icon"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="of-h brw-1 bbw-1 blw-1 bc-silver-4 bg-white fs-sm lh-4 c-slate accordion-panel">
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
