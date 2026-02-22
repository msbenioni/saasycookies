import { useEffect } from 'react';
import { site } from '../config/site';

export const useAnalytics = () => {
  useEffect(() => {
    // Don't initialize analytics on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return;
    }

    // Initialize analytics based on provider
    if (site.analytics.provider === 'plausible') {
      // Plausible initialization
      const script = document.createElement('script');
      script.src = `https://plausible.io/js/script.js`;
      script.dataset.domain = site.analytics.ids.plausible;
      script.async = true;
      document.head.appendChild(script);
    } else if (site.analytics.provider === 'ga4') {
      // Google Analytics 4 initialization
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${site.analytics.ids.ga4}`;
      script.async = true;
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', site.analytics.ids.ga4);
    } else if (site.analytics.provider === 'posthog') {
      // PostHog initialization - simpler approach
      const script = document.createElement('script');
      script.src = 'https://app.posthog.com/static/array.js';
      script.async = true;
      script.id = 'posthog-script';
      document.head.appendChild(script);
      
      window.posthog = window.posthog || [];
      window.posthog.push(['init', site.analytics.ids.posthog, {
        api_host: 'https://app.posthog.com'
      }]);
    }
  }, []);

  const trackEvent = (eventName, properties = {}) => {
    // Don't track events on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return;
    }

    if (site.analytics.provider === 'plausible') {
      // Plausible event tracking
      window.plausible?.(eventName, { props: properties });
    } else if (site.analytics.provider === 'ga4') {
      // GA4 event tracking
      window.gtag?.('event', eventName, properties);
    } else if (site.analytics.provider === 'posthog') {
      // PostHog event tracking
      window.posthog?.capture(eventName, properties);
    }
  };

  const trackPageView = (path) => {
    // Don't track page views on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return;
    }

    if (site.analytics.provider === 'plausible') {
      window.plausible?.('pageview');
    } else if (site.analytics.provider === 'ga4') {
      window.gtag?.('config', site.analytics.ids.ga4, { page_path: path });
    } else if (site.analytics.provider === 'posthog') {
      window.posthog?.capture('$pageview');
    }
  };

  const trackCTAClick = (ctaText, location) => {
    trackEvent('CTA Click', {
      cta_text: ctaText,
      location: location,
    });
  };

  const trackFormSubmission = (formName, success) => {
    trackEvent('Form Submission', {
      form_name: formName,
      success: success,
    });
  };

  const trackOutboundLink = (url) => {
    trackEvent('Outbound Link', { url });
  };

  return {
    trackEvent,
    trackPageView,
    trackCTAClick,
    trackFormSubmission,
    trackOutboundLink,
  };
};
