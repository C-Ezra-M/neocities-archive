import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { addTableClass } from './remark-tables';

// https://astro.build/config
export default defineConfig({
    integrations: [mdx({
        rehypePlugins: [addTableClass]
    })],
});
