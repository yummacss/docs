import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      {/* Small */}
      <Avatar.Root className="d-if d-8 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c d-full fs-xs fw-600 c-indigo">
          MW
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Medium */}
      <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c d-full fs-md fw-600 c-indigo">
          MW
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Large */}
      <Avatar.Root className="d-if d-16 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c d-full fs-lg fw-600 c-indigo">
          MW
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Extra Large */}
      <Avatar.Root className="d-if d-20 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c d-full fs-xl fw-600 c-indigo">
          MW
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
