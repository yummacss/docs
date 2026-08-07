import { Avatar } from "@base-ui/react/avatar";
import PreviewCard from "./preview-card";

export default function PreviewCardMultiple() {
  return (
    <p className="m-0 c-slate-10 fs-sm">
      Mentioned{" "}
      <PreviewCard trigger="John">
        <div className="d-f ai-c g-3">
          <div className="p-r">
            <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bc-white br-9999 bw-1 va-m us-none">
              <Avatar.Image
                src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9"
                alt="John"
                className="of-c w-100% h-100%"
              />
            </Avatar.Root>
            <span className="p-a r-0 b-0 w-3 h-3 bg-green-6 bc-white br-9999 bw-1" />
          </div>
          <div className="d-f fd-c g-0">
            <span className="c-slate-10 fs-sm fw-500">John</span>
            <span className="c-slate-6 fs-xs">Frontend Developer</span>
          </div>
        </div>
        <div className="d-f ai-c g-2">
          <span className="c-slate-6 fs-xs">3 active tasks</span>
        </div>
      </PreviewCard>{" "}
      or{" "}
      <PreviewCard trigger="Jane">
        <div className="d-f ai-c g-3">
          <div className="p-r">
            <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bc-white br-9999 bw-1 va-m us-none">
              <Avatar.Image
                src="https://api.dicebear.com/9.x/notionists/svg?seed=Jane&backgroundColor=B4E9F2"
                alt="Jane"
                className="of-c w-100% h-100%"
              />
            </Avatar.Root>
            <span className="p-a r-0 b-0 w-3 h-3 bg-slate-4 bc-white br-9999 bw-1" />
          </div>
          <div className="d-f fd-c g-0">
            <span className="c-slate-10 fs-sm fw-500">Jane</span>
            <span className="c-slate-6 fs-xs">Backend Developer</span>
          </div>
        </div>
        <div className="d-f ai-c g-2">
          <span className="c-slate-6 fs-xs">5 active tasks</span>
        </div>
      </PreviewCard>{" "}
      in a comment.
    </p>
  );
}
