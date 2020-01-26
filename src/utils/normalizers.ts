export const normalizeCurrencyValue = (rate: number, currencyValue: number): number => {
  return Math.round(rate * currencyValue * 100) / 100;
};
