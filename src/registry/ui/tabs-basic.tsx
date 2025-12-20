import { useRef, useState } from "react";

export default function TabsBasic() {
  const [activeTab, setActiveTab] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      id: "for-you",
      label: "For you",
      content:
        "Content for the 'For you' tab. This section shows personalized recommendations based on your activity.",
    },
    {
      id: "following",
      label: "Following",
      content:
        "Content for the 'Following' tab. Stay updated with the latest posts from people you follow.",
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
        aria-label="Content Categories"
        ref={tabListRef}
        className="bg-silver-1 p-1 rad-0 d-if b-1 bc-silver-4"
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
            className={`fw-500 px-4 py-2 rad-0 tr-c f:oc-silver-1 f:os-s f:ow-2 ${activeTab === index
              ? "tc-black bg-white b-1 bc-silver-4 sh-sm"
              : "tc-silver-10 b-0 h:tc-black"
              }`}
          >
            {tab.label}
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
          tabIndex={0}
          className={`p-4 b-1 bc-silver-2 bg-white rad-0 tc-slate fs-sm ${activeTab === index ? "d-b" : "d-n"
            } f:oc-silver-1 f:os-s f:ow-2`}
        >
          <p className="m-0">{tab.content}</p>
        </div>
      ))}
    </div>
  );
}
