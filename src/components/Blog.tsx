import { useState } from 'react';
import { Search } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Appshell from './Appshell';
import PageHeader from './PageHeader';
import FilterPills from './FilterPills';
import PostRow from './PostRow';
import ComingSoon from './ComingSoon';
import { posts, postCategories } from '@/data/posts';

export default function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const search = query.trim().toLowerCase();
  const visiblePosts = posts.filter(
    (post) =>
      (category === 'All' || post.category === category) &&
      (!search ||
        [post.title, post.excerpt, post.category, ...post.tags].some((text) =>
          text.toLowerCase().includes(search),
        )),
  );

  return (
    <Appshell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 md:px-8">
        <PageHeader title="Blog" subtitle="Thoughts on cloud, code and everything else" />

        {posts.length === 0 ? (
          <ComingSoon message="The first posts on cloud and code are on their way. Check back soon." />
        ) : (
          <>
            <Card className="gap-3 rounded-md py-3">
              <CardContent className="flex flex-col gap-3">
                <div className="relative max-w-md">
                  <Search
                    aria-hidden="true"
                    className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2"
                  />
                  <Input
                    type="search"
                    aria-label="Search posts"
                    placeholder="Search posts..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="rounded-sm pl-8"
                  />
                </div>
                <FilterPills
                  label="Category"
                  options={postCategories}
                  active={category}
                  onChange={setCategory}
                />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              {visiblePosts.length > 0 ? (
                visiblePosts.map((post) => <PostRow key={post.slug} post={post} />)
              ) : (
                <p className="text-muted-foreground py-8 text-center">
                  No posts match your search.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </Appshell>
  );
}
