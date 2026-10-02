import { describe, expect, it } from "vitest";
import { coverSchema, coverSpec, coverUrl, ogUrl } from "@/utils/cover";

describe("blog covers", () => {
  it("draws every cover at the post's own address", () => {
    expect(coverUrl("release", "yummacss-4.2.0")).toBe(
      "/blog/yummacss-4.2.0/cover.png",
    );
    expect(ogUrl("release", "yummacss-4.2.0")).toBe(
      "/blog/yummacss-4.2.0/og.png",
    );
    expect(coverUrl(undefined, "yummacss-4.2.0")).toBeUndefined();
  });

  it("shows a release's number, a post's title and a long date by default", () => {
    expect(coverSpec("release", "Yumma CSS 4.2", "2026-09-29")).toEqual({
      template: "release",
      text: "4.2",
      product: "Yumma CSS",
      date: "September 29, 2026",
      features: [],
    });
    expect(
      coverSpec({ template: "text" }, "Behind the Scenes", "2026-02-10"),
    ).toMatchObject({ text: "Behind the Scenes" });
  });

  it("takes its own text, product and features", () => {
    expect(
      coverSpec(
        {
          template: "text",
          text: "Hello Yumma UI",
          product: "Yumma UI",
          features: [{ label: "Built on Base UI", logo: "base-ui" }],
        },
        "Hello Yumma UI!",
        "2026-01-11",
      ),
    ).toMatchObject({
      text: "Hello Yumma UI",
      product: "Yumma UI",
      features: [{ label: "Built on Base UI", logo: "base-ui" }],
    });
  });

  it("refuses an image path, an unknown template, a fifth feature and an unknown logo", () => {
    expect(coverSchema.safeParse("/blog/yummacss-4.0.0.png").success).toBe(
      false,
    );
    expect(coverSchema.safeParse("poster").success).toBe(false);
    const feature = { label: "Feature" };
    expect(
      coverSchema.safeParse({
        template: "release",
        features: [feature, feature, feature, feature, feature],
      }).success,
    ).toBe(false);
    expect(
      coverSchema.safeParse({
        template: "release",
        features: [{ label: "Other", logo: "other" }],
      }).success,
    ).toBe(false);
  });
});
