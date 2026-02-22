import { useState, useEffect } from 'react';
import { PRICING_TIERS, getPricingTiersForCountry } from '../constants/pricingConstants';
import { 
  getCurrencyForCountry,
  CURRENCY_MAPPING
} from '../utils/currencyMapping';

export const usePricing = () => {
  const [pricingTiers, setPricingTiers] = useState(PRICING_TIERS);
  const [country, setCountry] = useState('OTHER');
  const [currency, setCurrency] = useState(CURRENCY_MAPPING.OTHER);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get saved country from localStorage (user must have selected it)
    const savedCountry = localStorage.getItem('userCountry') || 'OTHER';
    updateCountry(savedCountry);
    setIsLoading(false);
  }, []);

  const updateCountry = (newCountry) => {
    setCountry(newCountry);
    setPricingTiers(getPricingTiersForCountry(newCountry));
    setCurrency(getCurrencyForCountry(newCountry));
    
    // Save to localStorage
    localStorage.setItem('userCountry', newCountry);
  };

  const getPrice = (planId) => {
    const tier = PRICING_TIERS.find(t => t.planId === planId);
    return tier ? tier.price : 0;
  };

  const getFormattedPrice = (planId) => {
    const tier = pricingTiers.find(t => t.planId === planId);
    return tier ? tier.price : '$0/month';
  };

  return {
    pricingTiers,
    country,
    currency,
    isLoading,
    updateCountry,
    getPrice,
    getFormattedPrice,
  };
};
