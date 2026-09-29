import { describe, expect, it } from "vitest";
import { coverSchema, coverSpec, coverUrl } from "@/utils/cover";

describe("blog covers", () => {
  it("keeps a path to a finished image as it is", () => {
    expect(coverUrl("/blog/yummacss-4.0.0.png", "yummacss-4.0.0")).toBe(
      "/blog/yummacss-4.0.0.png",
    );
    expect(coverSpec("/blog/yummacss-4.0.0.png", "Yumma CSS 4.0")).toBeNull();
  });

  it("draws a template at the post's own address", () => {
    expect(coverUrl("release", "yummacss-4.2.0")).toBe(
      "/blog/yummacss-4.2.0/cover.png",
    );
  });

  it("shows a release's number and a post's title by default", () => {
    expect(coverSpec("release", "Yumma CSS 4.2")).toEqual({
      template: "release",
      text: "4.2",
      theme: "dark",
      logos: [],
    });
    expect(coverSpec({ template: "text" }, "Behind the Scenes")).toMatchObject({
      text: "Behind the Scenes",
    });
  });

  it("takes text, a light theme and extra logos", () => {
    expect(
      coverSpec(
        { template: "logos", theme: "light", logos: ["base-ui"] },
        "Hello Yumma UI!",
      ),
    ).toMatchObject({ theme: "light", logos: ["base-ui"] });
  });

  it("refuses a template that does not exist", () => {
    expect(coverSchema.safeParse("poster").success).toBe(false);
    expect(
      coverSchema.safeParse({ template: "logos", logos: ["other"] }).success,
    ).toBe(false);
  });
});
