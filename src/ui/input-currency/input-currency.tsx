import React, {useRef, useEffect} from 'react';
import {FormFieldCallback} from '../../types/types';
import s from './input-currency.module.css';

type Props = {
  name: string;
  value?: number;
  focused?: boolean;
  onChange: FormFieldCallback;
};

export const InputCurrency: React.FC<Props> = ({focused = false, value, name}: Props): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    focused && inputRef.current && inputRef.current.focus();
  }, [focused]);
  return (
    <input ref={inputRef} className={s.input} maxLength={14} name={name} autoComplete={'off'} value={value || ''} />
  );
};
