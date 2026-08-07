import Autocomplete, { type AutocompleteItem } from "./autocomplete";

export default function AutocompleteLimit() {
  return (
    <Autocomplete
      items={projects}
      label="Switch project"
      placeholder="Search projects…"
      limit={5}
    />
  );
}

const projects: AutocompleteItem[] = [
  {
    label: "Storefront Redesign",
    description: "In Progress",
    icon: <Swatch className="bg-cyan-4" letter="S" />,
  },
  {
    label: "API v3 Migration",
    description: "Review",
    icon: <Swatch className="bg-violet-4" letter="A" />,
  },
  {
    label: "Design System",
    description: "Active",
    icon: <Swatch className="bg-coral-4" letter="D" />,
  },
  {
    label: "Mobile App",
    description: "Planning",
    icon: <Swatch className="bg-magenta-4" letter="M" />,
  },
  {
    label: "Analytics Dashboard",
    description: "In Progress",
    icon: <Swatch className="bg-indigo-4" letter="A" />,
  },
  {
    label: "Auth Service",
    description: "Active",
    icon: <Swatch className="bg-lime-4" letter="A" />,
  },
  {
    label: "Billing Portal",
    description: "Backlog",
    icon: <Swatch className="bg-blue-4" letter="B" />,
  },
  {
    label: "Admin Panel",
    description: "In Progress",
    icon: <Swatch className="bg-red-4" letter="A" />,
  },
];

function Swatch({ className, letter }: { className: string; letter: string }) {
  return (
    <span
      className={`d-if ai-c jc-c w-6 h-6 br-sm fs-xs fw-500 c-white ${className}`}
    >
      {letter}
    </span>
  );
}
