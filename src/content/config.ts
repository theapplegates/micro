import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    imageURL: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
