import { Autocomplete } from "@base-ui/react/autocomplete";

export default function AutocompleteDisabled() {
  return (
    <Autocomplete.Root items={teamMembers} disabled>
      <div className="d-f fd-c g-2 o-60 c-na">
        <label
          htmlFor="autocomplete-input-disabled"
          className="c-slate-10 fs-sm fw-500"
        >
          Assign member
        </label>
        <Autocomplete.Input
          id="autocomplete-input-disabled"
          placeholder="Search members"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-4 bw-1 br-lg fs-sm bs-o-xs"
        />
      </div>
    </Autocomplete.Root>
  );
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Adrian",
    role: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
  {
    name: "Aidan",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aidan&backgroundColor=FFD4DE",
  },
  {
    name: "Jade",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jade&backgroundColor=DAF0B9",
  },
  {
    name: "Jessica",
    role: "UX Researcher",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jessica&backgroundColor=DAF0B9",
  },
  {
    name: "John",
    role: "Product Manager",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
  },
  {
    name: "Katherine",
    role: "DevOps Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Katherine&backgroundColor=F4C8FA",
  },
  {
    name: "Liam",
    role: "Engineering Lead",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Liam&backgroundColor=D0D1FB",
  },
  {
    name: "Maria",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Maria&backgroundColor=DCCEFC",
  },
  {
    name: "Noah",
    role: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
  },
];
