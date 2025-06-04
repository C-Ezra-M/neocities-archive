/*
 * BE DEAD SIMPLE ABOUT IT.
 * - Fn: link to a footnote
 * - FnDef: footnote definition
 * - Footnotes: formatting for a footnote list
 */

export const footnotes = new Map<string, number>();

export function getFootnoteNumber(slug: string): number {
    return footnotes.entries().toArray().findIndex(e => e[0] === slug) + 1;
}

export function getFootnoteUsageCount(slug: string): number {
    return footnotes.entries().toArray().find(e => e[0] === slug)?.[1] ?? 0;
}

export function useFootnote(slug: string): number {
    let newCount: number;
    footnotes.set(slug, (newCount =
        footnotes.has(slug)
        ? footnotes.get(slug) + 1
        : 1)
    )
    return newCount
}