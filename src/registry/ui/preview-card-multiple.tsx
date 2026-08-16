import Avatar from "./avatar";
import PreviewCard from "./preview-card";

export default function PreviewCardMultiple() {
  return (
    <p className="m-0 c-slate-10 fs-sm">
      Mentioned{" "}
      <PreviewCard trigger="John">
        <div className="d-f ai-c g-3">
          <Avatar
            size="sm"
            src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9"
            name="John"
            status="online"
          />
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
          <Avatar
            size="sm"
            src="https://api.dicebear.com/9.x/notionists/svg?seed=Jane&backgroundColor=B4E9F2"
            name="Jane"
            status="offline"
          />
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
