import { clientIntakeAPI } from "./supabaseClient";
import { currencyFromCountry } from "./currencyMapping";
import { logger } from './logger';

// Create Stripe checkout session
export async function createStripeCheckoutSession(planId, clientIntakeId, successUrl, cancelUrl, country = 'OTHER') {
  try {
    // Get currency based on country
    const currency = currencyFromCountry(country);
    
    const response = await fetch('/.netlify/functions/create-saasy-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: planId, // Send planId (starter, growth, authority) - backend will map to actual price ID
        clientIntakeId,
        successUrl,
        cancelUrl,
        country, // Pass country for currency mapping
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    logger.error('Stripe checkout error:', error);
    throw error;
  }
}

// Get price ID for plan and currency
export function getPriceId(planId, currency = 'USD') {
  return PRICE_IDS[planId]?.[currency];
}

// Get currency from client intake data
export function getCurrencyFromIntake(clientIntake) {
  const country = clientIntake.country || 'OTHER';
  return currencyFromCountry(country);
}

// Update client intake with payment information
export async function updateClientIntakeWithPayment(clientIntakeId, paymentData) {
  try {
    const { data, error } = await clientIntakeAPI.updateStatus(clientIntakeId, 'payment_initiated', paymentData);
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    logger.error('Error updating client intake with payment:', error);
    throw error;
  }
}

// Accept plan and create Stripe checkout session
export async function acceptPlanAndSubscribe(planId, country = 'OTHER') {
  try {
    // Get current intake ID from session storage
    const intakeId = sessionStorage.getItem('currentIntakeId');
    
    if (!intakeId) {
      throw new Error('No intake ID found');
    }

    // Create checkout session with correct currency
    const session = await createStripeCheckoutSession(
      planId,
      intakeId,
      `${window.location.origin}/checkout-success`,
      `${window.location.origin}/pricing`,
      country
    );

    return {
      checkoutUrl: session.url,
      sessionId: session.id,
    };
  } catch (error) {
    logger.error('Error accepting plan and subscribing:', error);
    throw error;
  }
}
