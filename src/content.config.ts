// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Define your collection(s)
const content = defineCollection({
    loader: glob({ pattern: ["**/*.mdx", "!blog/*"], base: "./content" }),
    schema: z.object({
        title: z.string(),
        lang: z.string().default("en"),
        description: z.string().optional(),
        date: z.coerce.date().optional(),
        updateDate: z.coerce.date().optional(),
    })
});

const blog = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./content/blog" }),
    schema: z.object({
        title: z.string(),
        lang: z.string().default("en"),
        description: z.string().optional(),
        date: z.coerce.date().optional(),
        updateDate: z.coerce.date().optional(),
    })
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { content, blog };