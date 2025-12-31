import { useRef, useState } from "react";

export default function TabsIcons() {
  const [activeTab, setActiveTab] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      id: "grid",
      label: "Grid",
      content:
        "Grid view content. Optimized for visual browsing of large collections.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <rect
            x="48"
            y="48"
            width="64"
            height="64"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <rect
            x="144"
            y="48"
            width="64"
            height="64"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <rect
            x="48"
            y="144"
            width="64"
            height="64"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <rect
            x="144"
            y="144"
            width="64"
            height="64"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      ),
    },
    {
      id: "list",
      label: "List",
      content:
        "List view content. Optimized for scanning detailed information quickly.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <line
            x1="88"
            y1="64"
            x2="216"
            y2="64"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="88"
            y1="128"
            x2="216"
            y2="128"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="88"
            y1="192"
            x2="216"
            y2="192"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <circle cx="44" cy="64" r="12" fill="currentColor" />
          <circle cx="44" cy="128" r="12" fill="currentColor" />
          <circle cx="44" cy="192" r="12" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(newIndex);
    const tabButtons =
      tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabButtons?.[newIndex]?.focus();
  };

  return (
    <div className="d-f fd-c g-4 w-full">
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="View Modes"
        ref={tabListRef}
        className="bg-silver-1 p-1 br-0 d-if bw-1 bc-silver-4"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`d-f ai-c g-2 fw-500 px-4 py-2 br-0 tr-c f:oc-silver-1 f:os-s f:ow-2 ${
              activeTab === index
                ? "c-black bg-white bw-1 bc-silver-4 sh-sm"
                : "c-silver-10 bw-0 h:c-black"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== index}
          className={`p-4 bw-1 bc-silver-2 bg-white br-0 c-slate fs-sm ${
            activeTab === index ? "d-b" : "d-none"
          } f:oc-silver-1 f:os-s f:ow-2`}
        >
          <p className="m-0">{tab.content}</p>
        </div>
      ))}
    </div>
  );
}
