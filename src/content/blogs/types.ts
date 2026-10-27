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

// ---------- Lead-capture tool blocks ----------
// At most one of these per post (enforced by scripts/check-blog.mjs), and it
// must be a different kind from whatever lead-capture element already exists
// on the service page this post links to. All result text renders into the
// DOM unconditionally (see BlogPostDetail.tsx) so prerendered snapshots always
// carry the full content; only the reveal is state-driven.

export interface DateOffset {
  label: string; // e.g. "File by (typical 45 days)"
  days: number;
}

export interface DateCalculatorBlock {
  type: 'dateCalculator';
  heading: string;
  intro: string;
  inputLabel: string; // label for the single date input, e.g. "Payment date"
  offsets: DateOffset[]; // fixed day offsets from the docx, never invented
  disclaimer: string; // general-information disclaimer shown with every result
  whatsappMessage: string; // template; {result} is replaced with the computed summary
}

export interface DecisionTreeQuestion {
  id: string;
  question: string;
  options: { label: string; next: string | null }[]; // next: question id, or null to end at `result`
  result?: { title: string; html: string }; // shown when this question is a leaf
}

export interface DecisionTreeBlock {
  type: 'decisionTree';
  heading: string;
  intro: string;
  startId: string;
  questions: DecisionTreeQuestion[]; // 2 to 4 questions total
  whatsappMessage: string; // template; {result} is replaced with the resulting card title
}

export interface DocChecklistScenario {
  id: string;
  label: string; // tab label, e.g. "Property sale"
  documents: string[];
}

export interface DocChecklistBlock {
  type: 'docChecklist';
  heading: string;
  intro: string;
  scenarios: DocChecklistScenario[];
  whatsappMessage: string; // template; {result} is replaced with "I ticked X of Y on the <scenario> checklist"
}

export interface QuoteStarterChoiceGroup {
  label: string; // e.g. "Service"
  options: string[];
}

export interface QuoteStarterBlock {
  type: 'quoteStarter';
  heading: string;
  intro: string;
  groups: QuoteStarterChoiceGroup[]; // exactly 3: service, country, timeline
  whatsappMessage: string; // template; {result} is replaced with the three choices joined
}

export type ToolBlock = DateCalculatorBlock | DecisionTreeBlock | DocChecklistBlock | QuoteStarterBlock;

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  // Caps the on-page display width (px) and centers the figure, for tall/
  // portrait images that would otherwise stretch full-width. Omit for the
  // default full-width treatment.
  displayMaxWidth?: number;
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
  | ImageBlock
  | ToolBlock;

export type InfographicKind = 'comparison' | 'timeline' | 'steps' | 'checklist' | 'none';

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
  // Which generated infographic (if any) scripts/make-images.mjs should produce,
  // sourced only from a block already in this post. 'none' when no block fits.
  infographic?: InfographicKind;
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
