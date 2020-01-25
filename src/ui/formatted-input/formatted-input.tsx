import React, {useRef, useEffect, useCallback} from 'react';
import NumberFormat from 'react-number-format';
import s from './formatted-input.module.css';

export type FieldInputCallback  = (floatValue: number, fieldName: string) => void;

type Props = {
  name: string;
  value?: string;
  focused?: boolean;
  prefix: string;
  onChange: FieldInputCallback;
};
export const FormattedInput: React.FC<Props> =
  ({focused = false, onChange, prefix, value='', name}: Props): React.ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      focused && inputRef.current && inputRef.current.focus();
    }, [focused]);

    const handleChange = useCallback(
      ({ floatValue }: { floatValue: number }) => {
        onChange(floatValue, name);
      },
      [onChange, name],
    );

    return <NumberFormat
      className={s.input}
      getInputRef={inputRef}
      allowNegative={false}
      maxLength={16}
      name={name}
      prefix={prefix}
      value={value}
      thousandSeparator={' '}
      autoComplete={'off'}
      onValueChange={handleChange}
    />
  };


