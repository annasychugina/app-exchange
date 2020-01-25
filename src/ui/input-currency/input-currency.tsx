import React, {useRef, useEffect, useCallback} from 'react';
import {FormFieldCallback} from '../../types/types';
import NumberFormat from 'react-number-format';
import s from './input-currency.module.css';

type Props = {
  name: string;
  value?: number;
  focused?: boolean;
  prefix: string;
  onChange: (value: string) => void;
};

export const InputCurrency: React.FC<Props> =
  ({focused = false, onChange, prefix, value, name}: Props): React.ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      focused && inputRef.current && inputRef.current.focus();
    }, [focused]);

    const handleChange = useCallback(
      ({ value }: { value: string }) => {
        onChange(value);
      },
      [onChange],
    );

    return  <NumberFormat
      className={s.input}
      getInputRef={inputRef}
      allowNegative={false}
      maxLength={16}
      name={name}
      autoComplete={'off'}
      prefix={prefix}
      value={value || ''}
      thousandSeparator={' '}
      onValueChange={handleChange}
    />
  }


