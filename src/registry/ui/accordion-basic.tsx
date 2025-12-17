import type React from "react";
import { useRef, useState } from "react";

// Accordion data
const ACCORDION_ITEMS = [
  {
    id: "accordion-basic-q1",
    heading: "Is Yumma CSS free?",
    content:
      "Yes, Yumma CSS is completely free and open-source. You can use it in personal and commercial projects.",
  },
  {
    id: "accordion-basic-q2",
    heading: "Can I use it with React?",
    content:
      "Absolutely! Yumma CSS is framework-agnostic and works perfectly with React, Vue, Svelte, and vanilla HTML.",
  },
  {
    id: "accordion-basic-q3",
    heading: "Is Yumma UI mobile friendly?",
    content:
      "Yes, Yumma UI is fully responsive and works great on all devices.",
  },
];

export default function AccordionBasic() {
  const [openIndex, setOpenIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation handler
  const onHeaderKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    const max = ACCORDION_ITEMS.length - 1;
    let nextIdx = idx;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIdx = idx === max ? 0 : idx + 1;
        buttonRefs.current[nextIdx]?.focus();
        e.preventDefault();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        nextIdx = idx === 0 ? max : idx - 1;
        buttonRefs.current[nextIdx]?.focus();
        e.preventDefault();
        break;
      case "Home":
        buttonRefs.current[0]?.focus();
        e.preventDefault();
        break;
      case "End":
        buttonRefs.current[max]?.focus();
        e.preventDefault();
        break;
      case "Enter":
      case " ":
        setOpenIndex(idx === openIndex ? -1 : idx);
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <div className="d-f fd-c" role="presentation">
      {ACCORDION_ITEMS.map((item, idx) => {
        const expanded = openIndex === idx;
        const panelId = `${item.id}-panel`;
        const buttonId = `${item.id}-button`;
        return (
          <div className="b-1 bc-silver-2" key={item.id}>
            <h3 className="m-0">
              <button
                id={buttonId}
                ref={(el) => {
                  buttonRefs.current[idx] = el;
                }}
                className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0 w-100 ta-l f:oc-silver-4 f:os-s f:ow-2"
                aria-expanded={expanded}
                aria-controls={panelId}
                aria-disabled={false}
                type="button"
                onClick={() => setOpenIndex(expanded ? -1 : idx)}
                onKeyDown={(e) => onHeaderKeyDown(e, idx)}
              >
                <span className="ff-s tc-slate">{item.heading}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fs-lg tc-slate-8 h-4 w-4 ml-auto"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                  style={{
                    transform: expanded ? "rotate(180deg)" : undefined,
                    transition: "transform 0.2s",
                  }}
                >
                  <title>Expand</title>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h3>
            <section
              id={panelId}
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="px-4 pb-4 tc-slate fs-sm lh-4"
            >
              {expanded && <p className="tc-slate-6">{item.content}</p>}
            </section>
          </div>
        );
      })}
    </div>
  );
}
