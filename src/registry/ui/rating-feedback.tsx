import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import Rating from "./rating";

export default function RatingFeedback() {
  return (
    <Rating label="Rate this sprint">
      <div className="d-f g-2">
        <Input
          placeholder="Share your feedback..."
          className="h-9 w-44 pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-sm fv:oo--1 fv:oc-indigo-5"
        />
        <Button className="d-f ai-c px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-lg bw-1 fs-sm fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5">
          Send
        </Button>
      </div>
    </Rating>
  );
}
