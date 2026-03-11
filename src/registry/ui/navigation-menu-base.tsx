"use client";

import { Button } from "@base-ui/react";
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
        <Button {...props}>
          {children}
          <NavigationMenu.Icon
            className="d-f tp-trf tdu-150 ttf-io"
            style={{ transform: state.open ? "rotate(180deg)" : "rotate(0)" }}
          >
            <CaretDownIcon size={12} />
          </NavigationMenu.Icon>
        </Button>
      )}
    />
  );
}

export default function ExampleNavigationMenu() {
  return (
    <NavigationMenu.Root className="min-w-max p-1 bg-white bc-silver-2 br-pill bw-1">
      <NavigationMenu.List className="d-f p-r g-1 m-0 p-0">
        <NavigationMenu.Item>
          <NavTrigger>Developers</NavTrigger>
          <NavigationMenu.Content className="p-2">
            <ul className="d-f fd-c g-1 m-0 p-0 w-56 ls-n">
              {developerLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="d-f c-inherit ai-fs g-3 p-2 br-2 td-n h:bg-silver-1"
                  >
                    <span className="d-f ai-c jc-c fs-0 w-8 h-8 bg-white bc-silver-2 c-indigo br-2 bw-1 bs-o-xs">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="m-0 mb-1 c-slate-10 fs-sm fw-600">
                        {item.title}
                      </h3>
                      <p className="m-0 c-slate-8 fs-xs lh-4">
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
            <ul className="d-f fd-c g-1 m-0 p-0 w-56 ls-n">
              {learnLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="d-f c-inherit ai-fs g-3 p-2 br-2 td-n h:bg-silver-1"
                  >
                    <span className="d-f ai-c jc-c fs-0 w-8 h-8 bg-white bc-silver-2 c-indigo br-2 bw-1 bs-o-xs">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="m-0 mb-1 c-slate-10 fs-sm fw-600">
                        {item.title}
                      </h3>
                      <p className="m-0 c-slate-8 fs-xs lh-4">
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
            className="d-f ai-c jc-c h-10 px-3 m-0 bg-transparent c-slate-10 bw-0 br-pill fs-sm fw-600 td-n us-none c-p h:bg-silver-1"
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
            className="o-h bg-white bc-silver-2 br-3 bw-1 bs-o-lg"
          >
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
