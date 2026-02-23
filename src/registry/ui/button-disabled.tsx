import { Button } from "@base-ui/react/button";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button
        disabled
        className="b-0 px-2 py-1 bg-indigo bc-indigo-7 c-white br-2 bw-1 fw-600 fs-sm bs-o-xs o-50 us-none c-na"
      >
        Button sm
      </Button>
      <Button
        disabled
        className="b-0 px-3 py-2 bg-indigo bc-indigo-7 c-white br-2 bw-1 fw-600 bs-o-md o-50 us-none c-na"
      >
        Button md
      </Button>
      <Button
        disabled
        className="b-0 px-4 py-3 bg-indigo bc-indigo-7 c-white br-2 bw-1 fw-600 fs-lg bs-o-md o-50 us-none c-na"
      >
        Button lg
      </Button>
    </div>
  );
}
