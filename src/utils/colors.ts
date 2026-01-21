import tinycolor from "tinycolor2";

// Shade labels for color generation
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

// Color families with their base RGB values
export const COLOR_FAMILIES: { name: string; color: string }[] = [
  { name: "Red", color: "rgb(215, 61, 61)" },
  { name: "Orange", color: "rgb(224, 104, 20)" },
  { name: "Yellow", color: "rgb(211, 161, 7)" },
  { name: "Green", color: "rgb(31, 177, 85)" },
  { name: "Teal", color: "rgb(18, 166, 149)" },
  { name: "Cyan", color: "rgb(5, 164, 191)" },
  { name: "Blue", color: "rgb(53, 117, 221)" },
  { name: "Indigo", color: "rgb(89, 92, 217)" },
  { name: "Violet", color: "rgb(125, 83, 221)" },
  { name: "Pink", color: "rgb(212, 65, 138)" },
  { name: "Slate", color: "rgb(63, 63, 78)" },
  { name: "Gray", color: "rgb(96, 103, 115)" },
  { name: "Silver", color: "rgb(191, 194, 199)" },
];

// Generate shades for a color (lighter to darker)
export function generateShades(color: string): string[] {
  const percentage = 14;
  const shades: string[] = [];

  for (let i = 1; i <= 6; i++) {
    const weight = (7 - i) * percentage;
    const mixedColor = tinycolor.mix(color, "white", weight);
    shades.push(mixedColor.toHexString());
  }

  shades.push(tinycolor(color).toHexString()); // Base

  for (let i = 1; i <= 6; i++) {
    const weight = i * percentage;
    const mixedColor = tinycolor.mix(color, "black", weight);
    shades.push(mixedColor.toHexString());
  }

  return shades;
}

// Get border color based on luminance (for palette display)
export function getBorderColor(color: string): string {
  const luminance = tinycolor(color).getLuminance();

  if (luminance > 0.9) {
    return "1px solid rgba(0, 0, 0, 0.1)";
  }

  if (luminance < 0.1) {
    return "1px solid rgba(255, 255, 255, 0.1)";
  }

  return "none";
}
