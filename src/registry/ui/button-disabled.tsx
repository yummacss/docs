import { Button } from "@base-ui/react/button";

export default function ButtonDisabled() {
  return (
    <Button
      disabled
      className="d-if ai-c px-3 py-2 bg-indigo bc-indigo-7 c-white br-md bw-1 fw-600 bs-o-md o-50 us-none c-na"
    >
      Save changes
    </Button>
  );
}
