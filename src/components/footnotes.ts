import { atom, computed } from 'nanostores'

/** The plain interface for footnote objects. It is functionally the same as `Footnote`, but has no methods. */
export interface PlainFootnote {
    /** The footnote's ID, which is slugged. The same as the key in the map. */
    slug?: string;
    /** The group name of the footnote. */
    group?: string;
    /** The content of the footnote. Its type is inferred as "any", since this plugin, like Astro itself, is meant to be framework-agnostic. */
    content?: any;
}

/** The class for footnote objects. */
export class Footnote {
    /** The footnote's ID, which is slugged. The same as the key in the map. */
    slug?: string;
    /** The group name of the footnote. */
    group?: string;
    /** The content of the footnote. Its type is inferred as "any", since this plugin, like Astro itself, is meant to be framework-agnostic. */
    content?: any;

    constructor(settings: PlainFootnote) {
        this.slug = settings.slug;
        this.group = settings.group;
        this.content = settings.content;
    }

    hasContent() {
        return !!this.content
    }

    hasGroup() {
        return !!this.group
    }

    hasSlug() {
        return !!this.slug
    }

    htmlId() {
        return "fn-" + (this.hasSlug() ? this.slug + "-" : "") + 
    }
}

/**
 * The storage for all footnotes on a page.
 */
export const allFootnotes = atom<Footnote[]>([]);

/**
 * Adds a footnote. If a footnote with the given `slug` exists, it will update the information instead.
 * 
 * @param slug The footnote's ID.
 * @param fn The footnote object.
 */
export function addFootnote(slug: string, fn: Footnote) {
    /// add footnote to array
}

export function getFootnote(slug: string) {

}

export function footnote(fn: Footnote): Footnote {
    // has slug only: get footnote from slug
    // has group only: create fn in group
    
    // has slug and content: replace content and warn

    if (!(fn instanceof Footnote)) {
        fn = new Footnote(fn);
    }
    allFootnotes.get().find(e => e.slug === fn.slug)
    // add to array and return a new footnote object if the slug doesn't exist, otherwise return that footnote
    
    if (fn.hasSlug && allFootnotes.get().some(e => e.slug === fn.slug))
    console.warn(`Footnote with slug "${fn.slug}" found with new content. Only the last content provided will be used.`)
}

export function footnote(fn: PlainFootnote): Footnote;

export function getFootnotesByGroup(gp: string) {
    return allFootnotes.get().filter(e => e.group === gp);
}

export function getFootnoteNumber(slug: string, group?: string): number {
    return allFootnotes.get().filter(e => e.group === group).findIndex(e => e.slug === slug)
}