// example-remark-plugin.mjs
import { visit } from 'unist-util-visit'

export function addTableClass() {
    return function (tree) {
        visit(tree, 'element', (node, index, parent) => {
            if (node.tagName === 'table') {
                node.properties = node.properties || {};
                node.properties.className = (node.properties.className || []).concat("table", "table-striped", "table-light");
                const div = {
                    type: 'element',
                    tagName: 'div',
                    properties: { className: "overflow-x-auto" },
                    children: [node],
                    position: node.position,
                }
                parent.children.splice(index, 1, div)
            }
        });
    };
}