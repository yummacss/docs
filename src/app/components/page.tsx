import { allUis } from "content-collections";
import {
  GalleryA,
  GalleryB,
  GalleryC,
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
  const View = { a: GalleryA, b: GalleryB, c: GalleryC }[v] ?? GalleryA;

  return (
    <div className="pb:16">
      <h1 className="m:0 ff:display fw:400 fs:4xl c:ink lh:1">Yumma UI</h1>
      <p className="mt:3 mb:10 c:ink/70 max-w:xl">
        Components styled with Yumma CSS and Base UI, each one installed as a
        file you own.
      </p>
      <View items={items} />
    </div>
  );
}
