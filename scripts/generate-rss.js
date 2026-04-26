import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://cashstreamadvisors.com';
const SITE_TITLE = 'CashStream Advisors';
const SITE_DESCRIPTION = 'Tactical intelligence on cross-border tax, FEMA regulations, and global corporate stewardship.';

async function generateRSS() {
  const postsDir = path.join(process.cwd(), '_posts');
  let items = '';

  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    
    // Sort files by date descending (assuming filename starts with YYYY-MM-DD or we extract date)
    files.sort((a, b) => b.localeCompare(a));

    for (const file of files) {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
      
      // Extract frontmatter using regex
      const titleMatch = content.match(/title:\s*['"]?(.*?)['"]?\n/);
      const slugMatch = content.match(/slug:\s*['"]?(.*?)['"]?\n/);
      const dateMatch = content.match(/datePublished:\s*['"]?(.*?)['"]?\n/);
      const excerptMatch = content.match(/seoDescription:\s*['"]?(.*?)['"]?\n/);
      
      if (titleMatch && slugMatch) {
        const title = titleMatch[1].trim();
        const slug = slugMatch[1].trim();
        const date = dateMatch ? new Date(dateMatch[1].trim()).toUTCString() : new Date().toUTCString();
        
        // Use seoDescription if available, else extract first 150 chars of content
        let description = excerptMatch ? excerptMatch[1].trim() : '';
        if (!description) {
          const bodyContent = content.split('---').pop() || '';
          description = bodyContent.trim().slice(0, 150).replace(/<[^>]*>?/gm, '') + '...';
        }

        items += `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${SITE_URL}/blog/${slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${slug}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`;
      }
    }
  }

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
  
  // Write to public/rss.xml so it gets bundled by Vite
  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rssFeed);
  console.log('RSS Feed successfully generated at public/rss.xml');
}

generateRSS();
