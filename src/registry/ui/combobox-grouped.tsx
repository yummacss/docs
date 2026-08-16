import Combobox, { type ComboboxGroup } from "./combobox";

export default function ComboboxGrouped() {
  return (
    <Combobox
      items={teamGroups}
      label="Advanced search"
      placeholder="Search by name or role..."
      emptyMessage="No members found."
    />
  );
}

const teamGroups: ComboboxGroup[] = [
  {
    group: "Frontend",
    items: [
      {
        label: "John",
        description: "Frontend Developer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
      },
      {
        label: "Noah",
        description: "UI Engineer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
      },
      {
        label: "Melanie",
        description: "React Developer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
      },
    ],
  },
  {
    group: "Backend",
    items: [
      {
        label: "Adrian",
        description: "Backend Developer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
      },
      {
        label: "Maria",
        description: "API Engineer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Maria&backgroundColor=DCCEFC",
      },
      {
        label: "Liam",
        description: "Node.js Developer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Liam&backgroundColor=D0D1FB",
      },
    ],
  },
  {
    group: "DevOps",
    items: [
      {
        label: "Jessica",
        description: "DevOps Engineer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Jessica&backgroundColor=DAF0B9",
      },
      {
        label: "Aiden",
        description: "SRE",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Aiden&backgroundColor=B4E9F2",
      },
      {
        label: "Wyatt",
        description: "Platform Engineer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Wyatt&backgroundColor=FFD4DE",
      },
    ],
  },
];
