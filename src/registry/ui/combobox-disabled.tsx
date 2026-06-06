"use client";

import { Combobox } from "@base-ui/react/combobox";
import { ArrowSeparateVertical, Xmark } from "iconoir-react";

export default function ComboboxDisabled() {
  return (
    <Combobox.Root items={users} disabled>
      <div className="d-f p-r fd-c g-2 o-50 c-na c-slate-10 fs-sm">
        <label htmlFor="user-input-disabled" className="fw-500">
          Assign member
        </label>
        <div className="p-r">
          <Combobox.Input
            id="user-input-disabled"
          placeholder="Search team members"
          className="h-10 w-64 pl-4 pr-16 bg-white bc-silver-3 c-slate-4 bw-1 br-md fs-sm bs-o-xs"
          />
          <div className="d-f p-a r-2 b-0 ai-c jc-c h-10 c-slate-6">
            <div className="d-f ai-c jc-c w-6 h-6 c-slate-6">
              <Xmark className="w-4 h-4" />
            </div>
            <div className="d-f ai-c jc-c w-6 h-6 c-slate-6">
              <ArrowSeparateVertical className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Combobox.Root>
  );
}

interface User {
  name: string;
  role: string;
  avatar: string;
}

const users: User[] = [
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
];
