import {Currency, CurrentBalanceConfig} from '../types/types';

const errorMessage = 'You do not have enough money in your account';
const errorRequired = 'No values for exchange';
export const checkBalance = ({
  currencyFrom,
  valueFrom,
  userBalance,
}: {
  currencyFrom: Currency;
  valueFrom: number | null;
  userBalance: CurrentBalanceConfig;
}): {isValid: boolean; errorMessage?: string} => {
  if (!valueFrom) {
    return {isValid: false, errorMessage: errorRequired};
  }
  if (valueFrom > userBalance[currencyFrom]) {
    return {isValid: false, errorMessage};
  }

  return {isValid: true};
};
