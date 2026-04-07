import { Avatar } from "@base-ui/react/avatar";
import { PersonFill } from "@gravity-ui/icons";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      {placeholders.map((placeholder) => (
        <Avatar.Root
          key={placeholder.rootColor}
          className={`d-if o-h ai-c jc-c w-12 h-12 ${placeholder.rootColor} br-pill va-m us-none`}
        >
          <Avatar.Fallback
            className={`d-f ai-c jc-c w-full h-full ${placeholder.fallbackColor}`}
          >
            <PersonFill className="w-6 h-6" />
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}

const placeholders = [
  { rootColor: "bg-indigo-1", fallbackColor: "c-indigo" },
  { rootColor: "bg-green-1", fallbackColor: "c-green" },
  { rootColor: "bg-red-1", fallbackColor: "c-red" },
];
