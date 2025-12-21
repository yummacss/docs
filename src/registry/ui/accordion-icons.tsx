import { useState } from "react";

export default function AccordionIcons() {
  const [expanded, setExpanded] = useState<number | null>(2);

  const toggle = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const items = [
    {
      id: "free",
      title: "Is Yumma CSS free?",
      content:
        "Yes, Yumma CSS is completely free and open-source. You can use it in personal and commercial projects.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 tc-slate-8"
          viewBox="0 0 256 256"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
        </svg>
      ),
    },
    {
      id: "react",
      title: "Can I use it with React?",
      content:
        "Absolutely! Yumma CSS is framework-agnostic and works perfectly with React, Vue, Svelte, and vanilla HTML.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 tc-slate-8"
          viewBox="0 0 256 256"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
        </svg>
      ),
    },
    {
      id: "mobile",
      title: "Is Yumma UI mobile friendly?",
      content:
        "Yes, Yumma UI is mobile-friendly and works great on all devices.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 tc-slate-8"
          viewBox="0 0 256 256"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="d-f fd-c g-2">
      {items.map((item, index) => (
        <div key={item.id} className="d-f fd-c w-full p-0">
          <h4 className="m-0">
            <button
              type="button"
              id={`accordion-button-${index}`}
              aria-expanded={expanded === index}
              aria-controls={`accordion-panel-${index}`}
              onClick={() => toggle(index)}
              className="p-4 c-p d-f jc-sb ai-c w-full b-1 bc-silver-2 fw-600 rad-0 bg-white h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2"
            >
              <div className="d-f ai-c g-2">
                {item.icon}
                <span className="ff-s tc-slate fs-md">{item.title}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="tc-slate-8 h-4 w-4"
                viewBox="0 0 256 256"
                aria-hidden="true"
              >
                {expanded === index ? (
                  <polyline
                    points="48 160 128 80 208 160"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                ) : (
                  <path
                    d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
                    fill="currentColor"
                  />
                )}
              </svg>
            </button>
          </h4>
          <section
            id={`accordion-panel-${index}`}
            aria-labelledby={`accordion-button-${index}`}
            hidden={expanded !== index}
            className={`p-4 bg-white tc-slate fs-sm lh-4 b-1 bc-silver-2 bt-0 ${
              expanded === index ? "d-b" : "d-none"
            }`}
          >
            <p className="tc-slate-6 m-0">{item.content}</p>
          </section>
        </div>
      ))}
    </div>
  );
}
