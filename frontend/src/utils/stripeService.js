import { PRICE_IDS } from "../constants/priceIds";
import { currencyFromCountry } from "./currencyUtils";

// Get user's country (client-side detection)
export async function getUserCountry() {
  try {
    // Try to get country from IP geolocation API
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.warn('Could not detect country:', error);
    return null;
  }
}

// Get currency for user
export async function getUserCurrency() {
  const country = await getUserCountry();
  return currencyFromCountry(country);
}

// Create subscription checkout session
export async function createSubscriptionCheckout(plan) {
  try {
    const response = await fetch('/.netlify/functions/create-subscription-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    return data;
  } catch (error) {
    console.error('Stripe service error:', error);
    throw error;
  }
}

// Get price ID for plan and currency
export function getPriceId(plan, currency) {
  return PRICE_IDS[plan]?.[currency];
}

// Get available plans
export function getAvailablePlans() {
  return Object.keys(PRICE_IDS);
}

// Get available currencies for a plan
export function getAvailableCurrencies(plan) {
  return Object.keys(PRICE_IDS[plan] || {});
}
