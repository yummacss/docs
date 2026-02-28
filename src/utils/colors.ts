import tinycolor from "tinycolor2";

export const SHADE_LABELS = [
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

export const LEGACY_SHADE_LABELS = [
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "Base",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
];

export const COLOR_FAMILIES: { name: string; color: string }[] = [
  { name: "Red", color: "#e63946" },
  { name: "Orange", color: "#ff6b35" },
  { name: "Yellow", color: "#ffb81c" },
  { name: "Lime", color: "#84cc16" },
  { name: "Mint", color: "#10b981" },
  { name: "Green", color: "#06d6a0" },
  { name: "Cyan", color: "#06b6d4" },
  { name: "Sky", color: "#38bdf8" },
  { name: "Blue", color: "#2563eb" },
  { name: "Indigo", color: "#6366f1" },
  { name: "Violet", color: "#8b5cf6" },
  { name: "Lavender", color: "#a78bfa" },
  { name: "Magenta", color: "#d946ef" },
  { name: "Pink", color: "#ec4899" },
  { name: "Coral", color: "#ff6f91" },
  { name: "Zinc", color: "#52525b" },
  { name: "Gray", color: "#6b7280" },
  { name: "Slate", color: "#64748b" },
  { name: "Silver", color: "#9ca3af" },
];

export function generateShades(
  color: string,
  whitePercentage = 14,
  blackPercentage = 14,
): string[] {
  const shades: string[] = [];

  for (let i = 1; i <= 6; i++) {
    const weight = (7 - i) * whitePercentage;
    const mixedColor = tinycolor.mix(color, "white", weight);
    shades.push(mixedColor.toHexString());
  }

  shades.push(tinycolor(color).toHexString());

  for (let i = 1; i <= 6; i++) {
    const weight = i * blackPercentage;
    const mixedColor = tinycolor.mix(color, "black", weight);
    shades.push(mixedColor.toHexString());
  }

  return shades;
}

export function getBorderColor(color: string): string {
  const luminance = tinycolor(color).getLuminance();

  if (luminance > 0.9) {
    return "1px solid rgba(0, 0, 0, 0.25)";
  }

  if (luminance < 0.1) {
    return "1px solid rgba(255, 255, 255, 0.25)";
  }

  return "none";
}
