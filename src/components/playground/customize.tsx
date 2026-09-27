"use client";

import { Button } from "@base-ui/react";
import { Collapsible } from "@base-ui/react/collapsible";
import { Drawer } from "@base-ui/react/drawer";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { BaseUI } from "@/components/icons/icons";
import { usePlayground } from "@/components/playground/context";
import Control from "@/components/playground/control";
import Look from "@/components/playground/look";
import PropDescription from "@/components/prop-description";
import HintTooltip from "@/components/ui/hint-tooltip";
import Scroller from "@/components/ui/scroller";
import { NavArrowDown, Sliders, Xmark } from "@/icons";
import { getRegistryTarget, type RegistryProp } from "@/registry";
import { accentSwatch } from "@/utils/accent";
import { useWide } from "@/utils/media";
import { primitiveSlug } from "@/utils/primitive";
import { isControllable, isInert, STYLE_OWNED, typeOf } from "@/utils/props";
import { STYLES } from "@/utils/styles.mjs";

export const customizeHandle = Drawer.createHandle();

const PEEK = "12rem";
const SNAPS = [PEEK, 0.5, 1];

const NAMES: Record<string, { name: string }> = STYLES;

/**
 * Style, Radius, Accent and the Component API in one drawer: docked beside
 * the stage at `@lg:`, a bottom sheet with three heights below it.
 */
export default function Customize({ dock }: { dock: HTMLElement | null }) {
  const playground = usePlayground();
  const wide = useWide();
  const [snap, setSnap] = useState<number | string>(PEEK);

  if (!playground) return null;

  const header = (
    <div className="d:f ai:c jc:sb g:2">
      <Drawer.Title className="c:silver-8 fs:xs ls:2 tt:u fw:400">
        Customize
      </Drawer.Title>
      <Drawer.Close
        aria-label="Close"
        className="d:f fs:0 ai:c jc:c w:7 h:7 p:0 bg:transparent bc:border bw:1 c:ink/70 h:c:ink c:p fv:oc:accent fv:ow:2"
      >
        <Xmark className="w:3 h:3" aria-hidden />
      </Drawer.Close>
    </div>
  );

  const body = (
    <>
      <Look />
      <Api />
    </>
  );

  return (
    <Drawer.Root
      key={wide ? "dock" : "sheet"}
      handle={customizeHandle}
      open={playground.panel}
      onOpenChange={(open) => {
        playground.setPanel(open);
        if (open) setSnap(PEEK);
      }}
      modal={false}
      disablePointerDismissal
      swipeDirection={wide ? "right" : "down"}
      snapPoints={wide ? undefined : SNAPS}
      snapToSequentialPoints
      snapPoint={wide ? null : snap}
      onSnapPointChange={(next) => next !== null && setSnap(next)}
    >
      {/* the dock mounts with the panel, so wait for it rather than land in the body */}
      {(!wide || dock) && (
        <Drawer.Portal container={wide ? dock : undefined}>
          {wide ? (
            <Drawer.Viewport>
              <Drawer.Popup
                data-chrome
                initialFocus={false}
                finalFocus={false}
                className="d:f fd:c h:calc(100dvh-5rem) ow:0"
              >
                <Scroller className="f:1 min-h:0">
                  {/* a mouse drag in here selects text or moves the slider; touch still swipes */}
                  <Drawer.Content className="pb:12 px:8">
                    <div className="mb:4">{header}</div>
                    {body}
                  </Drawer.Content>
                </Scroller>
              </Drawer.Popup>
            </Drawer.Viewport>
          ) : (
            <Drawer.Viewport className="p:f t:0 l:0 r:0 b:0 zi:40 pe:none">
              <Drawer.Popup
                data-chrome
                initialFocus={false}
                finalFocus={false}
                className="p:a l:0 r:0 b:0 d:f fd:c h:calc(100dvh-4rem) bg:surface btw:1 bc:border pe:auto ow:0 tp:t tdu:300 ttf:eo opening:tty:full closing:tty:full @prm:tp:none"
                style={{
                  translate:
                    "0 calc(var(--drawer-snap-point-offset) + var(--drawer-swipe-movement-y))",
                }}
              >
                {/* the handle and title stay out of the scroller, so they always drag the sheet */}
                <div className="px:5 pb:3">
                  <div aria-hidden className="d:f jc:c py:3">
                    <span className="d:b w:10 h:1 bg:ink/20" />
                  </div>
                  {header}
                </div>
                <Scroller className="f:1 min-h:0">
                  <Drawer.Content className="pb:12 px:5">{body}</Drawer.Content>
                </Scroller>
              </Drawer.Popup>
            </Drawer.Viewport>
          )}
        </Drawer.Portal>
      )}
    </Drawer.Root>
  );
}

