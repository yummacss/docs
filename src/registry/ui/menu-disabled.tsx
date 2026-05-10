"use client";

import { Menu } from "@base-ui/react/menu";
import { Lock } from "@gravity-ui/icons";

export default function MenuDisabled() {
  return (
    <Menu.Root disabled>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-4 br-lg bw-1 fw-500 bs-o-xs o-50 tp-c tdu-150 ttf-io us-none">
        Roles <Lock className="fs-0 w-4 h-4" />
      </Menu.Trigger>
    </Menu.Root>
  );
}
