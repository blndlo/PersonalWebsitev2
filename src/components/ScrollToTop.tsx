import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// HashRouter keeps the scroll position between routes; reset it so e.g. opening
// a blog post from the bottom of the list starts at the top of the post.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
