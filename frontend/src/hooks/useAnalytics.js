import { useEffect } from 'react';
import { site } from '../config/site';

export const useAnalytics = () => {
  useEffect(() => {
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
      // PostHog initialization
      (function(t,e){var o,n,p,r;window.__posthog=window.__posthog||[],window.__posthog.push(["init",site.analytics.ids.posthog,{api_host:"https://app.posthog.com"}]),function(){if(t.getElementById("posthog-script"))return;e=t.createElement("script"),e.id="posthog-script",e.type="text/javascript",e.async=!0,e.src="https://app.posthog.com/static/array.js",o=t.getElementsByTagName("script")[0],o.parentNode.insertBefore(e,o)}(document));
    }
  }, []);

  const trackEvent = (eventName, properties = {}) => {
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
