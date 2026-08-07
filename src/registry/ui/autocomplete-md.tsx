import Autocomplete, { type AutocompleteItem } from "./autocomplete";

export default function AutocompleteMd() {
  return (
    <Autocomplete
      items={roles}
      label="Filter by role"
      placeholder="Filter by role..."
      size="md"
    />
  );
}

const roles: AutocompleteItem[] = [
  {
    label: "Developer",
    description: "8 members",
    icon: <Initial letter="D" />,
  },
  { label: "Designer", description: "4 members", icon: <Initial letter="D" /> },
  {
    label: "Product Manager",
    description: "2 members",
    icon: <Initial letter="P" />,
  },
  {
    label: "QA Engineer",
    description: "3 members",
    icon: <Initial letter="Q" />,
  },
  { label: "DevOps", description: "2 members", icon: <Initial letter="D" /> },
  {
    label: "Data Analyst",
    description: "2 members",
    icon: <Initial letter="D" />,
  },
  {
    label: "UX Researcher",
    description: "3 members",
    icon: <Initial letter="U" />,
  },
  {
    label: "Technical Writer",
    description: "1 member",
    icon: <Initial letter="T" />,
  },
  {
    label: "Scrum Master",
    description: "1 member",
    icon: <Initial letter="S" />,
  },
  {
    label: "Engineering Lead",
    description: "2 members",
    icon: <Initial letter="E" />,
  },
];

function Initial({ letter }: { letter: string }) {
  return (
    <span className="d-f ai-c jc-c w-6 h-6 br-9999 bg-indigo-1 c-indigo fs-xs fw-500">
      {letter}
    </span>
  );
}
