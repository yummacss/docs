import { allUis } from "content-collections";
import {
  GalleryA,
  GalleryB,
  GalleryC,
  GalleryC2,
  GalleryC3,
  GalleryC4,
  GalleryC5,
  GalleryC6,
  type GalleryItem,
} from "@/components/gallery";
import { sidebarConfig } from "@/config/sidebar";

const items: GalleryItem[] = sidebarConfig.ui
  .filter((section) => section.title !== "Get Started")
  .flatMap((section) =>
    section.items.flatMap((entry) =>
      typeof entry === "string" ? [{ id: entry, section: section.title }] : [],
    ),
  )
  .flatMap(({ id, section }) => {
    const ui = allUis.find((u) => u._meta.path === id);
    return ui
      ? [{ id, section, title: ui.title, description: ui.description ?? "" }]
      : [];
  });

export default async function Gallery({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v = "a" } = await searchParams;
  const View =
    {
      a: GalleryA,
      b: GalleryB,
      c: GalleryC,
      c2: GalleryC2,
      c3: GalleryC3,
      c4: GalleryC4,
      c5: GalleryC5,
      c6: GalleryC6,
    }[v] ?? GalleryA;

  return (
    <div className="pb:16">
      <div className="my:8">
        <h1 className="mb:2 ff:display min-w:0 c:ink fs:4xl fw:400 ow:bw">
          Yumma UI
        </h1>
        <p className="c:ink/70 fs:lg">
          Components styled with Yumma CSS and Base UI, each one installed as a
          file you own.
        </p>
      </div>
      <View items={items} />
    </div>
  );
}
