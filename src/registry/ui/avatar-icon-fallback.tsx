import { Avatar } from "@base-ui/react/avatar";
import { UserRound } from "iconoir-react";

export default function AvatarIconFallback() {
  return (
    <div className="d-f ai-c g-4">
      {fallbacks.map((fallback) => (
        <Avatar.Root
          key={fallback.rootColor}
          className={`d-if o-h ai-c jc-c w-12 h-12 ${fallback.rootColor} br-9999 va-m us-none`}
        >
          <Avatar.Fallback
            className={`d-f ai-c jc-c w-100% h-100% ${fallback.fallbackColor}`}
          >
            <UserRound className="w-6 h-6" />
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}

const fallbacks = [
  {
    rootColor: "bg-lime-2",
    fallbackColor: "c-lime",
  },
  {
    rootColor: "bg-cyan-2",
    fallbackColor: "c-cyan",
  },
  { rootColor: "bg-indigo-2", fallbackColor: "c-indigo" },
];
