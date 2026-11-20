import { useEffect, useRef } from 'react';

// Decorative bar showing how far through a post the reader is. It updates the
// DOM directly once per animation frame instead of re-rendering on every scroll.
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
      });
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-1">
      <div
        ref={barRef}
        className="h-full origin-left bg-emerald-500"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
