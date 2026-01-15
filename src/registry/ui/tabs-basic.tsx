import { Tabs } from "@base-ui/react/tabs";
import {
  ProjectorScreenChartIcon,
  ShapesIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";

export default function ExampleTabs() {
  return (
    <Tabs.Root className="bw-1 bc-silver-4 br-1" defaultValue="overview">
      <Tabs.List className="p-r d-f g-1 bbw-1 bc-silver-4 px-1">
        <Tabs.Tab
          className="d-f ai-c jc-c h-8 bw-0 bg-transparent px-3 fs-sm fw-500 us-none tabs-tab"
          value="overview"
        >
          Overview
        </Tabs.Tab>
        <Tabs.Tab
          className="d-f ai-c jc-c h-8 bw-0 bg-transparent px-3 fs-sm fw-500 us-none tabs-tab"
          value="projects"
        >
          Projects
        </Tabs.Tab>
        <Tabs.Tab
          className="d-f ai-c jc-c h-8 bw-0 bg-transparent px-3 fs-sm fw-500 us-none tabs-tab"
          value="account"
        >
          Account
        </Tabs.Tab>
        <Tabs.Indicator className="p-a t-half l-0 zi-n1 h-6 br-1 bg-silver-1 tabs-indicator" />
      </Tabs.List>
      <Tabs.Panel className="d-f ai-c jc-c h-32" value="overview">
        <ShapesIcon size={40} className="c-silver-4" />
      </Tabs.Panel>
      <Tabs.Panel className="d-f ai-c jc-c h-32" value="projects">
        <ProjectorScreenChartIcon size={40} className="c-silver-4" />
      </Tabs.Panel>
      <Tabs.Panel className="d-f ai-c jc-c h-32" value="account">
        <UserCircleIcon size={40} className="c-silver-4" />
      </Tabs.Panel>
      <style>{`
        .tabs-tab {
          color: var(--slate-6);
          outline: none;
        }
        .tabs-tab:hover {
          color: var(--slate);
        }
        .tabs-tab[data-active] {
          color: var(--slate);
        }
        .tabs-indicator {
          width: var(--active-tab-width);
          transform: translateX(var(--active-tab-left)) translateY(-50%);
          transition: transform 200ms ease-in-out, width 200ms ease-in-out;
        }
      `}</style>
    </Tabs.Root>
  );
}
