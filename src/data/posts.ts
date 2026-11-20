// Blog posts. Two kinds are supported:
//  1. Local posts: add `src/content/blog/<slug>.md` and an entry below with the
//     same slug. Rendered at /#/blog/<slug>; read time is computed from the file.
//  2. External posts (Medium, dev.to, Hashnode, ...): set `externalUrl` and
//     `readMinutes`, no .md file needed. The row links straight out.
// The category picks the accent colour (see src/lib/tags.ts).

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. '2026-11-20' */
  date: string;
  category: string;
  tags: string[];
  externalUrl?: string;
  /** Only needed for external posts */
  readMinutes?: number;
};

const bodies = import.meta.glob<string>('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function getPostBody(slug: string): string | undefined {
  return bodies[`../content/blog/${slug}.md`];
}

export function getReadMinutes(post: Post): number | undefined {
  if (post.readMinutes) return post.readMinutes;
  const body = getPostBody(post.slug);
  if (!body) return undefined;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatPostDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Add posts here. While the list is empty the page shows "Coming soon".
// Template posts (with example entries) live in docs/blog-templates/.
const allPosts: Post[] = [];

/** Newest first */
export const posts = [...allPosts].sort((a, b) => b.date.localeCompare(a.date));

export const postCategories = ['All', ...new Set(posts.map((post) => post.category))];
