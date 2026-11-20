import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Appshell from './Appshell';

export default function NotFound() {
  return (
    <Appshell>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="text-lg font-bold">Page not found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Button variant="outline" className="rounded-sm" asChild>
          <Link to="/about">Go to the home page</Link>
        </Button>
      </div>
    </Appshell>
  );
}
