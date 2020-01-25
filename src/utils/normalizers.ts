export const normalizeCurrencyValue = (rate: string, currencyValue: number): number => {
  return Math.round(+rate * currencyValue * 100) / 100;
};
