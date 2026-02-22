// Currency mapping for NZ, AU, and Other countries (same price, different currency)
export const CURRENCY_MAPPING = {
  NZ: {
    code: 'NZD',
    symbol: '$',
    name: 'New Zealand Dollar',
    locale: 'en-NZ',
  },
  AU: {
    code: 'AUD',
    symbol: '$',
    name: 'Australian Dollar',
    locale: 'en-AU',
  },
  OTHER: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
  },
};

export const getCurrencyForCountry = (country) => {
  return CURRENCY_MAPPING[country] || CURRENCY_MAPPING.OTHER;
};

export const formatPriceForCountry = (price, country) => {
  const currency = getCurrencyForCountry(country);
  return `${currency.symbol}${price}`;
};

// Format price with proper locale formatting
export const formatPriceLocale = (amount, country) => {
  const currency = getCurrencyForCountry(country);
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Get currency code from country
export const currencyFromCountry = (country) => {
  return getCurrencyForCountry(country).code;
};

// Get currency symbol from currency code
export function getCurrencySymbol(currency) {
  const currencyMap = {
    NZD: '$',
    AUD: '$',
    USD: '$',
  };
  return currencyMap[currency] || '$';
}
