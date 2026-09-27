"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Slider } from "@base-ui/react/slider";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { usePlayground } from "@/components/playground/context";
import HintTooltip from "@/components/ui/hint-tooltip";
import { ACCENTS, accentSwatch } from "@/utils/accent";
import { STYLE_OWNED } from "@/utils/props";
import { RADIUS, STYLES, styleProps } from "@/utils/styles.mjs";

const SPECS: Record<
  string,
  { name: string; allow: string[]; refused: Record<string, string> }
> = STYLES;

const SWATCHES = ACCENTS.map((family) => ({
  family,
  color: accentSwatch(family),
}));

const LABEL = "c:silver-8 fs:xs";

/** Style, Radius and Accent: how the preview looks, apart from the API. */
export default function Look() {
  const playground = usePlayground();
  if (!playground) return null;

  const props = playground.meta?.props ?? [];
  const styled: Record<string, unknown> = styleProps(
    props,
    playground.style,
    playground.radius,
  );
  const owned = props
    .filter((prop) => STYLE_OWNED.includes(prop.name))
    .map((prop) => `${prop.name} ${styled[prop.name] ?? prop.default}`);

  return (
    <div className="d:f fd:c g:5">
      <div className="d:f fd:c g:2">
        <HintTooltip label="The style and radius of the code you copy.">
          <span className={LABEL}>Style</span>
        </HintTooltip>
        <ToggleGroup
          aria-label="Style"
          value={[playground.style]}
          onValueChange={(next) => next[0] && playground.setStyle(next[0])}
          className="d:g gtc:3 bc:border bw:1"
        >
          {Object.keys(STYLES).map((id) => (
            <Toggle
              key={id}
              value={id}
              className={(state) =>
                `h:8 bw:0 fs:xs us:none c:p fv:oo:-2 fv:oc:accent ${
                  state.pressed
                    ? "bg:border c:ink"
                    : "bg:transparent c:ink/60 h:c:ink"
                }`
              }
            >
              {SPECS[id].name}
            </Toggle>
          ))}
        </ToggleGroup>
        {owned.length > 0 && (
          <p className="c:silver-8 ff:m fs:xs">{owned.join(" · ")}</p>
        )}
      </div>

      <Radius />

      <div className="d:f fd:c g:2">
        <div className="d:f ai:c jc:sb">
          <HintTooltip label="Preview only. The code you copy is unchanged.">
            <span className={LABEL}>Accent</span>
          </HintTooltip>
          <span className="c:ink fs:xs">{playground.accent}</span>
        </div>
        <RadioGroup
          aria-label="Accent"
          value={playground.accent}
          onValueChange={(next) => playground.setAccent(String(next))}
          className="d:g gtc:10 g:1"
        >
          {SWATCHES.map(({ family, color }) => (
            <Radio.Root
              key={family}
              value={family}
              aria-label={family}
              style={{ backgroundColor: color }}
              className={(state) =>
                `d:b ar:1/1 p:0 bw:1 bc:ink/15 c:p fv:ow:2 fv:os:s fv:oc:accent fv:oo:2 ${
                  state.checked ? "ow:2 os:s oc:ink oo:2" : ""
                }`
              }
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

function Radius() {
  const playground = usePlayground();
  if (!playground) return null;

  const spec = SPECS[playground.style];
  const allowed = RADIUS.map((step) => spec.allow.includes(step));
  const low = allowed.indexOf(true);
  const high = allowed.lastIndexOf(true);
  const index = RADIUS.indexOf(playground.radius);
  const percent = (step: number) => `${(step / (RADIUS.length - 1)) * 100}%`;
  const reasons = [
    ...new Set(
      RADIUS.filter((_, step) => !allowed[step]).map(
        (step) => spec.refused[step],
      ),
    ),
  ];

  return (
    <div className="d:f fd:c g:2">
      <div className="d:f ai:c jc:sb">
        <span className={LABEL}>Radius</span>
        <span className="c:ink fs:xs">{playground.radius}</span>
      </div>
      <Slider.Root
        value={index}
        min={0}
        max={RADIUS.length - 1}
        step={1}
        onValueChange={(next) => {
          const step = Math.min(high, Math.max(low, Number(next)));
          if (step !== index) playground.setRadius(RADIUS[step]);
        }}
      >
        <Slider.Control className="d:f ai:c h:7 mx:2 c:p">
          <Slider.Track className="p:r w:100% h:px bg:ink/15">
            {low > 0 && (
              <span
                aria-hidden
                className="p:a t:-1 h:2 bg:ink/15"
                style={{ left: 0, width: percent(low) }}
              />
            )}
            {high < RADIUS.length - 1 && (
              <span
                aria-hidden
                className="p:a t:-1 h:2 bg:ink/15"
                style={{ left: percent(high), right: 0 }}
              />
            )}
            <span
              aria-hidden
              className="p:a t:0 h:px bg:accent"
              style={{ left: percent(low), width: percent(index - low) }}
            />
            <Slider.Thumb
              aria-label="Radius"
              getAriaValueText={(_, value) => RADIUS[value]}
              className="d:b w:3 h:3 br:9999 bg:accent bw:2 bc:page fv:ow:2 fv:os:s fv:oc:accent fv:oo:1"
            />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
      {reasons.length > 0 && (
        <p className="c:silver-8 fs:xs">{reasons.join(" ")}</p>
      )}
    </div>
  );
}
