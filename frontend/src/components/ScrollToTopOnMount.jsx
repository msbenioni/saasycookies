import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant jump to top without animation
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
