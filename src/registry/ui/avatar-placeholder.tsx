import { Avatar } from "@base-ui/react/avatar";
import { PersonFill } from "@gravity-ui/icons";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-indigo-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo">
          <PersonFill className="w-6 h-6" />
        </Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-green-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-green">
          <PersonFill className="w-6 h-6" />
        </Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-red-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-red">
          <PersonFill className="w-6 h-6" />
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
