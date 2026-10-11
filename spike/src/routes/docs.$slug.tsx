import { createFileRoute } from "@tanstack/react-router";
import { docsPage } from "../pages";

export const Route = createFileRoute("/docs/$slug")({
  loader: ({ params }) => docsPage({ data: params.slug }),
  head: ({ loaderData }) => ({ meta: [{ title: loaderData?.title }, { name: "description", content: loaderData?.description }] }),
  component: () => Route.useLoaderData().Page,
});
