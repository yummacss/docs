import { KanbanBoard, List, Table } from "iconoir-react";
import Toolbar, { type ToolbarItem } from "./toolbar";

export default function ToolbarInput() {
  return <Toolbar items={items} />;
}

const items: ToolbarItem[] = [
  {
    type: "toggles",
    label: "View",
    defaultValue: ["grid"],
    options: [
      { value: "grid", label: "Grid", icon: <Table className="w-5 h-5" /> },
      { value: "list", label: "List", icon: <List className="w-5 h-5" /> },
      {
        value: "kanban",
        label: "Kanban",
        icon: <KanbanBoard className="w-5 h-5" />,
      },
    ],
  },
  { type: "separator" },
  { type: "number", label: "Sprint points", defaultValue: 8 },
];
