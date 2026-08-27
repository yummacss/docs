import { Xmark } from "iconoir-react";
import Avatar from "./avatar";
import Dialog from "./dialog";

export default function DialogNested({
  container,
}: {
  /** Portal target, so a popup opened in a framed preview stays in the frame. */
  container?: HTMLElement | null;
}) {
  return (
    <Dialog container={container} trigger="Team settings" title="Team settings">
      <div className="d-f fd-c g-3">
        {teamMembers.map((member) => (
          <div key={`${member.name}-${member.role}`} className="d-f ai-c g-3">
            <Avatar src={member.avatar} name={member.name} />
            <div className="d-f fd-c fg-1">
              <span className="c-slate-10 fs-sm fw-500">{member.name}</span>
              <span className="c-slate-6 fs-xs">{member.role}</span>
            </div>
            <Dialog container={container}
              trigger="Remove"
              triggerTone="danger"
              triggerSize="sm"
              header={
                <div className="d-f fd-c ai-c g-3">
                  <div className="d-if p-r">
                    <Avatar size="lg" src={member.avatar} name={member.name} />
                    <div className="d-f p-a b-0 r-0 ai-c jc-c w-4 h-4 bg-white br-9999">
                      <Xmark className="w-3 h-3 c-red" />
                    </div>
                  </div>
                  <div className="d-f fd-c ta-c">
                    <span className="c-slate-10 fs-sm fw-500">
                      {member.name}
                    </span>
                    <span className="c-slate-6 fs-xs">{member.role}</span>
                  </div>
                </div>
              }
              title={`Remove ${member.name}?`}
              description="This member will lose access to the Engineering board and all associated tasks."
              confirmLabel="Remove"
              confirmTone="danger"
            />
          </div>
        ))}
      </div>
    </Dialog>
  );
}

const teamMembers = [
  {
    name: "John",
    role: "Editor",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
  },
  {
    name: "Melanie",
    role: "Admin",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
  {
    name: "Noah",
    role: "Viewer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
  },
];
