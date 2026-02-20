import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      {/* Small */}
      <Avatar.Root className="d-if w-8 h-8 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-xs fw-600 c-indigo">
          MW
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Medium */}
      <Avatar.Root className="d-if w-12 h-12 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-600 c-indigo">
          MW
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Large */}
      <Avatar.Root className="d-if w-16 h-16 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-lg fw-600 c-indigo">
          MW
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Extra Large */}
      <Avatar.Root className="d-if w-20 h-20 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-xl fw-600 c-indigo">
          MW
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
