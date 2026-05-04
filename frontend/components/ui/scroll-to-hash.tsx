'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function scrollToHash(hash: string) {
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!id) return;
  const tryScroll = (attempts = 0) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (attempts < 10) {
      setTimeout(() => tryScroll(attempts + 1), 100);
    }
  };
  tryScroll();
}

export function ScrollToHash() {
  const pathname = usePathname();

  // Fires on cross-page navigation (e.g. /en/products → /ar/#private-label)
  useEffect(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }
  }, [pathname]);

  // Fires on same-page hash changes (e.g. already on /ar/ → router.push('/ar/#private-label'))
  useEffect(() => {
    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
}
