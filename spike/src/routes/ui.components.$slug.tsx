import { createFileRoute } from "@tanstack/react-router";
import { uiPage } from "../pages";

export const Route = createFileRoute("/ui/components/$slug")({
  loader: ({ params }) => uiPage({ data: params.slug }),
  head: ({ loaderData }) => ({ meta: [{ title: loaderData?.title }, { name: "description", content: loaderData?.description }] }),
  component: () => Route.useLoaderData().Page,
});
