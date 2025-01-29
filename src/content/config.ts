import { defineCollection } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";
import { docsLoader } from "@astrojs/starlight/loaders";
import { blogSchema } from "starlight-blog/schema";

export const collections = {
  loader: docsLoader(),
  docs: defineCollection({
    schema: docsSchema({
      extend: (context) => blogSchema(context),
    }),
  }),
};
