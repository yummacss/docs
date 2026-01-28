import { Tabs } from "@base-ui/react/tabs";
import {
  ProjectorScreenChartIcon,
  ShapesIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";

export default function ExampleTabs() {
  return (
    <Tabs.Root
      className="bg-white br-1 bw-1 bc-silver-4"
      defaultValue="overview"
    >
      <Tabs.List className="p-r zi-0 d-f g-1 px-1 bbw-1 bc-silver-4">
        <Tabs.Tab
          className="p-r zi-10 d-f h-8 ai-c jc-c bw-0 px-2 fs-sm fw-500 ws-nw c-slate-5 us-none h:c-slate-8 tabs-tab"
          value="overview"
        >
          Overview
        </Tabs.Tab>
        <Tabs.Tab
          className="p-r zi-10 d-f h-8 ai-c jc-c bw-0 px-2 fs-sm fw-500 ws-nw c-slate-5 us-none h:c-slate-8 tabs-tab"
          value="projects"
        >
          Projects
        </Tabs.Tab>
        <Tabs.Tab
          className="p-r zi-10 d-f h-8 ai-c jc-c bw-0 px-2 fs-sm fw-500 ws-nw c-slate-5 us-none h:c-slate-8 tabs-tab"
          value="account"
        >
          Account
        </Tabs.Tab>
        <Tabs.Indicator className="p-a t-half l-0 zi-0 h-6 br-1 bg-silver-2 tabs-indicator" />
      </Tabs.List>
      <Tabs.Panel
        className="p-r d-f h-32 ai-c jc-c tabs-panel"
        value="overview"
      >
        <ShapesIcon size={40} className="c-silver-4" />
      </Tabs.Panel>
      <Tabs.Panel
        className="p-r d-f h-32 ai-c jc-c tabs-panel"
        value="projects"
      >
        <ProjectorScreenChartIcon size={40} className="c-silver-4" />
      </Tabs.Panel>
      <Tabs.Panel className="p-r d-f h-32 ai-c jc-c tabs-panel" value="account">
        <UserCircleIcon size={40} className="c-silver-4" />
      </Tabs.Panel>
      <style>{`
        .tabs-tab {
          transition: color 200ms;
          outline: none;
        }
        .tabs-tab:focus-visible {
          position: relative;
        }
        .tabs-tab:focus-visible::before {
          content: '';
          position: absolute;
          inset: 0.25rem 0;
          border-radius: 0.125rem;
          outline: 2px solid var(--blue-8);
        }
        .tabs-tab[data-active] {
          color: var(--slate-12);
        }
        .tabs-indicator {
          width: var(--active-tab-width);
          transform: translateX(var(--active-tab-left)) translateY(-50%);
          transition: transform 200ms ease-in-out, width 200ms ease-in-out;
        }
        .tabs-panel:focus-visible {
          border-radius: 0.25rem;
          outline: 2px solid var(--blue-8);
          outline-offset: -1px;
        }
      `}</style>
    </Tabs.Root>
  );
}
