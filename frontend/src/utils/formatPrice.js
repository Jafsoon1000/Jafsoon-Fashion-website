import { useCurrencyStore } from "../store/useCurrencyStore";

const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'GBP': return '£';
    case 'JPY': return '¥';
    case 'AUD': return 'A$';
    case 'CAD': return 'C$';
    default: return '$';
  }
};

export const formatPrice = (priceInUSD, currency, rates) => {
  if (!rates || !rates[currency]) {
    return `$${Number(priceInUSD).toFixed(2)}`;
  }
  
  const converted = priceInUSD * rates[currency];
  const symbol = getCurrencySymbol(currency);
  
  // JPY typically doesn't use decimals
  if (currency === 'JPY') {
    return `${symbol}${Math.round(converted)}`;
  }
  
  return `${symbol}${converted.toFixed(2)}`;
};

// Helper hook to easily get a formatted price
export const useFormattedPrice = () => {
  const { currency, rates } = useCurrencyStore();
  
  return (priceInUSD) => formatPrice(priceInUSD, currency, rates);
};
