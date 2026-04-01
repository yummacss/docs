import type { Metadata } from "next";
import Pagination from "@/components/ui/pagination";
import { getUINavigation } from "@/utils/pagination";

export const metadata: Metadata = {
  title: "Components",
  description: "Browse all Yumma UI components.",
};

export default async function Page() {
  const module = await import("@/content/ui/components.mdx");
  const Content = module.default;
  const meta = module.meta;
  const navigation = getUINavigation("components");

  return (
    <div className="mb-16">
      {meta && (
        <div className="my-8" data-meta>
          <h1 className="mb-2 c-white fs-4xl fw-400">{meta.title}</h1>
          {meta.description && (
            <p className="c-white/70 fs-lg">{meta.description}</p>
          )}
        </div>
      )}
      <Content />
      <Pagination
        previous={navigation.previous}
        next={navigation.next}
        basePath="/ui/components"
      />
    </div>
  );
}
