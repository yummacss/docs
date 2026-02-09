import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button
        disabled
        className="bg-indigo c-white br-2 px-2 py-1 fw-600 fs-sm bsh-xs bw-1 bc-indigo-7 us-none b-0 o-50 c-na"
      >
        Button sm
      </Button>
      <Button
        disabled
        className="bg-indigo c-white br-2 px-3 py-2 fw-600 bsh-md bw-1 bc-indigo-7 us-none b-0 o-50 c-na"
      >
        Button md
      </Button>
      <Button
        disabled
        className="bg-indigo c-white br-2 px-4 py-3 fw-600 fs-lg bsh-md bw-1 bc-indigo-7 us-none b-0 o-50 c-na"
      >
        Button lg
      </Button>
    </div>
  );
}
