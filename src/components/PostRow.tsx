import { Link } from 'react-router-dom';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { tagStyle } from '@/lib/tags';
import { formatPostDate, getReadMinutes, type Post } from '@/data/posts';

const linkClass = 'block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring';

export default function PostRow({ post }: { post: Post }) {
  const style = tagStyle(post.category);
  const readMinutes = getReadMinutes(post);

  const card = (
    <Card
      className={cn(
        'flex-row justify-between gap-4 rounded-md border-l-4 px-4 transition-shadow hover:shadow-md',
        style.accent,
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold">{post.title}</h2>
        <p className="text-muted-foreground">{post.excerpt}</p>
        <Badge className={cn('rounded-sm', style.tint)}>{post.category}</Badge>
      </div>
      <div className="text-muted-foreground flex shrink-0 flex-col items-end justify-between text-right">
        <div>
          <p>{formatPostDate(post.date)}</p>
          {readMinutes && <p>{readMinutes} min read</p>}
        </div>
        <span className="text-foreground">{post.externalUrl ? 'Read ↗' : 'Read →'}</span>
      </div>
    </Card>
  );

  if (post.externalUrl) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {card}
      </a>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className={linkClass}>
      {card}
    </Link>
  );
}
