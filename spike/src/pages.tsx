import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import DocsPage, { generateMetadata as docsMeta } from "@/app/docs/[slug]/page";
import DocsLayout from "@/app/docs/layout";
import UIPage, { generateMetadata as uiMeta } from "@/app/ui/components/[slug]/page";
import UILayout from "@/app/ui/layout";

// the Next layout and page, rendered as they are, on the server
export const docsPage = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const params = Promise.resolve({ slug });
    const meta = await docsMeta({ params });
    const Page = await renderServerComponent(
      <DocsLayout>
        <DocsPage params={params} />
      </DocsLayout>,
    );
    return { Page, title: `${meta.title} · Yumma CSS`, description: String(meta.description ?? "") };
  });

export const uiPage = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const params = Promise.resolve({ slug });
    const meta = await uiMeta({ params });
    const Page = await renderServerComponent(
      <UILayout>
        <UIPage params={params} />
      </UILayout>,
    );
    return { Page, title: `${meta.title} · Yumma UI`, description: String(meta.description ?? "") };
  });
