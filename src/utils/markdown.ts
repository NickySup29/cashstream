export interface PostData {
  slug: string;
  title: string;
  seoDescription: string;
  datePublished: string;
  content: string;
}

export function parseMarkdown(rawContent: string): PostData {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(rawContent);
  
  let content = rawContent;
  let metadata: Record<string, string> = {};

  if (match) {
    const frontmatter = match[1];
    content = rawContent.replace(match[0], '').trim();
    
    // Parse simple key: value pairs
    const lines = frontmatter.split('\n');
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
        metadata[key] = value;
      }
    }
  }

  return {
    slug: metadata.slug || '',
    title: metadata.title || 'Untitled',
    seoDescription: metadata.seoDescription || '',
    datePublished: metadata.datePublished || '',
    content: content,
  };
}

export async function getAllPosts(): Promise<PostData[]> {
  // Vite specific way to import multiple raw files
  const postsGlob = import.meta.glob('../../_posts/*.md', { query: '?raw', import: 'default' });
  const posts: PostData[] = [];

  for (const path in postsGlob) {
    const getRawContent = postsGlob[path] as () => Promise<string>;
    const rawContent = await getRawContent();
    const postData = parseMarkdown(rawContent);
    
    // If slug is not defined in frontmatter, generate from filename
    if (!postData.slug) {
      const filename = path.split('/').pop()?.replace('.md', '');
      postData.slug = filename || '';
    }
    
    posts.push(postData);
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}
