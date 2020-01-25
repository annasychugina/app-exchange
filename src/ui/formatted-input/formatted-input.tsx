import React, {useRef, useEffect, useCallback} from 'react';
import NumberFormat from 'react-number-format';
import s from './formatted-input.module.css';
import {CurrencyBlockType} from '../../types/types';

export type FieldInputCallback = (floatValue: number, fieldName: string) => void;

type Props = {
  name: CurrencyBlockType;
  value?: string;
  focused?: boolean;
  prefix: string;
  onChange: FieldInputCallback;
};
export const FormattedInput: React.FC<Props> = ({
  focused = true,
  onChange,
  prefix,
  value = '',
  name,
}: Props): React.ReactElement => {
  // TODO
  // const inputRef = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   console.log('focused', focused)
  //   focused && inputRef.current && inputRef.current.focus();
  // }, [focused]);

  const handleChange = useCallback(
    ({value}: {value: string}) => {
      const normalizedValue = value.slice(prefix.length);
      onChange(+normalizedValue, name);
    },
    [onChange, name],
  );

  return (
    <NumberFormat
      autoFocus={name === CurrencyBlockType.currencyFrom}
      className={s.input}
      //getInputRef={inputRef}
      allowNegative={false}
      maxLength={16}
      name={name}
      prefix={prefix}
      value={value}
      thousandSeparator={' '}
      autoComplete={'off'}
      onValueChange={handleChange}
    />
  );
};
