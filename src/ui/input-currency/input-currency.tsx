import React from 'react';
import {FormFieldCallback} from "../../types/types";
import s from './input-currency.module.css';

type Props = {
  name: string;
  value?: number;
  onChange: FormFieldCallback;
};

export const InputCurrency: React.FC<Props> = ({value, name}: Props): React.ReactElement => (
  <input
    className={s.input}
    maxLength={14}
    name={name}
    autoComplete={'off'}
    value={value || ''}
  />
);
