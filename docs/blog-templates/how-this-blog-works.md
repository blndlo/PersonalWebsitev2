This is a **template post**. Delete it once you've written a real one.

## Adding a local post

1. Create `src/content/blog/my-post.md` and write the post in Markdown.
2. Add an entry to `src/data/posts.ts` with `slug: 'my-post'`, a title, excerpt, date and category.
3. Run `npm run dev` and open `/#/blog/my-post`.

The read time is calculated from the word count automatically.

## Linking to an external post

If you publish on Medium, dev.to or Hashnode, add an entry with `externalUrl` and `readMinutes`
instead of a Markdown file. The post row will open the article in a new tab.