/** Opens the drawer from the stage's tab bar, and names the current look. */
export function CustomizeTrigger() {
  const playground = usePlayground();
  if (!playground) return null;

  return (
    <Drawer.Trigger
      handle={customizeHandle}
      className="d:f fs:0 ai:c g:2 h:7 px:2 my:1 mr:1 bg:transparent bc:border bw:1 c:ink fs:xs us:none c:p h:bg:surface fv:oc:accent fv:ow:2"
    >
      <span
        aria-hidden
        className="d:b w:3 h:3 bw:1 bc:ink/15"
        style={{ backgroundColor: accentSwatch(playground.accent) }}
      />
      {NAMES[playground.style].name} · {playground.radius}
      <Sliders className="w:4 h:4" aria-hidden />
    </Drawer.Trigger>
  );
}

function Api() {
  const playground = usePlayground();
  const [open, setOpen] = useState<string | null>(null);
  const [more, setMore] = useState(false);

  const props = playground?.meta?.props ?? [];
  const settable = props.filter(isControllable);
  const inCode = props.filter(
    (prop) => !isControllable(prop) && !STYLE_OWNED.includes(prop.name),
  );

  const target = playground ? getRegistryTarget(playground.id) : null;
  const primitive = target
    ? primitiveSlug(target.component, target.install)
    : null;

  const row = (prop: RegistryProp, control: ReactNode) => (
    <Row
      key={prop.name}
      prop={prop}
      inert={isInert(prop, playground?.values ?? {}, props)}
      open={open === prop.name}
      onToggle={() =>
        setOpen((current) => (current === prop.name ? null : prop.name))
      }
    >
      {control}
    </Row>
  );

  return (
    <div className="mt:6 pt:6 bc:border btw:1">
      <div className="d:f ai:c jc:sb g:2 mb:3">
        <h3 className="c:silver-8 fs:xs ls:2 tt:u">Component API</h3>
        {primitive && (
          <HintTooltip label="Base UI reference">
            <Link
              href={`https://base-ui.com/react/components/${primitive}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Base UI reference"
              className="d:f ai:c jc:c fs:0 c:ink/70 td:none h:c:ink fv:oc:accent fv:ow:2"
            >
              <BaseUI className="w:4 h:4" />
            </Link>
          </HintTooltip>
        )}
      </div>

      {settable.map((prop) =>
        row(
          prop,
          <Control
            prop={prop}
            inert={Boolean(isInert(prop, playground?.values ?? {}, props))}
            value={playground?.values[prop.name]}
            onChange={(value) => playground?.setValue(prop.name, value)}
          />,
        ),
      )}

      {inCode.length > 0 && (
        <Collapsible.Root open={more} onOpenChange={setMore}>
          <Collapsible.Trigger className="d:f ai:c jc:sb w:100% px:0 py:3 bg:transparent bw:0 bc:border bbw:1 ta:l c:silver-8 fs:xs c:p h:c:ink fv:oo:-1 fv:oc:accent">
            {more
              ? `Hide the ${inCode.length} set in code`
              : `${inCode.length} more, set in code`}
            <NavArrowDown
              aria-hidden
              className={`fs:0 w:3 h:3 tp:t tdu:150 ${more ? "ro:36" : ""}`}
            />
          </Collapsible.Trigger>
          <Collapsible.Panel>
            {inCode.map((prop) =>
              row(
                prop,
                <code className="fs:0 c:ink/70 fs:xs ff:m">
                  {typeOf(prop)}
                </code>,
              ),
            )}
          </Collapsible.Panel>
        </Collapsible.Root>
      )}
    </div>
  );
}

function Row({
  prop,
  inert,
  open,
  onToggle,
  children,
}: {
  prop: RegistryProp;
  inert?: string | null;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const name = <code className="c:code fs:xs ff:m">{prop.name}</code>;
  const [attempted, setAttempted] = useState(false);

  return (
    <div className="py:2 bc:border bbw:1">
      <div className="d:f ai:c jc:sb g:2 fw:w">
        {prop.description ? (
          <Button
            onClick={onToggle}
            aria-expanded={open}
            className="d:f ai:c g:1 p:0 bg:transparent bw:0 ta:l c:p fv:oo:-1 fv:oc:accent"
          >
            {name}
            <NavArrowDown
              aria-hidden
              className={`fs:0 w:3 h:3 tp:c tdu:150 ${
                open ? "ro:36 c:accent" : "c:ink/25"
              }`}
            />
          </Button>
        ) : (
          name
        )}
        <span
          onPointerDownCapture={() => inert && setAttempted(true)}
          onFocusCapture={() => inert && setAttempted(true)}
        >
          {children}
        </span>
      </div>

      {inert && attempted && (
        <div className="mt:1 c:diff-remove fs:xs">
          Does nothing while <code className="ff:m">{inert}</code>.
        </div>
      )}

      {open && (
        <div className="mt:2 c:ink/60 fs:sm lh:4">
          <PropDescription text={prop.description} />
        </div>
      )}
    </div>
  );
}
