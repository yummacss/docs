import Autocomplete from "./autocomplete";

export default function AutocompleteAutoHighlight() {
  return (
    <Autocomplete
      items={teamMembers}
      label="Assign task"
      placeholder="Search members"
      autoHighlight
    />
  );
}

interface TeamMember {
  label: string;
  description: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    label: "John",
    description: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
  },
  {
    label: "Jade",
    description: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jade&backgroundColor=DAF0B9",
  },
  {
    label: "Noah",
    description: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
  },
  {
    label: "Melanie",
    description: "DevOps Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
  {
    label: "Riley",
    description: "Product Manager",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Riley&backgroundColor=F4C8FA",
  },
  {
    label: "Adrian",
    description: "QA Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
];
