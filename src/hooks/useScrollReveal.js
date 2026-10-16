import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 * Automatically observes all elements with .reveal-on-scroll
 * Adds .is-revealed class when element scrolls into view.
 */
export default function useScrollReveal(dependency) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
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
        rootMargin: '40px 0px 40px 0px',
        threshold: 0.02,
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [dependency]);
}
