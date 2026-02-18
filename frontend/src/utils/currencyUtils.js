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

// Format price with currency
export function formatPrice(amount, currency) {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${amount}`;
}
