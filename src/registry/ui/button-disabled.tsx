import { Button } from "@base-ui/react/button";

export default function ButtonDisabled() {
  return (
    <Button
      disabled
      className="d-if ai-c px-3 py-2 bg-indigo bc-indigo-7 c-white br-lg bw-1 fw-500 bs-o-md o-60 us-none c-na"
    >
      Publish
    </Button>
  );
}
