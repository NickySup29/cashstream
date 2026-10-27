// Shared helpers between the Insights listing page (Insights.tsx) and the
// post detail page (BlogPostDetail.tsx), so reading time / word count are
// computed identically in both places.
import { FileText, Award, Globe2, BookOpen } from 'lucide-react';
import type { BlogBlock, BlogPostContent, HeroVariant } from './types';

export const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&rsquo;|&#8217;/g, '’')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

export function wordsInBlock(block: BlogBlock): string {
  switch (block.type) {
    case 'answerBox':
    case 'lede':
      return block.text;
    case 'h2':
      return block.text;
    case 'paragraph':
      return stripHtml(block.html);
    case 'bulletList':
    case 'numberedSteps':
      return block.items.map(stripHtml).join(' ');
    case 'comparisonTable':
      return [block.headers.join(' '), ...block.rows.map((r) => r.join(' '))].join(' ');
    case 'callout':
    case 'sourceCite':
      return stripHtml(block.html);
    case 'processTimeline':
      return block.stages.map((s) => `${s.title} ${s.desc}`).join(' ');
    case 'inlineCta':
      return block.heading;
    case 'whoNeeds':
      return block.items.map(stripHtml).join(' ');
    case 'faq':
      return block.items.map((f) => `${f.q} ${stripHtml(f.a)}`).join(' ');
    case 'relatedCards':
    case 'ctaBand':
      return '';
    case 'image':
      return block.caption ?? '';
    case 'dateCalculator':
      return [block.heading, block.intro, block.inputLabel, block.disclaimer, ...block.offsets.map((o) => o.label)].join(' ');
    case 'decisionTree':
      return [block.heading, block.intro, ...block.questions.map((q) => `${q.question} ${q.options.map((o) => o.label).join(' ')} ${q.result ? stripHtml(q.result.html) : ''}`)].join(' ');
    case 'docChecklist':
      return [block.heading, block.intro, ...block.scenarios.flatMap((s) => [s.label, ...s.documents])].join(' ');
    case 'quoteStarter':
      return [block.heading, block.intro, ...block.groups.flatMap((g) => [g.label, ...g.options])].join(' ');
    default:
      return '';
  }
}

export function getWordCount(post: BlogPostContent): number {
  return post.blocks
    .map(wordsInBlock)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function getReadingMinutes(post: BlogPostContent): number {
  return Math.max(1, Math.round(getWordCount(post) / 200));
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const HERO_ICON_BY_VARIANT = { document: FileText, certificate: Award, globe: Globe2, ledger: BookOpen };

export function HeroIcon({
  variant,
  size = 56,
  className = 'text-primary',
}: {
  variant: HeroVariant;
  size?: number;
  className?: string;
}) {
  const Icon = HERO_ICON_BY_VARIANT[variant];
  return <Icon size={size} className={className} strokeWidth={1.5} />;
}
