import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

const linkClass = 'underline underline-offset-4 hover:text-muted-foreground';

// Raw HTML in Markdown is NOT rendered (react-markdown default), which keeps
// post content safe from injected scripts.
// Images MUST live in public/blog/ and be referenced as /blog/<file>.png —
// the CSP in public/.htaccess blocks images from other domains.
// rehype-slug gives headings ids so "[see setup](#setup)" links work.
const components: Components = {
  h2: ({ id, children }) => (
    <h2 id={id} className="mt-8 mb-3 text-base font-bold">
      {children}
    </h2>
  ),
  h3: ({ id, children }) => (
    <h3 id={id} className="mt-6 mb-2 text-sm font-bold">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="my-3 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="my-3 list-disc space-y-1 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="my-3 list-decimal space-y-1 pl-6">{children}</ol>,
  a: ({ href = '', children }) => {
    // Site links (e.g. "/blog/other-post") must go through the HashRouter,
    // otherwise the browser requests a real path that 404s on static hosting.
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={linkClass}>
          {children}
        </Link>
      );
    }
    // "#section" would be read as a route by HashRouter; scroll to it instead.
    if (href.startsWith('#')) {
      return (
        <a
          href={href}
          className={linkClass}
          onClick={(event) => {
            event.preventDefault();
            document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {children}
        </a>
      );
    }
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={linkClass}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="text-muted-foreground my-4 border-l-4 pl-4">{children}</blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-md bg-zinc-900 p-4 text-zinc-100 [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  code: ({ className, children }) => (
    <code className={cn('bg-muted rounded-sm px-1 py-0.5', className)}>{children}</code>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border px-3 py-1.5 font-bold">{children}</th>,
  td: ({ children }) => <td className="border px-3 py-1.5">{children}</td>,
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ''}
      loading="lazy"
      decoding="async"
      className="my-4 h-auto max-w-full rounded-md"
    />
  ),
};

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
