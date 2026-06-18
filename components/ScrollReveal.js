'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -32px 0px' });

    const observeReveals = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        const siblings = el.parentElement?.querySelectorAll('.reveal');
        if (siblings) {
          const idx = Array.from(siblings).indexOf(el);
          if (!el.style.transitionDelay) {
            el.style.transitionDelay = `${idx * 0.07}s`;
          }
        }
        revealObserver.observe(el);
      });
    };

    observeReveals();

    // Setup an observer for dynamic elements added later
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldObserve = false;
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          shouldObserve = true;
        }
      });
      if (shouldObserve) {
        observeReveals();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
