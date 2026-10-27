// Shared types for the data-driven Insights (blog) post system.
// One typed content file per post renders through BlogPostDetail.tsx.

export type HeroVariant = 'document' | 'certificate' | 'globe' | 'ledger';

export interface FaqItem {
  q: string;
  // Rich HTML for on-screen rendering (prose classes applied by the renderer).
  a: string;
  // Plain-text version for FAQPage schema, when `a` contains markup/links that
  // shouldn't appear in JSON-LD. Falls back to a stripped version of `a`.
  schemaText?: string;
}

export interface ComparisonTableBlock {
  type: 'comparisonTable';
  headers: string[];
  rows: string[][];
  sourceNote?: string;
}

export interface AnswerBoxBlock {
  type: 'answerBox';
  text: string;
}

export interface LedeBlock {
  type: 'lede';
  text: string;
}

export interface H2Block {
  type: 'h2';
  id: string;
  text: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  // HTML allowed (for inline links), kept minimal.
  html: string;
}

export interface BulletListBlock {
  type: 'bulletList';
  items: string[]; // each item is HTML (for inline links)
}

export interface NumberedStepsBlock {
  type: 'numberedSteps';
  items: string[];
}

export interface CalloutBlock {
  type: 'callout';
  label: string;
  html: string;
}

export interface SourceCiteBlock {
  type: 'sourceCite';
  html: string;
}

export interface ProcessStage {
  day: string;
  title: string;
  desc: string;
}

export interface ProcessTimelineBlock {
  type: 'processTimeline';
  heading: string;
  stages: ProcessStage[];
}

export interface InlineCtaBlock {
  type: 'inlineCta';
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}

export interface FaqBlock {
  type: 'faq';
  heading: string;
  items: FaqItem[];
}

export interface WhoNeedsBlock {
  type: 'whoNeeds';
  heading: string;
  items: string[]; // HTML allowed
}

export interface RelatedCard {
  label: string;
  title: string;
  href: string;
}

export interface RelatedCardsBlock {
  type: 'relatedCards';
  heading: string;
  cards: RelatedCard[];
}

export interface CtaBandBlock {
  type: 'ctaBand';
  heading: string;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export type BlogBlock =
  | AnswerBoxBlock
  | LedeBlock
  | H2Block
  | ParagraphBlock
  | BulletListBlock
  | NumberedStepsBlock
  | ComparisonTableBlock
  | CalloutBlock
  | SourceCiteBlock
  | ProcessTimelineBlock
  | InlineCtaBlock
  | FaqBlock
  | WhoNeedsBlock
  | RelatedCardsBlock
  | CtaBandBlock
  | ImageBlock;

export interface BlogPostContent {
  slug: string;
  title: string;
  titleTag: string;
  metaDescription: string;
  tag: string;
  datePublished: string; // ISO date, e.g. '2026-10-21'
  dateModified: string;
  // Single field so it can be switched from Organization to a named Person in one edit.
  author: { type: 'Organization' | 'Person'; name: string; url?: string };
  heroVariant: HeroVariant;
  targetWords: number;
  // Short line shown under the hero meta row, e.g. the Act/effective-date context sentence.
  heroNote?: string;
  // Real photo/illustration used as the hero visual instead of the generic
  // HeroIcon SVG. Loaded eagerly since it is above the fold.
  heroImage?: { src: string; alt: string; width: number; height: number };
  // Absolute URL for og:image / twitter:image / schema image, 1200x630.
  // Falls back to the sitewide og-image.jpg when omitted.
  ogImage?: string;
  blocks: BlogBlock[];
}
