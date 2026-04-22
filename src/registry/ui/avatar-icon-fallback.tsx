import { Avatar } from "@base-ui/react/avatar";
import { PersonFill } from "@gravity-ui/icons";

export default function AvatarIconFallback() {
  return (
    <div className="d-f ai-c g-4">
      {fallbacks.map((fallback) => (
        <Avatar.Root
          key={fallback.rootColor}
          className={`d-if o-h ai-c jc-c w-12 h-12 ${fallback.rootColor} br-pill va-m us-none`}
        >
          <Avatar.Fallback
            className={`d-f ai-c jc-c w-full h-full ${fallback.fallbackColor}`}
          >
            <PersonFill className="w-6 h-6" />
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}

const fallbacks = [
  {
    rootColor: "bg-cyan-1",
    fallbackColor: "c-cyan",
  },
  {
    rootColor: "bg-indigo-1",
    fallbackColor: "c-indigo",
  },
  { rootColor: "bg-magenta-1", fallbackColor: "c-magenta" },
];
