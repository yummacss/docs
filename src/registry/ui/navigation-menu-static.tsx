"use client";

import { Button } from "@base-ui/react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import {
  BookOpen,
  ChevronDown,
  Code,
  Comment,
  Gear,
  Puzzle,
  Rocket,
} from "@gravity-ui/icons";
import type { ReactNode } from "react";

function NavTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <NavigationMenu.Trigger
      className={(state) =>
        `d-f ai-c jc-c g-1 h-10 px-3 bw-0 br-pill fs-sm fw-500 c-slate-10 us-none td-none h:bg-silver-1 ${
          state.open ? "bg-silver-1" : "bg-transparent"
        } ${className || ""}`
      }
      render={(props, state) => (
        <Button {...props}>
          {children}
          <NavigationMenu.Icon
            className="d-f"
            style={{ transform: state.open ? "rotate(180deg)" : "rotate(0)" }}
          >
            <ChevronDown className="w-3 h-3" />
          </NavigationMenu.Icon>
        </Button>
      )}
    />
  );
}

export default function NavigationMenuStatic() {
  return (
    <NavigationMenu.Root className="min-w-max p-1 bg-white bc-silver-2 br-pill bw-1">
      <NavigationMenu.List className="d-f p-r g-1">
        <NavigationMenu.Item>
          <NavTrigger>Developers</NavTrigger>
          <NavigationMenu.Content className="p-2">
            <ul className="d-f fd-c g-1 w-56">
              {developerLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="d-f ai-fs g-3 p-2 br-md td-none h:bg-silver-1"
                  >
                    <span className="d-f ai-c jc-c fs-0 w-8 h-8 bg-white bc-silver-2 c-indigo br-md bw-1 bs-o-xs">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="mb-1 c-slate-10 fs-sm fw-500 lh-1">
                        {item.title}
                      </h3>
                      <p className="c-slate-8 fs-xs lh-4">{item.description}</p>
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
            <ul className="d-f fd-c g-1 w-56">
              {learnLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="d-f ai-fs g-3 p-2 br-md td-none h:bg-silver-1"
                  >
                    <span className="d-f ai-c jc-c fs-0 w-8 h-8 bg-white bc-silver-2 c-indigo br-md bw-1 bs-o-xs">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="mb-1 c-slate-10 fs-sm fw-500 lh-1">
                        {item.title}
                      </h3>
                      <p className="c-slate-8 fs-xs lh-4">{item.description}</p>
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
            className="d-f ai-c jc-c h-10 px-3 bg-transparent c-slate-10 bw-0 br-pill fs-sm fw-500 td-none us-none h:bg-silver-1"
          >
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner sideOffset={10} className="zi-50">
          <NavigationMenu.Popup className="o-h bg-white bc-silver-2 br-lg bw-1 bs-o-lg">
            <NavigationMenu.Viewport className="p-r o-h w-full h-full" />
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
    icon: <Code className="w-5 h-5" />,
  },
  {
    href: "#plugins",
    title: "Plugins",
    description: "Extend with custom plugins.",
    icon: <Puzzle className="w-5 h-5" />,
  },
  {
    href: "#tools",
    title: "CLI Tools",
    description: "Command line utilities.",
    icon: <Gear className="w-4 h-4" />,
  },
];

const learnLinks = [
  {
    href: "#guides",
    title: "Guides",
    description: "Step-by-step tutorials.",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    href: "#examples",
    title: "Examples",
    description: "Ready-to-use templates.",
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    href: "#community",
    title: "Community",
    description: "Join the discussion.",
    icon: <Comment className="w-4 h-4" />,
  },
];
