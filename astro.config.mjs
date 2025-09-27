import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { addTableClass } from './remark-tables';
import { horizontalList } from './horizontal-list';

// https://astro.build/config
export default defineConfig({
    integrations: [mdx({
        rehypePlugins: [addTableClass, horizontalList]
    })],
    redirects: {
        "/pokemon-pl": "/pl/pokemon",
        "/pokemon-pl/pronunciation": "/pl/pronunciation",
    }
});
