"use client";

export default function SkeletonStatic() {
  return (
    <div className="d-f fd-c g-5 p-8 h-56">
      <div className="d-f ai-c g-4">
        <div className="w-10 h-10 bg-silver-2 br-9999" />
        <div className="d-f fd-c g-2 fg-1">
          <div className="h-4 w-48 bg-silver-2 br-sm" />
          <div className="h-3 w-32 bg-silver-1 br-xs" />
        </div>
      </div>
      <div className="d-f fd-c g-3">
        <div className="h-3 w-100% bg-silver-2 br-xs" />
        <div className="h-3 w-80% bg-silver-2 br-xs" />
        <div className="h-3 w-60% bg-silver-2 br-xs" />
      </div>
      <div className="d-f g-3">
        <div className="h-8 w-20 bg-silver-2 br-md" />
        <div className="h-8 w-24 bg-silver-2 br-md" />
      </div>
    </div>
  );
}
