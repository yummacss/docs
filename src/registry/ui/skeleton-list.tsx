import Skeleton from "./skeleton";

export default function SkeletonList() {
  return (
    <div className="d-f fd-c g-4 p-8 h-56">
      {[0, 1, 2].map((row) => (
        <div key={row} className="d-f ai-c g-4">
          {/* Each row's pulse is offset a little, so the list breathes rather
              than blinking in unison. */}
          <Skeleton shape="block" size="w-9 h-9" delay={row * 0.15} />
          <div className="d-f fd-c g-1 fg-1">
            <Skeleton size="h-3 w-40" delay={row * 0.15} />
            <Skeleton tone="subtle" size="h-2 w-24" delay={row * 0.15} />
          </div>
        </div>
      ))}
    </div>
  );
}
