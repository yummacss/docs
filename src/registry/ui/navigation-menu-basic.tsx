"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { CaretDownIcon } from "@phosphor-icons/react";

export default function ExampleNavigationMenu() {
  return (
    <NavigationMenu.Root className="min-w-max br-1 bw-1 bc-silver-4 bg-silver-1 p-1">
      <NavigationMenu.List className="p-r d-f m-0 p-0">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="d-f ai-c jc-c g-1 h-10 px-3 m-0 ow-0 bw-0 br-1 bg-transparent fs-sm fw-500 c-slate-11 us-none td-n c-p navmenu-trigger">
            Overview
            <NavigationMenu.Icon className="navmenu-icon">
              <CaretDownIcon size={12} />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="navmenu-content">
            <ul className="d-g m-0 p-0 navmenu-grid">
              {overviewLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="d-b p-2 br-1 td-n c-inherit h:bg-silver-2"
                  >
                    <h3 className="m-0 mb-1 fs-sm fw-500 c-slate-12">
                      {item.title}
                    </h3>
                    <p className="m-0 fs-xs c-slate-11">{item.description}</p>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="d-f ai-c jc-c g-1 h-10 px-3 m-0 ow-0 bw-0 br-1 bg-transparent fs-sm fw-500 c-slate-11 us-none td-n c-p navmenu-trigger">
            Handbook
            <NavigationMenu.Icon className="navmenu-icon">
              <CaretDownIcon size={12} />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="navmenu-content">
            <ul className="d-f fd-c g-0 m-0 p-0 max-w-96">
              {handbookLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="d-b p-2 br-1 td-n c-inherit h:bg-silver-2"
                  >
                    <h3 className="m-0 mb-1 fs-sm fw-500 c-slate-12">
                      {item.title}
                    </h3>
                    <p className="m-0 fs-xs c-slate-11">{item.description}</p>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="https://github.com/rrenildopereiraa/yumma-css"
            className="d-f ai-c jc-c g-1 h-10 px-3 m-0 ow-0 bw-0 br-1 bg-transparent fs-sm fw-500 c-slate-11 us-none td-n c-p"
          >
            GitHub
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={10}
          className="navmenu-positioner"
        >
          <NavigationMenu.Popup className="navmenu-popup">
            <NavigationMenu.Viewport className="p-r w-full h-full o-h" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>

      <style>{`
        .navmenu-trigger[data-popup-open] {
          background-color: #dadcdf;
        }
        .navmenu-icon {
          transition: transform 0.2s ease;
        }
        .navmenu-icon[data-popup-open] {
          transform: rotate(180deg);
        }
        .navmenu-grid {
          display: grid;
          grid-template-columns: 12rem 12rem;
        }
        .navmenu-positioner {
          --duration: 0.35s;
          --easing: cubic-bezier(0.22, 1, 0.36, 1);
          width: var(--positioner-width);
          height: var(--positioner-height);
          max-width: var(--available-width);
          transition: top var(--duration) var(--easing),
                      left var(--duration) var(--easing),
                      right var(--duration) var(--easing),
                      bottom var(--duration) var(--easing);
        }
        .navmenu-positioner[data-instant] {
          transition: none;
        }
        .navmenu-popup {
          position: relative;
          border-radius: 0.25rem;
          background-color: #ffffff;
          transform-origin: var(--transform-origin);
          transition: opacity var(--duration) var(--easing),
                      transform var(--duration) var(--easing),
                      width var(--duration) var(--easing),
                      height var(--duration) var(--easing);
          width: var(--popup-width);
          height: var(--popup-height);
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          border: 1px solid #dadcdf;
        }
        .navmenu-popup[data-starting-style],
        .navmenu-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.9);
        }
        .navmenu-content {
          padding: 1.5rem;
          width: max-content;
          height: 100%;
          transition: opacity 0.175s ease,
                      transform var(--duration) var(--easing);
        }
        .navmenu-content[data-starting-style],
        .navmenu-content[data-ending-style] {
          opacity: 0;
        }
      `}</style>
    </NavigationMenu.Root>
  );
}

const overviewLinks = [
  {
    href: "#introduction",
    title: "Introduction",
    description: "Get started with Yumma UI components.",
  },
  {
    href: "#accessibility",
    title: "Accessibility",
    description: "Learn how we build accessible components.",
  },
  {
    href: "#releases",
    title: "Releases",
    description: "See what's new in the latest versions.",
  },
  {
    href: "#about",
    title: "About",
    description: "Learn more about Yumma UI and our mission.",
  },
];

const handbookLinks = [
  {
    href: "#styling",
    title: "Styling",
    description: "Style components with Yumma CSS utility classes.",
  },
  {
    href: "#animation",
    title: "Animation",
    description: "Animate components with CSS transitions or JS libraries.",
  },
  {
    href: "#composition",
    title: "Composition",
    description: "Compose components with your existing React components.",
  },
];
