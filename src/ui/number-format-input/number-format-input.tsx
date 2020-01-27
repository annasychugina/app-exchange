import React, {useCallback} from 'react';
import NumberFormat from 'react-number-format';
import {CurrencyBlockType, FieldInputCallback} from '../../types/types';

import s from './number-format-input.module.css';

type Props = {
  name: CurrencyBlockType;
  inputValue?: string;
  prefix: string;
  onChange: FieldInputCallback;
};
export const NumberFormatInput: React.FC<Props> = ({
  onChange,
  prefix,
  inputValue = '',
  name,
}: Props): React.ReactElement => {
  const handleChange = useCallback(
    ({value}: {value: string}) => {
      const normalizedValue = prefix === '-' ? value.slice(1) : value;
      const propsValue = inputValue ? +inputValue : 0;

      if (+normalizedValue !== propsValue) {
        onChange(+normalizedValue, name);
      }
    },
    [onChange, name, prefix, inputValue],
  );

  return (
    <NumberFormat
      className={s.input}
      allowNegative={false}
      maxLength={16}
      name={name}
      prefix={prefix}
      value={inputValue}
      thousandSeparator={' '}
      autoComplete={'off'}
      onValueChange={handleChange}
    />
  );
};
