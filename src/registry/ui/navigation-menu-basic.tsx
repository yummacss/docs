"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import {
  BookOpenIcon,
  CaretDownIcon,
  ChatCircleIcon,
  CodeIcon,
  GearIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

function NavTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <NavigationMenu.Trigger
      className={(state) =>
        `d-f ai-c jc-c g-1 h-10 px-3 m-0 bw-0 br-pill fs-sm fw-600 c-slate-10 us-none td-n c-p h:bg-silver-1 ${
          state.open ? "bg-silver-1" : "bg-transparent"
        } ${className || ""}`
      }
      render={(props, state) => (
        <button {...props}>
          {children}
          <NavigationMenu.Icon
            className="d-f tp-trf tdu-150 ttf-io"
            style={{ transform: state.open ? "rotate(180deg)" : "rotate(0)" }}
          >
            <CaretDownIcon size={12} />
          </NavigationMenu.Icon>
        </button>
      )}
    />
  );
}

export default function ExampleNavigationMenu() {
  return (
    <NavigationMenu.Root className="min-w-max br-pill bw-1 bc-silver-2 bg-white p-1">
      <NavigationMenu.List className="p-r d-f m-0 p-0 g-1">
        <NavigationMenu.Item>
          <NavTrigger>Developers</NavTrigger>
          <NavigationMenu.Content className="p-2">
            <ul className="d-f fd-c g-1 m-0 p-0 ls-n w-56">
              {developerLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="d-f ai-fs g-3 p-2 br-2 td-n c-inherit h:bg-silver-1"
                  >
                    <span className="d-f ai-c jc-c d-8 fs-0 br-2 bg-white bsh-xs bw-1 bc-silver-2 c-indigo">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="m-0 mb-1 fs-sm fw-600 c-slate-10">
                        {item.title}
                      </h3>
                      <p className="m-0 fs-xs c-slate-8 lh-4">
                        {item.description}
                      </p>
                    </div>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavTrigger>Learn</NavTrigger>
          <NavigationMenu.Content className="p-2">
            <ul className="d-f fd-c g-1 m-0 p-0 ls-n w-56">
              {learnLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="d-f ai-fs g-3 p-2 br-2 td-n c-inherit h:bg-silver-1"
                  >
                    <span className="d-f ai-c jc-c d-8 fs-0 br-2 bg-white bsh-xs bw-1 bc-silver-2 c-indigo">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="m-0 mb-1 fs-sm fw-600 c-slate-10">
                        {item.title}
                      </h3>
                      <p className="m-0 fs-xs c-slate-8 lh-4">
                        {item.description}
                      </p>
                    </div>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#pricing"
            className="d-f ai-c jc-c h-10 px-3 m-0 bw-0 br-pill bg-transparent fs-sm fw-600 c-slate-10 us-none td-n c-p h:bg-silver-1"
          >
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner sideOffset={10}>
          <NavigationMenu.Popup
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            }
            className="br-3 bg-white bsh-lg bw-1 bc-silver-2 o-h"
          >
            <NavigationMenu.Viewport className="p-r w-full h-full o-h" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

const developerLinks = [
  {
    href: "#api",
    title: "API Reference",
    description: "Explore endpoints and methods.",
    icon: <CodeIcon size={18} weight="bold" />,
  },
  {
    href: "#plugins",
    title: "Plugins",
    description: "Extend with custom plugins.",
    icon: <PuzzlePieceIcon size={18} weight="bold" />,
  },
  {
    href: "#tools",
    title: "CLI Tools",
    description: "Command line utilities.",
    icon: <GearIcon size={18} weight="bold" />,
  },
];

const learnLinks = [
  {
    href: "#guides",
    title: "Guides",
    description: "Step-by-step tutorials.",
    icon: <BookOpenIcon size={18} weight="bold" />,
  },
  {
    href: "#examples",
    title: "Examples",
    description: "Ready-to-use templates.",
    icon: <RocketLaunchIcon size={18} weight="bold" />,
  },
  {
    href: "#community",
    title: "Community",
    description: "Join the discussion.",
    icon: <ChatCircleIcon size={18} weight="bold" />,
  },
];
