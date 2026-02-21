// Detect currency from country code
export function currencyFromCountry(country) {
  if (country === "NZ") return "NZD";
  if (country === "AU") return "AUD";
  return "USD";
}

// Get currency symbol
export function getCurrencySymbol(currency) {
  switch (currency) {
    case "NZD":
      return "$";
    case "AUD":
      return "$";
    case "USD":
      return "$";
    default:
      return "$";
  }
}

// Format price with currency symbol and proper locale
export function formatPrice(amount, currency = 'USD') {
  const locale =
    currency === 'NZD' ? 'en-NZ' :
    currency === 'AUD' ? 'en-AU' :
    'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
