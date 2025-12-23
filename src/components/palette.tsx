"use client";

import { Dialog, Tooltip } from "@base-ui/react";
import { CheckIcon, CopyIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import tinycolor from "tinycolor2";

interface ColorItem {
  name: string;
  color: string;
}

interface PaletteProps {
  data: ColorItem[];
}

const SHADE_LABELS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "Base",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const generateShades = (color: string): string[] => {
  const shades: string[] = [];

  for (let i = 1; i <= 6; i++) {
    const weight = (7 - i) * 14;
    const mixedColor = tinycolor.mix(color, "white", weight);
    shades.push(mixedColor.toHexString());
  }

  // Base
  shades.push(tinycolor(color).toHexString());

  // Darker
  for (let i = 1; i <= 6; i++) {
    const weight = i * 14;
    const mixedColor = tinycolor.mix(color, "black", weight);
    shades.push(mixedColor.toHexString());
  }

  return shades;
};

const getBorderStyle = (color: string): string => {
  const luminance = tinycolor(color).getLuminance();

  if (luminance > 0.9) {
    return "b-1 bc-black/10";
  }

  if (luminance < 0.1) {
    return "b-1 bc-white/10";
  }

  return "b-0";
};

export default function Palette({ data }: PaletteProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<{
    name: string;
    shade: string;
    hex: string;
    rgb: string;
    label: string;
  } | null>(null);

  const [copiedHex, setCopiedHex] = useState(false);
  const [copiedRgb, setCopiedRgb] = useState(false);

  const handleColorClick = (name: string, shade: string, label: string) => {
    const rgb = tinycolor(shade).toRgbString();
    const hex = tinycolor(shade).toHexString().toUpperCase();
    setSelectedColor({ name, shade, hex, rgb, label });
    setCopiedHex(false);
    setCopiedRgb(false);
    setDialogOpen(true);
  };

  const handleShiftClick = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
  };

  const handleCopyHex = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 1500);
  };

  const handleCopyRgb = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedRgb(true);
    setTimeout(() => setCopiedRgb(false), 1500);
  };

  return (
    <div className="p-r">
      <div className="d-f fd-c g-1 o-x-auto pb-2">
        <div className="d-f g-1 min-w-max">
          <div className="w-16 f-s-0" />
          {SHADE_LABELS.map((label) => (
            <div
              key={label}
              className="d-f d-4 sm:d-6 ai-c jc-c fs-xs tc-white fw-500"
              style={{ fontSize: "11px" }}
            >
              {label}
            </div>
          ))}
        </div>

        {data.map((item) => {
          const shades = generateShades(item.color);
          return (
            <div key={item.name} className="d-f ai-c g-1 min-w-max">
              <div
                className="w-16 f-s-0 fs-xs tc-white to-e o-h ws-nw"
                style={{ fontSize: "11px" }}
              >
                {item.name}
              </div>
              {shades.map((shade, index) => (
                <ColorSwatch
                  key={`${item.name}-${index}`}
                  name={item.name}
                  shade={shade}
                  label={SHADE_LABELS[index]}
                  onColorClick={handleColorClick}
                  onShiftClick={handleShiftClick}
                />
              ))}
            </div>
          );
        })}
      </div>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="p-f i-0 bg-black/10 z-50 bf-b-xs" />
          <div className="p-f i-0 z-50 d-f ai-c jc-c">
            <Dialog.Popup className="p-4 rad-0 w-full max-w-80 b-1 p-r g-4 d-g" style={{ backgroundColor: "#151724", borderColor: "#31365e" }}>
              <div className="d-f ai-c jc-sb">
                <div className="d-f fd-c">
                  <Dialog.Title className="fs-lg fw-500 tc-white">
                    {selectedColor?.name} {selectedColor?.label}
                  </Dialog.Title>
                  <Dialog.Description className="fs-xs tc-silver-4">
                    Color details and values
                  </Dialog.Description>
                </div>
                <Dialog.Close className="c-p p-1 tc-white h:tc-white rad-0 b-0 bg-transparent d-f ai-fs">
                  <XIcon className="fs-md" />
                </Dialog.Close>
              </div>

              {selectedColor && (
                <div className="d-f fd-c g-4">
                  <div
                    className={`h-20 w-full rad-0 ${getBorderStyle(
                      selectedColor.shade,
                    )}`}
                    style={{ backgroundColor: selectedColor.shade }}
                  />
                  <div className="d-f fd-c g-2">
                    <div className="d-f ai-c jc-sb">
                      <span className="fs-xs tc-white">Name</span>
                      <span className="fs-xs fw-500 tc-silver-4">
                        {selectedColor.name}
                      </span>
                    </div>
                    <div className="d-f ai-c jc-sb">
                      <span className="fs-xs tc-white">Shade</span>
                      <span className="fs-xs fw-500 tc-silver-4">
                        {selectedColor.label}
                      </span>
                    </div>

                    <div className="d-f ai-c jc-sb">
                      <span className="fs-xs tc-white">HEX</span>
                      <div className="d-f ai-c g-2">
                        <code className="tc-white px-2 py-1 fs-xs ff-m rad-0" style={{ backgroundColor: "#21243f" }}>
                          {selectedColor.hex}
                        </code>
                        <CopyButton
                          value={selectedColor.hex}
                          label="Copy HEX"
                          copied={copiedHex}
                          onCopy={handleCopyHex}
                        />
                      </div>
                    </div>

                    <div className="d-f ai-c jc-sb">
                      <span className="fs-xs tc-white">RGB</span>
                      <div className="d-f ai-c g-2">
                        <code className="tc-white px-2 py-1 fs-xs ff-m rad-0" style={{ backgroundColor: "#21243f" }}>
                          {selectedColor.rgb}
                        </code>
                        <CopyButton
                          value={selectedColor.rgb}
                          label="Copy RGB"
                          copied={copiedRgb}
                          onCopy={handleCopyRgb}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Dialog.Popup>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function ColorSwatch({
  name,
  shade,
  label,
  onColorClick,
  onShiftClick,
}: {
  name: string;
  shade: string;
  label: string;
  onColorClick: (name: string, shade: string, label: string) => void;
  onShiftClick: (hex: string) => void;
}) {
  const [showCopied, setShowCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      const hex = tinycolor(shade).toHexString().toUpperCase();
      onShiftClick(hex);
      setShowCopied(true);
      setTooltipOpen(true);
      setTimeout(() => {
        setShowCopied(false);
        setTooltipOpen(false);
      }, 1500);
    } else {
      onColorClick(name, shade, label);
    }
  };

  return (
    <Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <Tooltip.Trigger
        className={`d-4 sm:d-6 c-p h:t-s-110 oc-none f:oc-black f:os-s f:ow-2 f:oo-2 rad-0 b-s p-0 ${getBorderStyle(
          shade,
        )}`}
        style={{ backgroundColor: shade, transition: "transform 0.1s" }}
        onClick={handleClick}
        aria-label={`${name} ${label}: ${shade}`}
      />
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={8}>
          <Tooltip.Popup
            className="bg-black tc-white fs-xs px-2 py-1 rad-1 z-50 mw-fc ws-nw"
          >
            {showCopied ? "Copied!" : `${name} ${label}`}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function CopyButton({
  value,
  label,
  copied,
  onCopy,
}: {
  value: string;
  label: string;
  copied: boolean;
  onCopy: (value: string) => void;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        onClick={() => onCopy(value)}
        className="p-1 c-p bg-transparent b-0 rad-0 d-f ai-c jc-c"
        aria-label={label}
      >
        {copied ? (
          <CheckIcon className="fs-sm tc-green" />
        ) : (
          <CopyIcon className="fs-sm tc-white" />
        )}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={8}>
          <Tooltip.Popup
            className="bg-black tc-white fs-xs px-2 py-1 rad-1 z-60 mw-fc ws-nw"
          >
            {copied ? "Copied!" : label}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}