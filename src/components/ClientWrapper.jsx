'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import LenisScroll from '@/components/LenisScroll';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip first mount (initial page load)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Small delay to ensure Lenis is ready and navigation is complete
    const timeoutId = setTimeout(() => {
      // Force scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Also handle Lenis if it exists
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  // Handle route changes via Next.js router
  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        }
      }, 50);
    };

    router.prefetch = () => {}; // Monkey patch if needed
    
    return () => {};
  }, [router]);

  return (
    <LenisScroll>
      {children}
    </LenisScroll>
  );
}