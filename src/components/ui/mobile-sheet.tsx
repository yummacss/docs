"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Drawer } from "@base-ui/react/drawer";
import { Input } from "@base-ui/react/input";
import { Tabs } from "@base-ui/react/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Scroller from "@/components/ui/scroller";
import { NavArrowDown, NavArrowRight, Search } from "@/icons";
import { useReveal } from "@/utils/reveal";
import Match from "./match";
import NewBadge, { NewLabel } from "./new-badge";

interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  since?: string;
}

export interface NavSection {
  title: string;
  _key?: string;
  items: NavItem[];
}

export interface Menus {
  docs: NavSection[];
  ui: NavSection[];
}

type Area = keyof Menus;

const AREAS: { value: Area; label: string }[] = [
  { value: "docs", label: "Docs" },
  { value: "ui", label: "Components" },
];

interface Props {
  menus: Menus;
  isOpen: boolean;
  onClose: () => void;
}

const keyOf = (section: NavSection) => section._key ?? section.title;

/** The phone menu: a sheet from the bottom, folded to the section you are in. */
export default function MobileSheet({ menus, isOpen, onClose }: Props) {
  const pathname = usePathname();
  const here: Area = pathname.startsWith("/ui") ? "ui" : "docs";
  const [area, setArea] = useState<Area>(here);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>([]);
  const tab = useRef<HTMLButtonElement>(null);
  const { viewport, active } = useReveal(`${pathname} ${isOpen} ${area}`);

  const current = (sections: NavSection[]) =>
    sections.find((section) =>
      section.items.some((item) => item.href === pathname),
    );

  // each opening starts where you are
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on opening only
  useEffect(() => {
    if (!isOpen) return;
    setArea(here);
    setQuery("");
    const section = current(menus[here]);
    setOpen(section ? [keyOf(section)] : []);
  }, [isOpen]);

  const typed = query.trim();
  const sections = useMemo(() => {
    if (!typed) return menus[area];
    const needle = typed.toLowerCase();
    return menus[area]
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.title.toLowerCase().includes(needle),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [menus, area, typed]);

  // while filtering every match shows; otherwise the reader's folds
  const value = typed ? sections.map(keyOf) : open;

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(next) => !next && onClose()}
      swipeDirection="down"
    >
      <Drawer.Portal>
        <Drawer.Backdrop className="p:f i:0 zi:10 min-h:dvh bg:black/60 bf-b:sm tp:o tdu:300 ttf:eo opening:o:0 closing:o:0 swiping:tp:none @prm:tp:none @lg:d:none" />
        <Drawer.Viewport className="d:f p:f i:0 zi:10 fd:c ai:c jc:fe @lg:d:none">
          <Drawer.Popup
            data-chrome
            aria-label="Menu"
            initialFocus={tab}
            className="d:f fd:c w:100% max-w:sm h:calc(100dvh-4rem) bc:border bg:page c:ink btw:1 os:none tr:var(--drawer-travel) opening:tr:var(--drawer-offstage) closing:tr:var(--drawer-offstage) tp:t tdu:300 ttf:eo swiping:tp:none @prm:tp:none @sm:blw:1 @sm:brw:1"
            style={
              {
                "--drawer-travel": "0 var(--drawer-swipe-movement-y)",
                "--drawer-offstage": "0 calc(100% + 2px)",
              } as CSSProperties
            }
          >
            <div aria-hidden className="fs:0 pt:3 pb:1">
              <div className="w:12 h:1 mx:auto bg:border" />
            </div>

            <Tabs.Root
              value={area}
              onValueChange={(next) => {
                setArea(next as Area);
                const section = current(menus[next as Area]);
                setOpen(section ? [keyOf(section)] : []);
              }}
              className="d:f fd:c f:1 min-h:0"
            >
              <div className="d:g fs:0 g:3 px:4 pt:2 pb:3 bc:border bbw:1">
                <Tabs.List className="d:f bc:border bw:1">
                  {AREAS.map(({ value: name, label }) => (
                    <Tabs.Tab
                      key={name}
                      value={name}
                      ref={name === area ? tab : undefined}
                      className={(state) =>
                        `f:1 py:2 bc:accent fs:sm fv:oc:ink fv:oo:-2 fv:ow:2 ${
                          state.active
                            ? "bg:surface c:ink bbw:2"
                            : "bg:transparent c:ink/60 bbw:0"
                        }`
                      }
                    >
                      {label}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
                <div className="d:f ai:c g:3 h:10 px:3 bc:border bg:surface c:ink/50 bw:1 fw:oc:ink fw:ow:2">
                  <Search className="fs:0 w:4 h:4" />
                  <Input
                    type="text"
                    aria-label="Filter pages"
                    placeholder="Filter pages"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="f:1 min-w:0 bg:transparent c:ink os:none fs:md"
                  />
                </div>
              </div>

              {AREAS.map(({ value: name }) => (
                <Tabs.Panel
                  key={name}
                  value={name}
                  className="d:f fd:c f:1 min-h:0 os:none"
                >
                  <Scroller
                    viewportRef={viewport}
                    viewportClassName="py:2"
                    className="f:1 min-h:0"
                  >
                    {sections.length === 0 && (
                      <p className="px:4 py:8 c:ink/50 ta:c">
                        No pages match "{typed}"
                      </p>
                    )}
                    <Accordion.Root
                      multiple
                      value={value}
                      onValueChange={(next) =>
                        !typed && setOpen(next as string[])
                      }
                    >
                      {sections.map((section) => (
                        <Accordion.Item
                          key={keyOf(section)}
                          value={keyOf(section)}
                        >
                          <Accordion.Header className="m:0 fw:400">
                            <Accordion.Trigger
                              className={(state) =>
                                `d:f ai:c jc:sb w:100% px:4 py:3 bg:transparent bw:0 fs:md ta:l c:p fv:oc:ink fv:oo:-2 fv:ow:2 ${
                                  state.open ? "c:ink" : "c:ink/80"
                                }`
                              }
                            >
                              {section.title}
                              <span className="d:f ai:c g:3 c:ink/50 fs:sm">
                                {section.items.length}
                                {value.includes(keyOf(section)) ? (
                                  <NavArrowDown className="w:4 h:4" />
                                ) : (
                                  <NavArrowRight className="w:4 h:4" />
                                )}
                              </span>
                            </Accordion.Trigger>
                          </Accordion.Header>
                          <Accordion.Panel>
                            <ul className="pb:2">
                              {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                  <li
                                    key={item.href}
                                    ref={isActive ? active : undefined}
                                  >
                                    <Drawer.Close
                                      nativeButton={false}
                                      render={
                                        <Link
                                          href={item.href}
                                          target={
                                            item.external ? "_blank" : undefined
                                          }
                                          rel={
                                            item.external
                                              ? "noopener noreferrer"
                                              : undefined
                                          }
                                        />
                                      }
                                      className={`p:r d:f ai:c g:2 py:2 pr:4 pl:7 fs:md us:none fv:oc:ink fv:oo:-2 fv:ow:2 ${
                                        isActive
                                          ? "c:accent td:u tds:d"
                                          : "c:ink/70 h:c:accent"
                                      }`}
                                    >
                                      <Match text={item.title} query={typed} />
                                      <NewLabel since={item.since} />
                                      <NewBadge since={item.since} />
                                    </Drawer.Close>
                                  </li>
                                );
                              })}
                            </ul>
                          </Accordion.Panel>
                        </Accordion.Item>
                      ))}
                    </Accordion.Root>
                  </Scroller>
                </Tabs.Panel>
              ))}
            </Tabs.Root>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
