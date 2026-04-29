import { useCurrencyStore } from "../store/useCurrencyStore";

export const formatPrice = (priceInUSD, currency, rates) => {
  if (!rates || !rates[currency]) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(priceInUSD);
  }
  
  const converted = priceInUSD * rates[currency];
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(converted);
};

// Helper hook to easily get a formatted price
export const useFormattedPrice = () => {
  const { currency, rates } = useCurrencyStore();
  
  return (priceInUSD) => formatPrice(priceInUSD, currency, rates);
};
