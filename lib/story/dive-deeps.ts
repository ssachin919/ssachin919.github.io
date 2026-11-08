export type DiveSection = {
  heading?: string;
  body?: string;
  bullets?: string[];
  tags?: string[];
};

export type DiveDeep = {
  id: string;
  title: string;
  eyebrow?: string;
  summary: string;
  sections: DiveSection[];
  links?: { label: string; href: string }[];
};

/**
 * Dive panels retired with the long-form resume narrative.
 * Kept as empty stubs so existing panel imports stay type-safe.
 */
export const diveDeeps: Record<string, DiveDeep> = {};

export const chapterDiveMap: Record<
  string,
  { primary: string; related?: string[] }
> = {};
