import { Link, useParams } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { tagStyle } from '@/lib/tags';
import Appshell from './Appshell';
import Markdown from './Markdown';
import ReadingProgress from './ReadingProgress';
import { formatPostDate, getPostBody, getReadMinutes, posts } from '@/data/posts';

const backLink = (
  <Link to="/blog" className="text-muted-foreground hover:text-foreground text-xs">
    ← Back to blog
  </Link>
);

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const body = post && getPostBody(post.slug);

  if (!post || !body) {
    return (
      <Appshell>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-16 text-center">
          <h1 className="text-lg font-bold">Post not found</h1>
          {backLink}
        </div>
      </Appshell>
    );
  }

  const readMinutes = getReadMinutes(post);

  return (
    <Appshell>
      <ReadingProgress />
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8 md:px-8">
        {backLink}
        <Card className="rounded-md">
          <CardContent className="flex flex-col gap-4">
            <header className="flex flex-col gap-3 border-b pb-4">
              <h1 className="text-xl font-bold">{post.title}</h1>
              <p className="text-muted-foreground">
                {formatPostDate(post.date)}
                {readMinutes && ` · ${readMinutes} min read`}
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge className={cn('rounded-sm', tagStyle(post.category).tint)}>
                  {post.category}
                </Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>
            <div className="text-sm">
              <Markdown content={body} />
            </div>
          </CardContent>
        </Card>
      </article>
    </Appshell>
  );
}
