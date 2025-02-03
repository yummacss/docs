import { blogSchema } from "starlight-blog/schema";
import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  loader: docsLoader(),
  docs: defineCollection({
    schema: docsSchema({
      extend: (context) => blogSchema(context),
    }),
  }),
};
