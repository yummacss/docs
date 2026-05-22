import { Avatar } from "@base-ui/react/avatar";

const fallbacks = [
  { rootColor: "bg-lime-2 bc-lime-3", fallbackColor: "c-lime" },
  { rootColor: "bg-cyan-2 bc-cyan-3", fallbackColor: "c-cyan" },
  { rootColor: "bg-indigo-2 bc-indigo-3", fallbackColor: "c-indigo" },
];

export default function AvatarFallbackInitial() {
  return (
    <div className="d-f ai-c g-4">
      {fallbacks.map((fallback) => (
        <Avatar.Root
          key={fallback.rootColor}
          className={`d-if o-h ai-c jc-c w-12 h-12 ${fallback.rootColor} br-9999 bw-1 va-m us-none`}
        >
          <Avatar.Fallback
            className={`d-f ai-c jc-c w-100% h-100% ${fallback.fallbackColor} fs-md fw-500`}
          >
            ME
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}
