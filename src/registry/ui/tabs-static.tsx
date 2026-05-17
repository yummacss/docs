export default function ExampleTabsStatic() {
  return (
    <div className="w-fc bg-silver-1 br-9999 bw-1 p-1">
      <div className="d-f g-1">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={`d-f ai-c jc-c py-2 px-3 br-9999 fs-sm fw-500 ${
              tab.active
                ? "c-slate-10 bg-white bs-o-xs"
                : "c-slate-8"
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs = [
  { value: "overview", label: "Overview", active: true },
  { value: "activity", label: "Activity" },
  { value: "members", label: "Members" },
];
