import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { addTableClass } from './remark-tables';
import { horizontalList } from './horizontal-list';

// /toki-pona/... -> /tok/... migration (only the pages present at the time of migration)
const tokiPonaSlugs = [
    "/",
    "/mowa-tola",
    "/mowa-tola/ilo",
    "/jan-pawe-kawe",
    "/nimisin",
];

const tokiPonaRedirs = Object.fromEntries(
    tokiPonaSlugs.map(e => ["/toki-pona" + e, "/tok" + e])
)

// https://astro.build/config
export default defineConfig({
    integrations: [mdx({
        rehypePlugins: [addTableClass, horizontalList]
    })],
    redirects: {
        "/pokemon-pl": "/pl/pokemon",
        "/pokemon-pl/pronunciation": "/pl/pronunciation",
        //"/lojban": "/jbo", // was not accessible on the older site
        ...tokiPonaRedirs
    },
});
