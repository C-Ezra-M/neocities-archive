// example-remark-plugin.mjs
import { visit } from 'unist-util-visit'

export function addTableClass() {
    return function (tree) {
        visit(tree, 'element', (node) => {
            if (node.tagName === 'table') {
                node.properties = node.properties || {};
                node.properties.className = (node.properties.className || []).concat("table", "table-striped", "table-light");
            }
        });
    };
}