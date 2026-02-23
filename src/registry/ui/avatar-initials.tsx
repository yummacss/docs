import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      {/* Small */}
      <Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 bg-indigo-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo fs-xs fw-600">
          MW
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Medium */}
      <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-indigo-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo fs-md fw-600">
          MW
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Large */}
      <Avatar.Root className="d-if o-h ai-c jc-c w-16 h-16 bg-indigo-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo fs-lg fw-600">
          MW
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Extra Large */}
      <Avatar.Root className="d-if o-h ai-c jc-c w-20 h-20 bg-indigo-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo fs-xl fw-600">
          MW
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
