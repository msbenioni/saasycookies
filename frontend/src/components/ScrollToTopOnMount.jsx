import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll to top without animation
    window.history.scrollRestoration = 'manual';
    
    // Multiple methods to ensure instant scroll
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    
    // Also set scroll position immediately
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'auto';
    }
    
    // Reset after a brief delay
    setTimeout(() => {
      if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = '';
      }
    }, 100);
  }, [pathname]);

  return null;
}
