import { z } from "zod";

/** The marks a feature row can show, drawn from svgl.app. */
export const COVER_LOGOS = ["base-ui", "typescript", "youtube"] as const;

const featureSchema = z.object({
  label: z.string(),
  code: z.string().optional(),
  logo: z.enum(COVER_LOGOS).optional(),
});

export const coverSchema = z.union([
  z.enum(["release", "text"]),
  z.object({
    template: z.enum(["release", "text"]),
    text: z.string().optional(),
    product: z.enum(["Yumma CSS", "Yumma UI"]).optional(),
    features: z.array(featureSchema).max(4).optional(),
  }),
]);

export type CoverFeature = z.infer<typeof featureSchema>;

export type CoverSpec = {
  template: "release" | "text";
  text: string;
  product: "Yumma CSS" | "Yumma UI";
  date: string;
  features: CoverFeature[];
};

type Raw = z.infer<typeof coverSchema>;

const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/** What to draw for a post's cover, or null when it has none. */
export function coverSpec(
  raw: Raw | undefined,
  title: string,
  date: string,
): CoverSpec | null {
  if (raw === undefined) return null;
  const spec = typeof raw === "string" ? { template: raw } : raw;
  // a release shows its number: "Yumma CSS 4.2" is "4.2"
  const fallback =
    spec.template === "release"
      ? title.replace(/^.*?(\d[\d.]*)$/, "$1")
      : title;
  return {
    template: spec.template,
    text: ("text" in spec && spec.text) || fallback,
    product: ("product" in spec && spec.product) || "Yumma CSS",
    date: longDate(date),
    features: ("features" in spec && spec.features) || [],
  };
}

export const coverUrl = (raw: Raw | undefined, slug: string) =>
  raw === undefined ? undefined : `/blog/${slug}/cover.png`;

/** The link preview, which every post has: its mark and its title. */
export const ogUrl = (slug: string) => `/blog/${slug}/og.png`;
