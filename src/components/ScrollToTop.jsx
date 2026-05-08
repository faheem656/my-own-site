'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Multiple methods to ensure scroll works
    const scrollToTop = () => {
      // Method 1: Standard scroll
      window.scrollTo(0, 0);
      
      // Method 2: For browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 3: For smooth scrolling
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
    };

    // Execute immediately
    scrollToTop();
    
    // Execute after a tiny delay (for Lenis)
    const timeoutId = setTimeout(scrollToTop, 10);
    const timeoutId2 = setTimeout(scrollToTop, 100);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [pathname]);

  return <>{children}</>;
}