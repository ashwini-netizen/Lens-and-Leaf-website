import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 * Automatically observes all elements with .reveal-on-scroll.
 * Adds .is-revealed class when element scrolls into view or appears dynamically.
 * Features an automatic MutationObserver so dynamic content and category filter tab switches
 * instantly reveal their visible photos without getting stuck in an invisible state.
 */
export default function useScrollReveal(dependency) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasIO = 'IntersectionObserver' in window;
    let observer = null;

    if (hasIO) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '60px 0px 60px 0px',
          threshold: 0.01,
        }
      );
    }

    const scanAndReveal = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in viewport, above viewport, or close to it, reveal immediately
        if (rect.top < windowHeight + 80 && rect.bottom > -80) {
          el.classList.add('is-revealed');
          if (observer) observer.unobserve(el);
        } else if (observer) {
          observer.observe(el);
        } else {
          // Fallback if no IntersectionObserver
          el.classList.add('is-revealed');
        }
      });
    };

    // Run immediately and after paint
    scanAndReveal();
    const rafId = requestAnimationFrame(scanAndReveal);
    const timeoutId = setTimeout(scanAndReveal, 60);

    // MutationObserver to automatically detect category filter tab switches and dynamically rendered items
    let mutationObserver = null;
    if ('MutationObserver' in window) {
      mutationObserver = new MutationObserver(() => {
        scanAndReveal();
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const handleScrollOrResize = () => {
      scanAndReveal();
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [dependency]);
}
