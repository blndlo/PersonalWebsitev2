# Blog post templates

To publish one: copy the `.md` file into `src/content/blog/` and add a matching entry to
`allPosts` in `src/data/posts.ts`, e.g.

```ts
{
  slug: 'how-this-blog-works',
  title: 'How this blog works',
  excerpt: 'Explains how to add local and external posts.',
  date: '2026-11-19',
  category: 'Tutorial',
  tags: ['React', 'Vite'],
},
```

External post (Medium, dev.to, ...): no `.md` file, just add `externalUrl` and `readMinutes`.
