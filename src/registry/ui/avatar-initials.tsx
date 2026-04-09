import { Avatar } from "@base-ui/react/avatar";

export default function AvatarInitials() {
  return (
    <div className="d-f ai-c g-4">
      {initialProfiles.map((profile) => (
        <Avatar.Root
          key={profile.initials}
          className="d-if o-h ai-c jc-c w-12 h-12 bg-indigo-1 br-pill va-m us-none"
        >
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo fs-md fw-600">
            {profile.initials}
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}

const initialProfiles = [
  { initials: "MW" },
  { initials: "SC" },
  { initials: "AK" },
  { initials: "EW" },
];
