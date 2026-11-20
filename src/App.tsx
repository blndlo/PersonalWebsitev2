import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Blog from './components/Blog';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';

const CHUNK_RELOAD_KEY = 'chunk-reload';

// Loaded on demand so the Markdown renderer isn't in the main bundle.
// If a new deploy removed the old hashed chunk, reload once to get the new build
// (the sessionStorage flag prevents a reload loop).
const BlogPost = lazy(() =>
  import('./components/BlogPost')
    .then((module) => {
      try {
        sessionStorage.removeItem(CHUNK_RELOAD_KEY);
      } catch {
        /* storage unavailable */
      }
      return module;
    })
    .catch((error: unknown) => {
      let alreadyReloaded = true;
      try {
        alreadyReloaded = sessionStorage.getItem(CHUNK_RELOAD_KEY) !== null;
        if (!alreadyReloaded) sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
      } catch {
        /* storage unavailable: don't risk a loop */
      }
      if (alreadyReloaded) throw error;
      window.location.reload();
      return new Promise<never>(() => {});
    }),
);

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/home" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={null}>
              <BlogPost />
            </Suspense>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
