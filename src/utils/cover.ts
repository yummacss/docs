import { z } from "zod";

/** The marks a `logos` cover can show beside the Yumma logomark. */
export const COVER_LOGOS = ["base-ui"] as const;

export const coverSchema = z.union([
  // a path to a finished image, as every post before generated covers has
  z.string().startsWith("/"),
  z.enum(["release", "text", "logos"]),
  z.object({
    template: z.enum(["release", "text", "logos"]),
    text: z.string().optional(),
    theme: z.enum(["dark", "light"]).optional(),
    logos: z.array(z.enum(COVER_LOGOS)).optional(),
  }),
]);

export type CoverSpec = {
  template: "release" | "text" | "logos";
  text: string;
  theme: "dark" | "light";
  logos: (typeof COVER_LOGOS)[number][];
};

type Raw = z.infer<typeof coverSchema>;

/** A cover to draw, or null when the post names an image file. */
export function coverSpec(
  raw: Raw | undefined,
  title: string,
): CoverSpec | null {
  if (raw === undefined || (typeof raw === "string" && raw.startsWith("/"))) {
    return null;
  }
  const spec = typeof raw === "string" ? { template: raw } : raw;
  const template = spec.template as CoverSpec["template"];
  // a release shows its number: "Yumma CSS 4.2" is "4.2"
  const fallback =
    template === "release" ? title.replace(/^.*?(\d[\d.]*)$/, "$1") : title;
  return {
    template,
    text: ("text" in spec && spec.text) || fallback,
    theme: ("theme" in spec && spec.theme) || "dark",
    logos: ("logos" in spec && spec.logos) || [],
  };
}

export const coverUrl = (raw: Raw | undefined, slug: string) =>
  raw === undefined
    ? undefined
    : typeof raw === "string" && raw.startsWith("/")
      ? raw
      : `/blog/${slug}/cover.png`;
