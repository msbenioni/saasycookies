import { PRICE_IDS } from "../constants/priceIds";
import { currencyFromCountry } from "./currencyUtils";
import { clientIntakeAPI } from "./supabaseClient";

// Cache currency detection to avoid repeated API calls
export async function getUserCountryCached() {
  const cached = localStorage.getItem("geo_country");
  if (cached) return cached;

  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    if (data?.country_code) {
      localStorage.setItem("geo_country", data.country_code);
      return data.country_code;
    }
  } catch (e) {
    console.warn("Could not detect country:", e);
  }
  return null;
}

export async function getUserCurrencyCached() {
  const cached = localStorage.getItem("geo_currency");
  if (cached) return cached; // expects "NZD" | "AUD" | "USD"

  const country = await getUserCountryCached();
  const currency = currencyFromCountry(country) || "USD";
  localStorage.setItem("geo_currency", currency);
  return currency;
}

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

// Create SaaSy Cookies subscription checkout
export async function createSaasySubscription(intakeId, planId, discounts = []) {
  const currency = await getUserCurrencyCached(); // "NZD" | "AUD" | "USD"

  try {
    const response = await fetch('/.netlify/functions/create-saasy-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        intakeId, 
        planId, 
        discounts, 
        currency 
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create subscription');
    }

    return data;
  } catch (error) {
    console.error('SaaSy subscription error:', error);
    throw error;
  }
}

// Create subscription checkout session (legacy for digital cards)
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

// Accept plan and create subscription
export async function acceptPlanAndSubscribe(planId, discounts = []) {
  try {
    // Get current intake ID from session storage
    const intakeId = sessionStorage.getItem('currentIntakeId');
    
    if (!intakeId) {
      throw new Error('No intake ID found. Please complete the form first.');
    }

    // Create subscription
    const subscriptionData = await createSaasySubscription(intakeId, planId, discounts);
    
    return subscriptionData;
  } catch (error) {
    console.error('Plan acceptance error:', error);
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

// Check if user has any available discounts
export function getAvailableDiscounts(formData) {
  const discounts = [];
  
  // No discounts currently available
  
  return discounts;
}
