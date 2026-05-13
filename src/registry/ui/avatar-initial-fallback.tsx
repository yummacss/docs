import { Avatar } from "@base-ui/react/avatar";

export default function AvatarFallbackInitial() {
  return (
    <div className="d-f ai-c g-4">
      {initialProfiles.map((profile) => (
        <Avatar.Root
          key={profile.name}
          className="d-if o-h ai-c jc-c w-12 h-12 bg-indigo-1 bc-indigo-3 br-9999 bw-1 va-m us-none"
        >
          <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-indigo fs-md fw-500">
            {profile.initials}
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}

const initialProfiles = [
  { name: "Sarah", initials: "S" },
  { name: "John", initials: "A" },
  { name: "Noah", initials: "J" },
  { name: "Melanie", initials: "L" },
];
