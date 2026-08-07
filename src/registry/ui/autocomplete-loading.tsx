"use client";

import { useEffect, useState } from "react";
import Autocomplete, { type AutocompleteItem } from "./autocomplete";

export default function AutocompleteLoading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return;
    // Simulates network latency: Base UI has already filtered `items` by the
    // time this fires, so the delay is purely the loading row's dwell time.
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <Autocomplete
      items={projects}
      label="Search projects"
      placeholder="Project name or team..."
      loading={loading}
      onQueryChange={(value) => setLoading(value.length > 0)}
    />
  );
}

const projects: AutocompleteItem[] = [
  {
    label: "Storefront Redesign",
    description: "Frontend Team · In Progress",
    icon: <Swatch className="bg-cyan-5" letter="S" />,
  },
  {
    label: "API v3 Migration",
    description: "Platform Team · Active",
    icon: <Swatch className="bg-violet-5" letter="A" />,
  },
  {
    label: "Design System",
    description: "Design Team · Active",
    icon: <Swatch className="bg-coral-5" letter="D" />,
  },
  {
    label: "Mobile App",
    description: "Mobile Team · In Progress",
    icon: <Swatch className="bg-magenta-5" letter="M" />,
  },
  {
    label: "Analytics Dashboard",
    description: "Data Team · In Progress",
    icon: <Swatch className="bg-indigo-5" letter="A" />,
  },
  {
    label: "Auth Service",
    description: "Platform Team · Active",
    icon: <Swatch className="bg-lime-5" letter="A" />,
  },
  {
    label: "Billing Portal",
    description: "Payments Team · Backlog",
    icon: <Swatch className="bg-blue-5" letter="B" />,
  },
];

function Swatch({ className, letter }: { className: string; letter: string }) {
  return (
    <span
      className={`d-if ai-c jc-c w-8 h-8 br-lg fs-xs fw-500 c-white ${className}`}
    >
      {letter}
    </span>
  );
}
