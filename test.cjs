const fs = require('fs');
const content = fs.readFileSync('_posts/2026-04-26-mca-ccfs-2026-amnesty-scheme-company-compliance.md', 'utf8');
const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
const match = frontmatterRegex.exec(content);
let metadata = {};
if (match) {
  const frontmatter = match[1];
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
console.log(metadata);
