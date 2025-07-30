// example-remark-plugin.mjs
import { visit } from 'unist-util-visit'

export function horizontalList() {
    return function (tree) {
        visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
            if (node.name === 'HorizontalList') {
                const items = node.children[0].children;
                items.forEach(e => {
                    e.properties = { className: "list-inline-item" }
                });
                node.children = items
            }
        });
    };
}