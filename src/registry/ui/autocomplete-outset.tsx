import Autocomplete from "./autocomplete";

export default function AutocompleteOutset() {
  return (
    <Autocomplete
      items={teamMembers}
      label="Assign member"
      placeholder="Search members"
      shadow="outset"
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
    label: "Adrian",
    description: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
  {
    label: "Aidan",
    description: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aidan&backgroundColor=FFD4DE",
  },
  {
    label: "Jade",
    description: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jade&backgroundColor=DAF0B9",
  },
  {
    label: "Jessica",
    description: "UX Researcher",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jessica&backgroundColor=DAF0B9",
  },
  {
    label: "Jocelyn",
    description: "QA Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jocelyn&backgroundColor=DAF0B9",
  },
  {
    label: "John",
    description: "Product Manager",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
  },
  {
    label: "Katherine",
    description: "DevOps Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Katherine&backgroundColor=F4C8FA",
  },
  {
    label: "Liam",
    description: "Engineering Lead",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Liam&backgroundColor=D0D1FB",
  },
  {
    label: "Liliana",
    description: "Data Analyst",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Liliana&backgroundColor=DCCEFC",
  },
  {
    label: "Maria",
    description: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Maria&backgroundColor=DCCEFC",
  },
  {
    label: "Melanie",
    description: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
  {
    label: "Noah",
    description: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
  },
];
