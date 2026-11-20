import { Component, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Appshell from './Appshell';

type Props = { children: ReactNode };
type State = { failed: boolean };

// Catches a lazy-loaded page that still fails to load after the one automatic
// reload in App.tsx (e.g. the visitor went offline), so the site shows a
// message instead of a blank page.
export default class ChunkErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <Appshell>
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h1 className="text-lg font-bold">Couldn't load this page</h1>
          <p className="text-muted-foreground">Check your connection and refresh the page.</p>
          <Link to="/blog" className="underline underline-offset-4">
            ← Back to blog
          </Link>
        </div>
      </Appshell>
    );
  }
}
